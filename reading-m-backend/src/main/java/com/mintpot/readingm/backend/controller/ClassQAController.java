package com.mintpot.readingm.backend.controller;

import com.mintpot.readingm.backend.dto.admin.ClassQADto;
import com.mintpot.readingm.backend.dto.clazz.ClassQAView;
import com.mintpot.readingm.backend.dto.student.StudentQAView;
import com.mintpot.readingm.backend.entity.clazz.Class;
import com.mintpot.readingm.backend.entity.clazz.ClassQA;
import com.mintpot.readingm.backend.entity.clazz.LiveClass;
import com.mintpot.readingm.backend.entity.user.Student;
import com.mintpot.readingm.backend.exception.CommonException;
import com.mintpot.readingm.backend.exception.ErrorCode;
import com.mintpot.readingm.backend.repository.ClassQARepository;
import com.mintpot.readingm.backend.repository.ClassRepository;
import com.mintpot.readingm.backend.repository.StudentRepository;
import com.mintpot.readingm.backend.repository.TutorRepository;
import com.mintpot.readingm.backend.security.AuthenticationFacade;
import com.mintpot.readingm.backend.user.Role;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/api/classqas")
@Api(tags = {"Class QA"})
@RequiredArgsConstructor
@Slf4j
public class ClassQAController {


    final ClassQARepository classQARepo;
    final ClassRepository classRepo;
    final StudentRepository studentRepo;
    final TutorRepository tutorRepo;
    final ModelMapper mapper;
    private final AuthenticationFacade authFacade;

    @GetMapping
    Page<ClassQA> findByQuery(@RequestParam(required = false) Specification<ClassQA> query,
                              Pageable page) {
        return classQARepo.find(query, page, ClassQA.class);
    }

    @GetMapping("/qalist")
    @ApiOperation(value="API for 4-3-3 & 4-7-3 web main")
    Page<ClassQAView> getClassQAList(@RequestParam long classId, Pageable page) {
        long viewerId = 0L;
        try {
            viewerId = authFacade.getAuthentication().getUserId();
        } catch (ClassCastException ex) {

        }
        return classQARepo.findByClassId(classId,  viewerId, page);
    }

    @GetMapping("/qalist/by-tutor")
    @ApiOperation(value="API for 9-6 web main")
    Page<ClassQAView> getClassQAByTutor(Pageable page) {
        long userId = 0L;
        try {
            userId = authFacade.getAuthentication().getUserId();
        } catch (ClassCastException ex) {

        }

        if (userId == 0L) {
            throw new CommonException(ErrorCode.USER_NOT_ALLOWED);
        }

        tutorRepo.findById(userId).orElseThrow(() -> new CommonException(ErrorCode.USER_NOT_ALLOWED));
        return classQARepo.findByTutorId(userId, page);
    }

    @GetMapping("/qalistByStudent")
    Page<StudentQAView> getClassQAByStudent(Pageable page) {
        long viewerId = 0;
        try {
            final var usrDetail = authFacade.getAuthentication();
            viewerId = usrDetail.getUserId();
        } catch (ClassCastException ex) {
            log.error("getClassQAByStudent error: " + ex.getMessage());
        }

        Page<StudentQAView> rs= classQARepo.getClassQAByStudent(viewerId, page);

        return rs;
    }

    @DeleteMapping("/{qaId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void removeQA(@PathVariable long qaId) {
        final var usrDetail = authFacade.getAuthentication();
        final var classQA = classQARepo.findById(qaId)
                                       .orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));
        if (classQA.getQuestioner().getId() != usrDetail.getUserId() ||
                classQA.getAnswer() != null
        )  {
            throw new CommonException(ErrorCode.USER_NOT_ALLOWED);
        }

        classQARepo.deleteById(qaId);
    }

    @PostMapping("/{classId}")
    @ResponseStatus(HttpStatus.CREATED)
    void regQA(@PathVariable Long classId, @RequestBody ClassQADto classQADto) {
        final var usrDetail = authFacade.getAuthentication();
        final var usrRole = Role.valueOf(new ArrayList<>(usrDetail.getAuthorities()).get(0).getAuthority());
        if (usrRole == Role.STUDENT) {
            final var classInfo = classRepo.findById(classId)
                                          .orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));
            boolean isStudentClass = false;
            for (Student i : classInfo.getStudents()
            ) {
                if (i.getId() == usrDetail.getUserId()) {
                    isStudentClass = true;
                    break;
                }
            }
            if (isStudentClass) {
                final var student = studentRepo.findById(usrDetail.getUserId()).map(x -> mapper.map(x, Student.class))
                                               .orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));
                var classQA = mapper.map(classQADto, ClassQA.class);
                classQA.setClassInfo(classInfo);
                classQA.setQuestioner(student);
                classQARepo.save(classQA);
            } else {
                //not student of class
                throw new CommonException(ErrorCode.USER_NOT_ALLOWED, "User is not student of this class");
            }
        } else {
            //not student
            throw new CommonException(ErrorCode.USER_NOT_ALLOWED, "User role is not student");
        }
    }


    @PatchMapping("/{classQAId}")
    @Transactional
    void replyQA(@PathVariable Long classQAId, @RequestBody String answer) {
        final var usrDetail = authFacade.getAuthentication();
        final var usrRole = Role.valueOf(new ArrayList<>(usrDetail.getAuthorities()).get(0).getAuthority());
        if (usrRole == Role.TUTOR) {
            var qa = classQARepo.findById(classQAId)
                                .orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));
            if (qa.getClassInfo() instanceof LiveClass) {
                if (((LiveClass) qa.getClassInfo()).getTutor().getId() == usrDetail.getUserId()) {
                    classQARepo.replyQA(classQAId, answer);
                } else {
                    throw new CommonException(ErrorCode.USER_NOT_ALLOWED);
                }
            }
        } else {
            throw new CommonException(ErrorCode.USER_NOT_ALLOWED);
        }
    }
}
