package com.mintpot.readingm.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mintpot.readingm.backend.dto.tutorApplication.RegTutorAppDto;
import com.mintpot.readingm.backend.entity.tutorApplication.TutorApplication;
import com.mintpot.readingm.backend.security.AuthenticationFacade;
import com.mintpot.readingm.backend.service.TutorApplicationService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@RestController
@Api(tags = {"Tutor", "Tutor Application"})
@RequestMapping("/api/tutors")
@RequiredArgsConstructor
public class TutorController {

    private final TutorApplicationService tutorAppService;
    private final ObjectMapper mapper = new ObjectMapper();
    private final AuthenticationFacade authenticationFacade;

    @GetMapping("/{tutorId}/application")
    Optional<TutorApplication> getTutorApplicationById(@PathVariable long tutorId) {
        authenticationFacade.assertAdmin();
        return tutorAppService.getById(tutorId);
    }


    @GetMapping("/application")
    @ApiOperation(value = "Api for web main 9-1-2 2/2")
    public Optional<TutorApplication> getTutorApplicationForTutor() {
        var tutorId = authenticationFacade.getAuthentication().getUserId();
        return tutorAppService.getById(tutorId);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    TutorApplication applyForTutor(@RequestPart("tutorAppDto") String tutorAppDto,
                       @RequestPart(required = false, value = "imagePc") MultipartFile imagePc,
                       @RequestPart(required = false, value = "files") MultipartFile[] files) throws IOException {

        RegTutorAppDto dto = mapper.readValue(tutorAppDto, RegTutorAppDto.class);
        dto.setImagePc(imagePc);
        dto.setFiles(files);

        return tutorAppService.create(dto);
    }


    @PatchMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Transactional
    void updateApplyTutor(@RequestPart("tutorAppDto") String tutorAppDto,
                                      @RequestPart(required = false, value = "files") MultipartFile[] files,
                                      Long id) throws IOException {

        RegTutorAppDto dto = mapper.readValue(tutorAppDto, RegTutorAppDto.class);

        dto.setFiles(files);
        tutorAppService.update(dto, id);
    }
}