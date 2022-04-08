package com.mintpot.readingm.backend.controller;

import com.mintpot.readingm.backend.dto.admin.videoregistration.VideoRegistrationRqDto;
import com.mintpot.readingm.backend.entity.MstConfig;
import com.mintpot.readingm.backend.security.AuthenticationFacade;
import com.mintpot.readingm.backend.service.VideoRegistrationService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/video-registration")
@Api(tags = {"Video Registration"})
@RequiredArgsConstructor
public class VideoRegistrationController {
    private final VideoRegistrationService vrService;
    private final AuthenticationFacade authFacade;

    @GetMapping
    @ApiOperation(value = "show video 3-1 web main")
    MstConfig findByKey(){
        return vrService.findByKey();
    }

    @ApiOperation(value = "create video 3-2 admin")
    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE})
    MstConfig create(@Valid @RequestBody VideoRegistrationRqDto dto){
        authFacade.assertAdmin();
        return vrService.create(dto);
    }

}
