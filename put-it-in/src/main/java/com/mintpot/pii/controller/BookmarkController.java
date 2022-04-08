package com.mintpot.pii.controller;

import com.mintpot.pii.dto.BookmarkDto;
import com.mintpot.pii.entity.Bookmark;
import com.mintpot.pii.entity.User;
import com.mintpot.pii.entity.id.UserBranchId;
import com.mintpot.pii.exception.BusinessException;
import com.mintpot.pii.exception.error.ErrorCode;
import com.mintpot.pii.facade.AuthenticationFacade;
import com.mintpot.pii.repository.BookmarkRepository;
import com.mintpot.pii.repository.UserRepository;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/bookmarks")
@RestController
@Api(tags = {"Bookmark"})
@RequiredArgsConstructor
public class BookmarkController {

    private final AuthenticationFacade authFacade;

    private final BookmarkRepository bookmarkRepo;

    private final UserRepository userRepo;

    @GetMapping
    @PreAuthorize("hasRole('ROLE_USER')")
    Page<Bookmark> getAllBookmark(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdOn").descending());
        final var userId = authFacade.getAuthentication().getUserId();
        User user = userRepo.findById(userId).orElseThrow(()->new BusinessException(ErrorCode.ENTITY_NOT_FOUND));
        return bookmarkRepo.findAllByUser(user, pageable);
    }

    @GetMapping("/{branchId}")
    @PreAuthorize("hasRole('ROLE_USER')")
    ResponseEntity<?> existsBranchBookmark(@PathVariable final long branchId) {
        final var userId = authFacade.getAuthentication().getUserId();
        var isBookmarked =
                bookmarkRepo.existsById(UserBranchId.builder().userId(userId).branchId(branchId).build());
        if (isBookmarked)
            return ResponseEntity.ok(BookmarkDto.builder().branchId(branchId).userId(userId).build());
        else return ResponseEntity.notFound().build();
    }

    @PutMapping("/{branchId}")
    @PreAuthorize("hasRole('ROLE_USER')")
    @ResponseStatus(HttpStatus.CREATED)
    void bookmarkBranch(@PathVariable final long branchId) {
        final var userId = authFacade.getAuthentication().getUserId();
        Bookmark bm = Bookmark.builder().userId(userId).branchId(branchId).build();
        bookmarkRepo.save(bm);
    }

    @DeleteMapping("/{branchId}")
    @PreAuthorize("hasRole('ROLE_USER')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void unbookmarkBranch(@PathVariable final long branchId) {
        final var userId = authFacade.getAuthentication().getUserId();
        bookmarkRepo.deleteById(UserBranchId.builder().userId(userId).branchId(branchId).build());
    }
}
