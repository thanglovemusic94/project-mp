package com.mintpot.readingm.backend.controller;

import com.mintpot.readingm.backend.entity.MstConfig;
import com.mintpot.readingm.backend.exception.CommonException;
import com.mintpot.readingm.backend.exception.ErrorCode;
import com.mintpot.readingm.backend.repository.MstConfigRepository;
import com.mintpot.readingm.backend.security.AuthenticationFacade;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@Api(tags = {"Master config"})
@RequestMapping("/api/admin/mstConfig")
@RequiredArgsConstructor
public class MstConfigController {

    private final MstConfigRepository mstConfigRepository;
    private final AuthenticationFacade authenticationFacade;

    @GetMapping(produces = MediaType.TEXT_PLAIN_VALUE)
    public String getConfigByKey(@RequestParam String key) {
        return mstConfigRepository.findByConfigKey(key)
                .orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND))
                .getConfigValue();
    }

    @GetMapping(value = "/all")
    public List<MstConfig> getAll() {
        return mstConfigRepository.findAll();
    }

    @PatchMapping
    public void updateValue(@RequestParam String key,
                            @RequestParam String value) {

        authenticationFacade.assertAdmin();
        mstConfigRepository.updateValueByKey(key, value);
    }
}
