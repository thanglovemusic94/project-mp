package com.mintpot.pii.controller;

import com.mintpot.pii.exception.BusinessException;
import com.mintpot.pii.exception.error.ErrorCode;
import com.mintpot.pii.facade.AuthenticationFacade;
import com.mintpot.pii.repository.UserCardRepository;
import io.swagger.annotations.Api;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cards")
@Api("Credit Card")
public class CardController {

    private final UserCardRepository cardRepo;

    private final AuthenticationFacade authFacade;

    public CardController(UserCardRepository cardRepo, AuthenticationFacade authFacade) {
        this.cardRepo = cardRepo;
        this.authFacade = authFacade;
    }

    @DeleteMapping("/{cardId}")
    @PreAuthorize("hasAnyRole('ROLE_USER', 'ADMIN')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void deleteById(@PathVariable long cardId) {
        final var userId = authFacade.getAuthentication().getUserId();

        final var card = cardRepo.findById(cardId)
                .orElseThrow(() -> new BusinessException(ErrorCode.CARD_NOT_FOUND));

        if(card.getUser().getId() != userId && !authFacade.hasRole("ADMIN"))
            throw new BusinessException(ErrorCode.AUTH_FORBIDDEN);

        cardRepo.delete(card);
    }
}
