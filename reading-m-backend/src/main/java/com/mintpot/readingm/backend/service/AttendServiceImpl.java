package com.mintpot.readingm.backend.service;

import com.mintpot.readingm.backend.dto.settlement.AttendClassDto;
import com.mintpot.readingm.backend.dto.settlement.ParticipantDto;
import com.mintpot.readingm.backend.entity.clazz.LiveClass;
import com.mintpot.readingm.backend.entity.settlement.AttendClass;
import com.mintpot.readingm.backend.repository.AttendClassRepository;
import com.mintpot.readingm.backend.user.Role;
import com.mintpot.readingm.backend.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AttendServiceImpl implements AttendService {

    private final AttendClassRepository attendClassRepository;

    @Override
    public List<AttendClassDto> groupAttendByClassTime(List<AttendClass> attendClassList) {
        LocalDateTime oldClassTime = null;
        List<AttendClassDto> result = new ArrayList<>();
        AttendClassDto dto = new AttendClassDto();
        List<ParticipantDto> studentParticipantList = new ArrayList<>();
        attendClassList.sort(Comparator.comparing(AttendClass::getStartTime));

        for (AttendClass attend : attendClassList) {
            if (oldClassTime == null || !oldClassTime.equals(attend.getStartTime())) {
                dto = new AttendClassDto();
                dto.setStartTime(attend.getStartTime());
                dto.setEndTime(attend.getEndTime());
                studentParticipantList.sort(Comparator.comparing(ParticipantDto::getName));
                studentParticipantList = new ArrayList<>();
                dto.setStudents(studentParticipantList);
                result.add(dto);
            }

            User participant = attend.getParticipant();
            var participantDto = new ParticipantDto(participant.getName(), attend.getIsPresent());

            if (participant.getRole() == Role.TUTOR) {
                dto.setTutorPresent(attend.getIsPresent());
            } else {
                studentParticipantList.add(participantDto);
            }

            oldClassTime = attend.getStartTime();
        }

        return result;
    }

    @Override
    public List<AttendClassDto> groupAttendByClass(LiveClass liveClass) {
        return groupAttendByClassTime(attendClassRepository.findByLiveClass(liveClass));
    }
}
