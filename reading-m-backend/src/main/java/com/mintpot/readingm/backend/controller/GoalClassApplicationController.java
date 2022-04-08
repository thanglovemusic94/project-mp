package com.mintpot.readingm.backend.controller;

import com.mintpot.readingm.backend.dto.clazz.GoalClassApplicationDto;
import com.mintpot.readingm.backend.entity.clazz.GoalClassApplication;
import com.mintpot.readingm.backend.entity.constant.GoalClassCategory;
import com.mintpot.readingm.backend.entity.constant.QuestionStatus;
import com.mintpot.readingm.backend.entity.user.Tutor;
import com.mintpot.readingm.backend.exception.CommonException;
import com.mintpot.readingm.backend.exception.ErrorCode;
import com.mintpot.readingm.backend.repository.GoalClassApplicationRepository;
import com.mintpot.readingm.backend.repository.TutorRepository;
import com.mintpot.readingm.backend.security.AuthenticationFacade;
import com.mintpot.readingm.backend.user.User;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/goalClassApplication")
@Api(tags = {"Goal Class Application"})
@RequiredArgsConstructor
public class GoalClassApplicationController {

    private final GoalClassApplicationRepository goalClassApplicationRepo;

    private final TutorRepository tutorRepository;

    private final AuthenticationFacade authenticationFacade;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void applyGoalClass(@RequestParam GoalClassCategory category,
                               @RequestParam String title,
                               @RequestParam String content) {

        long userId = authenticationFacade.getAuthentication().getUserId();
        User applicant = new User(userId);
        GoalClassApplication application = new GoalClassApplication();
        application.setCategory(category);
        application.setTitle(title);
        application.setRequest(content);
        application.setApplicant(applicant);
        application.setStatus(QuestionStatus.WAITING);
        goalClassApplicationRepo.save(application);
    }

    @GetMapping
    public Page<GoalClassApplicationDto> getGoalClassApplication(@RequestParam(required = false) GoalClassCategory category,
                                                                 Pageable page) {
        return goalClassApplicationRepo.findByCategory(category, page, GoalClassApplicationDto.class);
    }

    @GetMapping("/byApplicant")
    public Page<GoalClassApplicationDto> getByApplicant(Pageable page) {
        long applicantId = authenticationFacade.getAuthentication().getUserId();
        return goalClassApplicationRepo.findByApplicant_Id(applicantId, page, GoalClassApplicationDto.class);
    }

    @PatchMapping("/{applicationId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void replyApplication(@PathVariable long applicationId, @RequestParam String answer) {
        var application = goalClassApplicationRepo.findById(applicationId)
                .orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));

        var tutor = new Tutor(authenticationFacade.getAuthentication().getUserId());
        application.setAnswer(answer);
        application.setRespondent(tutor);
        application.setStatus(QuestionStatus.ANSWERED);
        goalClassApplicationRepo.save(application);
    }

    @DeleteMapping("/{applicationId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removeApplication(@PathVariable long applicationId) {
        var application = goalClassApplicationRepo.findById(applicationId)
                .orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));
        long userId = authenticationFacade.getAuthentication().getUserId();
        if (application.getApplicant().getId() != userId ||
                application.getStatus() != QuestionStatus.WAITING) {

            throw new CommonException(ErrorCode.USER_NOT_ALLOWED);
        }
        goalClassApplicationRepo.deleteById(applicationId);
    }
}
