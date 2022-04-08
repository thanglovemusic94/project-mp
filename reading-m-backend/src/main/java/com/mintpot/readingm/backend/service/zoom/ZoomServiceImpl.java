package com.mintpot.readingm.backend.service.zoom;

import com.mintpot.readingm.backend.constant.ZoomMeetingType;
import com.mintpot.readingm.backend.dto.zoom.CreateZoomMeetingDto;
import com.mintpot.readingm.backend.dto.zoom.MeetingRes;
import com.mintpot.readingm.backend.dto.zoom.Settings;
import com.mintpot.readingm.backend.entity.clazz.LiveClass;
import com.mintpot.readingm.backend.entity.clazz.TextBookCurriculum;
import com.mintpot.readingm.backend.entity.settlement.AttendClass;
import com.mintpot.readingm.backend.entity.zoom.Meeting;
import com.mintpot.readingm.backend.exception.CommonException;
import com.mintpot.readingm.backend.exception.ErrorCode;
import com.mintpot.readingm.backend.repository.AttendClassRepository;
import com.mintpot.readingm.backend.repository.LiveClassRepository;
import com.mintpot.readingm.backend.repository.zoom.MeetingRepository;
import com.mintpot.readingm.backend.security.AuthenticationFacade;
import com.mintpot.readingm.backend.user.Role;
import com.mintpot.readingm.backend.user.User;
import com.mintpot.readingm.backend.user.UserRepository;
import com.mintpot.readingm.backend.util.ZoomApiUtils;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ZoomServiceImpl implements ZoomService {

    private final WebClient zoomClient;

    private final ZoomApiUtils zoomApiUtils;

    @Value("${zoomApi.userId}")
    private String zoomUserId;

    private final MeetingRepository meetingRepo;

    private final AuthenticationFacade authenticationFacade;

    private final LiveClassRepository liveClassRepo;

    private final UserRepository userRepo;

    private final AttendClassRepository attendClassRepo;

    private final ModelMapper mapper;

    @Override
    public MeetingRes createMeeting(CreateZoomMeetingDto createMeetingDto) {
        return zoomClient.post()
                .uri("/users/" + zoomUserId +"/meetings")
                .headers(headers -> {
                    headers.setContentType(MediaType.APPLICATION_JSON);
                    headers.setBearerAuth(zoomApiUtils.getToken());
                })
                .body(Mono.just(createMeetingDto), CreateZoomMeetingDto.class)
                .retrieve()
                .bodyToMono(MeetingRes.class)
                .block();
    }

    @Override
    public String joinClass(long classId) {
        long userId = 0L;
        String joinUrl;

        try {
            userId = authenticationFacade.getAuthentication().getUserId();
        } catch (ClassCastException ex) {

        }

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));

        LiveClass liveClass = liveClassRepo.findById(classId).orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));
        boolean isMemberOfClass = liveClass.getTutor().getId() == userId || liveClass.isStudentOfClass(userId);

        if (!isMemberOfClass) {
            throw new CommonException(ErrorCode.USER_NOT_ALLOWED);
        }
        Role role = user.getRole();
        Optional<Meeting> meetingOpt = meetingRepo.findLastMeetingByClass(classId);
        boolean needCreate = false;

        if (meetingOpt.isPresent()) {
            var createdAt = meetingOpt.get().getCreatedAt().toLocalDate();
            if (createdAt.isBefore(LocalDate.now())) {
                needCreate = true;
            }
        } else {
             needCreate = true;
        }

        if (needCreate) {
            if (role != Role.TUTOR) {
                throw new CommonException(ErrorCode.CLASS_LESSON_HAS_NOT_START);
            }

            joinUrl = createNewMeeting(liveClass);
        } else { // get join url in db
            if (role == Role.TUTOR) {
                return meetingOpt.get().getStartUrl();
            }
            joinUrl = meetingOpt.get().getJoinUrl();
        }

        var curr = getCurrentCurriculum(liveClass);
        var lessonIndex = getLessonIndex(liveClass);

        if (curr != null) {
            var attend = attendClassRepo
                    .findByClassIdAndUserId(classId, userId)
                    .stream()
                    .filter(att -> att.getLessonIndex() == lessonIndex)
                    .findFirst()
                    .orElse(null);

            if (attend != null && !attend.getIsPresent()) {
                attend.setIsPresent(true);
                attendClassRepo.save(attend);
            }
        }
        return joinUrl;
    }

    @Override
    public MeetingRes getDetailMeeting(long meetingId) {
        return zoomClient.get()
                .uri("/meetings/" + meetingId)
                .headers(headers -> {
                    headers.setContentType(MediaType.APPLICATION_JSON);
                    headers.setBearerAuth(zoomApiUtils.getToken());
                })
                .retrieve()
                .bodyToMono(MeetingRes.class)
                .block();
    }

    @Transactional
    private String createNewMeeting(LiveClass liveClass) {
        int duration = 90;
        var curr = getCurrentCurriculum(liveClass);
        if (curr != null) {
            duration = (int) Duration.between(curr.getStart(), curr.getEnd()).toMinutes();
        }

        var createMeetingDto = CreateZoomMeetingDto.builder()
                .topic(liveClass.getName())
                .type(ZoomMeetingType.SCHEDULED)
                .startTime(LocalDateTime.now())
                .duration(duration)
                .settings(Settings
                        .builder()
                        .joinBeforeHost(true)
                        .build()
                )
                .build();
        var meetingRes = createMeeting(createMeetingDto);
        saveMeetingInfo(liveClass.getId(), meetingRes);
        initAttend(liveClass);
        return meetingRes.getStartUrl();
    }

    private void saveMeetingInfo(long classId, MeetingRes meetingRes) {
        var meeting = mapper.map(meetingRes, Meeting.class);
        meeting.setClassId(classId);
        meetingRepo.save(meeting);
    }

    private TextBookCurriculum getCurrentCurriculum(LiveClass liveClass) {
        var curriculums = liveClass.getCurriculum();
        for (var curr : curriculums) {
            if (curr.getStart().toLocalDate().equals(LocalDate.now())) {
                return curr;
            }
        }

        return null;
    }

    @Transactional
    private void initAttend(LiveClass liveClass) {
        var tutor = liveClass.getTutor();
        var studentList = liveClass.getStudents();
        var attend = new AttendClass();
        var curr = getCurrentCurriculum(liveClass);
        var lessonIndex = getLessonIndex(liveClass);

        if (curr != null) {
            List<AttendClass> attendList = new ArrayList<>();
            attend.setLessonIndex(lessonIndex);
            attend.setLiveClass(liveClass);
            attend.setStartTime(curr.getStart());
            attend.setEndTime(curr.getEnd());
            var tmpAttend = new AttendClass(attend);
            tmpAttend.setParticipant(tutor);
            tmpAttend.setIsPresent(true);
            attendList.add(tmpAttend);

            for (var std : studentList) {
                tmpAttend = new AttendClass(attend);
                tmpAttend.setParticipant(std);
                tmpAttend.setIsPresent(false);
                attendList.add(tmpAttend);
            }

            attendClassRepo.saveAll(attendList);
        }
    }

    private int getLessonIndex(LiveClass liveClass) {
        var curriculums = liveClass.getCurriculum();
        for (int i = 0; i < curriculums.size(); i++) {
            var curr = curriculums.get(i);
            if (curr.getStart().toLocalDate().equals(LocalDate.now())) {
                return i;
            }
        }
        return -1;
    }
}
