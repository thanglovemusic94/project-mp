package com.mintpot.carcloth.controller;

import com.mintpot.carcloth.repository.UserRepository;
import com.mintpot.carcloth.dto.admin.PasswordChangeDto;
import com.mintpot.carcloth.entity.Admin;
import com.mintpot.carcloth.exception.CommonException;
import com.mintpot.carcloth.exception.ErrorCode;
import com.mintpot.carcloth.security.AuthenticationFacade;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserRepository userRepo;

    private final AuthenticationFacade authFacade;
    private final PasswordEncoder passwordEncoder;

    @PatchMapping("/password")
    void changePassword(@Valid @RequestBody PasswordChangeDto dto) {

        var memberId = authFacade.getAuthentication().getMemberId();
        Admin adminInfo = (Admin) userRepo.findByMemberId(memberId)
                                .orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));

        adminInfo.setPassword(passwordEncoder.encode(dto.getNewPassword()));
        adminInfo.setEncodePwd(Base64.getEncoder().encodeToString(dto.getNewPassword().getBytes(StandardCharsets.UTF_8)));
        userRepo.save(adminInfo);
    }

    @GetMapping("/password")
    public String getPassword() {

        var memberId = authFacade.getAuthentication().getMemberId();
        Admin adminInfo = (Admin) userRepo.findByMemberId(memberId)
                .orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));

        byte[] decodedBytes = Base64.getDecoder().decode(adminInfo.getEncodePwd());

        return new String(decodedBytes);
    }
}
