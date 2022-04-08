package com.mintpot.readingm.backend.controller;


import com.mintpot.readingm.backend.dto.ChildClassNewspaperDto;
import com.mintpot.readingm.backend.dto.clazz.NewsPaperDto;
import com.mintpot.readingm.backend.entity.NewspaperColumn;
import com.mintpot.readingm.backend.exception.CommonException;
import com.mintpot.readingm.backend.exception.ErrorCode;
import com.mintpot.readingm.backend.repository.NewspaperColumnRepository;
import com.mintpot.readingm.backend.repository.TextBookClassRepository;
import com.mintpot.readingm.backend.repository.TutorRepository;
import com.mintpot.readingm.backend.security.AuthenticationFacade;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/new-paper")
@Api(tags = {"New paper"})
@RequiredArgsConstructor
public class NewspaperColumnController {
    private final NewspaperColumnRepository newspaperRepo;
    private final ModelMapper mapper;
    private final TextBookClassRepository textBookClassRepo;
    private final AuthenticationFacade authenticationFacade;
    private final TutorRepository tutorRepo;

    @ApiOperation(value = "API for web main 9-2-1-2")
    @GetMapping
    public Page<NewsPaperDto> find(@RequestParam(required = false) String field,
                                   @RequestParam(required = false) String title,
                                   @RequestParam(required = false) String author,
                                   Pageable page) {

        //final var username = authenticationFacade.getAuthentication().getUsername();
        long userid = authenticationFacade.getAuthentication().getUserId();
        var username = tutorRepo.findById(userid)
                .orElseThrow(() -> new CommonException(ErrorCode.USER_NOT_EXIST))
                .getName();

        return newspaperRepo.find(field, title, page).map(paper -> {
            var dto = mapper.map(paper, NewsPaperDto.class);
            dto.setAuthor(username);
            dto.setCreatedDate(LocalDate.now());
            return dto;
        });
    }

    @GetMapping("/{id}")
    @ApiOperation(value="API for 9-3-2 & 9-3-3")
    public NewsPaperDto getDetail(@PathVariable String id) {
        var newsPaper = newspaperRepo.findById(id).orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));
        return mapper.map(newsPaper, NewsPaperDto.class);
    }

    @GetMapping(path="/by-curriculum")
    @ApiOperation(value="Api for 8-2-3-1 News paper column")
    public ChildClassNewspaperDto getNewspaperColumn(@RequestParam long classId,
                                                     @RequestParam(required = false) Long studentId,
                                                     @RequestParam int curriculumIndex) {

        var clazz = textBookClassRepo.findById(classId).orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));
        var curriculum = clazz.getCurriculum().get(curriculumIndex);
        var newsId = curriculum.getNewPaperId();
        var res = new ChildClassNewspaperDto();
        res.setNewspaper(mapper.map(newspaperRepo.findById(newsId).orElse(new NewspaperColumn()), NewsPaperDto.class));
        return res;
    }
}
