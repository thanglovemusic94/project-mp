package com.mintpot.pii.controller;

import com.mintpot.pii.entity.BoardFAQ;
import com.mintpot.pii.repository.BoardFAQRepository;
import io.swagger.annotations.Api;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/boardFAQs")
@Api("Board FAQ")
public class BoardFAQController {

    private final BoardFAQRepository boardFAQRepo;

    public BoardFAQController(BoardFAQRepository boardFAQRepo) {
        this.boardFAQRepo = boardFAQRepo;
    }

    @GetMapping
    Page<BoardFAQ> getAll(Pageable page) {
        return boardFAQRepo.findAll(page);
    }
}
