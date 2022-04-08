package com.mintpot.pii.controller;

import com.mintpot.pii.entity.BoardAnnouncement;
import com.mintpot.pii.repository.BoardAnnouncementRepository;
import io.swagger.annotations.Api;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RequestMapping("/api/boardAnnouncements")
@RestController
@Api("Board Announcement")
public class BoardAnnouncementController {

    private final BoardAnnouncementRepository boardAnnouncementRepo;

    public BoardAnnouncementController(BoardAnnouncementRepository boardAnnouncementRepo) {
        this.boardAnnouncementRepo = boardAnnouncementRepo;
    }

    @GetMapping
    Page<BoardAnnouncement> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdOn").descending());
        return boardAnnouncementRepo.findAll(pageable);
    }

    @GetMapping("/{boardAnnouncementId}")
    Optional<BoardAnnouncement> getById(@PathVariable long boardAnnouncementId) {
        return boardAnnouncementRepo.findById(boardAnnouncementId);
    }
}
