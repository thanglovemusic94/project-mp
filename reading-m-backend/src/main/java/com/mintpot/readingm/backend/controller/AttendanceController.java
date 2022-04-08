package com.mintpot.readingm.backend.controller;

import com.mintpot.readingm.backend.entity.settlement.AttendClass;
import com.mintpot.readingm.backend.repository.AttendClassRepository;
import com.mintpot.readingm.backend.repository.ClassRepository;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Api(tags = {"Attendances"})
@RequestMapping("/attendances")
public class AttendanceController {

    private final AttendClassRepository attendRepo;

    @GetMapping("/classes/{classId}/users/{userId}")
    List<AttendClass> getClassAttendancesOfStudent(@PathVariable long classId, @PathVariable long userId) {
        return attendRepo.findByClassIdAndUserId(classId, userId);
    }
}
