package com.mintpot.readingm.backend.controller;

import com.mintpot.readingm.backend.dto.clazz.ClassSelectionView;
import com.mintpot.readingm.backend.dto.clazz.ConsultationView;
import com.mintpot.readingm.backend.dto.clazz.RegConsultationDto;
import com.mintpot.readingm.backend.entity.clazz.ClassConsultation;
import com.mintpot.readingm.backend.entity.clazz.LiveClass;
import com.mintpot.readingm.backend.entity.constant.QuestionStatus;
import com.mintpot.readingm.backend.entity.user.Student;
import com.mintpot.readingm.backend.exception.CommonException;
import com.mintpot.readingm.backend.exception.ErrorCode;
import com.mintpot.readingm.backend.repository.ClassConsultationRepository;
import com.mintpot.readingm.backend.repository.LiveClassRepository;
import com.mintpot.readingm.backend.repository.StudentRepository;
import com.mintpot.readingm.backend.security.AuthenticationFacade;
import com.mintpot.readingm.backend.service.ClassService;
import com.mintpot.readingm.backend.user.Role;
import com.mintpot.readingm.backend.user.User;
import com.mintpot.readingm.backend.user.UserRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/classConsultation")
@Api(tags = {"Class Consultation"})
@RequiredArgsConstructor
public class ClassConsultationController {

    private final LiveClassRepository liveClassRepo;

    private final ClassConsultationRepository classConsultationRepo;

    private final ClassService classService;

    private final UserRepository userRepo;

    private final StudentRepository studentRepo;

    private final AuthenticationFacade authenticationFacade;

    private final ModelMapper mapper;

    @GetMapping
    @ApiOperation(value="API for 8-6-1 & 9-7 web main")
    public Page<ConsultationView> getConsultation(Pageable page) {
        long userId = authenticationFacade.getAuthentication().getUserId();
        return classConsultationRepo.findByQuestioner_IdOrRespondent_Id(userId, userId, ConsultationView.class, page);

    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @ApiOperation(value="API for 8-6-2 & 9-7-2 web main")
    public void createConsultation(@RequestBody RegConsultationDto regConsultationDto) {
        long userId = authenticationFacade.getAuthentication().getUserId();
        User user = userRepo.findById(userId).orElseThrow(() -> new CommonException(ErrorCode.USER_NOT_EXIST));
        LiveClass classInfo = liveClassRepo.findByClassIdAndStudentId(regConsultationDto.getClassId(), regConsultationDto.getChildId())
                .orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));
        Student student = studentRepo.findById(regConsultationDto.getChildId())
                .orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));
        ClassConsultation classConsultation = mapper.map(regConsultationDto, ClassConsultation.class);

        if (user.getRole() == Role.TUTOR) {
            if (classInfo.getTutor().getId() != userId) {
                throw new CommonException(ErrorCode.CLASS_NOT_FOUND);
            }
            classConsultation.setRespondent(student.getParent());
        } else if (user.getRole() == Role.PARENT) {
            if (student.getParent().getId() != userId) {
                throw new CommonException(ErrorCode.USER_NOT_ALLOWED);
            }
            classConsultation.setRespondent(classInfo.getTutor());
        }

        classConsultation.setQuestioner(user);
        classConsultation.setStudent(student);
        classConsultation.setClassInfo(classInfo);
        classConsultation.setStatus(QuestionStatus.WAITING);
        classConsultationRepo.save(classConsultation);
    }

    @GetMapping("/getClassByStudentId")
    @ApiOperation(value="API for 8-6-2 web main")
    public List<ClassSelectionView> getClassByStudent(@RequestParam long studentId) {
        return classService.getLiveClassByStudentId(studentId);
    }

    @GetMapping("/getClassByTutor")
    @ApiOperation(value="API for 9-7-2 web main")
    public List<ClassSelectionView> getClassByTutor() {
        long tutorId = authenticationFacade.getAuthentication().getUserId();
        return classService.getClassSelectionByTutorId(tutorId);
    }

    @PatchMapping("/{consultationId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @ApiOperation(value="API for 8-6-1 & 9-7 web main")
    public void replyConsultation(@RequestParam String answer, @PathVariable long consultationId) {
        long userId = authenticationFacade.getAuthentication().getUserId();
        ClassConsultation consultation = classConsultationRepo.findById(consultationId)
                .orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));

        if (consultation.getRespondent().getId() != userId) {
            throw new CommonException(ErrorCode.USER_NOT_ALLOWED);
        }

        consultation.setAnswer(answer);
        consultation.setStatus(QuestionStatus.ANSWERED);
        classConsultationRepo.save(consultation);
    }

    @DeleteMapping("/{consultationId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @ApiOperation(value="API for 8-6-1 & 9-7 web main")
    public void removeConsultation(@PathVariable long consultationId) {
        ClassConsultation consultation = classConsultationRepo.findById(consultationId)
                .orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));

        long userId = authenticationFacade.getAuthentication().getUserId();
        if (consultation.getQuestioner().getId() != userId
                || consultation.getStatus() != QuestionStatus.WAITING) {

            throw new CommonException(ErrorCode.USER_NOT_ALLOWED);
        }

        classConsultationRepo.delete(consultation);
    }

}
