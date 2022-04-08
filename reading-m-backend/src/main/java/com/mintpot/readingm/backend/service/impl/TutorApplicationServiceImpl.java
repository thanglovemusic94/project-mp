package com.mintpot.readingm.backend.service.impl;

import com.mintpot.readingm.backend.dto.tutorApplication.RegTutorAppDto;
import com.mintpot.readingm.backend.entity.constant.TutorApplicationStatus;
import com.mintpot.readingm.backend.entity.constant.TutorType;
import com.mintpot.readingm.backend.entity.tutorApplication.TutorApplication;
import com.mintpot.readingm.backend.entity.user.Tutor;
import com.mintpot.readingm.backend.exception.CommonException;
import com.mintpot.readingm.backend.exception.ErrorCode;
import com.mintpot.readingm.backend.exception.ValidationException;
import com.mintpot.readingm.backend.repository.TutorApplicationRepository;
import com.mintpot.readingm.backend.repository.TutorRepository;
import com.mintpot.readingm.backend.service.TutorApplicationService;
import com.mintpot.readingm.backend.user.Role;
import com.mintpot.readingm.backend.user.UserStatus;
import com.mintpot.readingm.backend.util.CurrentUserUtils;
import com.mintpot.storage.StorageService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.Arrays;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TutorApplicationServiceImpl implements TutorApplicationService {
    private static final String  SLASH = "/";
    private static final String  USERS = "users";
    private static final String  TUTOR_APPLICATION = "tutor-application";
    private static final String  LIVE_CLASS = "live-class";

    @Autowired
    TutorApplicationRepository tutorAppRepo;

    @Autowired
    ModelMapper mapper;

    @Autowired
    StorageService storageService;

    @Autowired
    private CurrentUserUtils currentUserUtils;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TutorRepository tutorRepository;

    @Override
    public Optional<TutorApplication> getById(long tutorId) {
        return tutorAppRepo.findById(tutorId);
    }

    @Override
    @Transactional
    public TutorApplication create(RegTutorAppDto tutorAppDto) throws IOException {
        var tutorAppEnt = mapper.map(tutorAppDto, TutorApplication.class);
        var tutor = tutorAppEnt.getTutor();
        tutor.setRole(Role.TUTOR);
        tutor.setPassword(passwordEncoder.encode(tutor.getPassword()));
        tutorAppEnt.setStatus(TutorApplicationStatus.WAITING);

        MultipartFile multipartFile = tutorAppDto.getImagePc();
        MultipartFile[] files = tutorAppDto.getFiles();
        //Validate
        if(files != null && files.length > 3) {
            throw new ValidationException(ErrorCode.MAX_NUMBER_FILES);
        }
        tutorAppEnt = tutorAppRepo.save(tutorAppEnt);
        //Upload imagePc
        if (multipartFile != null) {
            String imagePc = storageService.uploadFile(multipartFile, prePathImagePc());
            tutorAppEnt.setImagePc(imagePc);
            tutorAppEnt.getTutor().setProfileImageUrl(imagePc);
        }
        //Upload files
        if(files != null ) {
            String prefixPath = prePathFiles(tutorAppEnt.getId());
            tutorAppEnt.setFiles(Arrays.stream(files)
                    .map(f -> storageService.uploadFile(f, prefixPath))
                    .collect(Collectors.toSet()));
        }


        TutorApplication tutorApplication = tutorAppRepo.save(tutorAppEnt);
        long tutorId = tutorApplication.getTutor().getId();
        Tutor setTutor = tutorRepository.findById(tutorId).orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));
        tutor.setStatus(UserStatus.UNACTIVATED);
        tutor.setProfileImageUrl(tutorApplication.getImagePc());
        tutorRepository.save(setTutor);

        return tutorApplication;
    }

    @Override
    public void update(RegTutorAppDto reg, Long id) throws IOException {
        TutorApplication tutorApplication = tutorAppRepo.findById(id).orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));
        mapper.map(reg, tutorApplication);

        MultipartFile[] files = reg.getFiles();
        if(files != null && files.length > 3) {
            throw new ValidationException(ErrorCode.MAX_NUMBER_FILES);
        }

        if(files != null ) {
            String prefixPath = prePathFiles(tutorApplication.getId());
            tutorApplication.setFiles(Arrays.stream(files)
                    .map(f -> storageService.uploadFile(f, prefixPath))
                    .collect(Collectors.toSet()));
        }

        tutorAppRepo.save(tutorApplication);
        if (Objects.nonNull(reg.getGoalClassInfo()) && Objects.nonNull(reg.getBookClassInfo())){
             Tutor tutor = tutorRepository.findById(id).orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));
             tutor.setTutorType(TutorType.ALL);
             tutorRepository.save(tutor);
        }
    }

    private String prePathImagePc() {
        String currentUser = currentUserUtils.currentUserName();
        return SLASH + USERS + SLASH + currentUser + SLASH;
    }

    private String prePathFiles(Long id) {
        return SLASH + TUTOR_APPLICATION + SLASH +
                LIVE_CLASS + SLASH + String.valueOf(id) + SLASH;
    }
}
