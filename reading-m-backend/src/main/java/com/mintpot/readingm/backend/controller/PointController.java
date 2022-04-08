package com.mintpot.readingm.backend.controller;

import com.mintpot.readingm.backend.dto.admin.PointDto;
import com.mintpot.readingm.backend.dto.admin.SavePointDto;
import com.mintpot.readingm.backend.entity.constant.PointType;
import com.mintpot.readingm.backend.security.AuthenticationFacade;
import com.mintpot.readingm.backend.service.PointService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/admin/point")
@RequiredArgsConstructor
@Api(tags = {"Point"})
public class PointController {
    private final PointService pointService;
    private final AuthenticationFacade authenticationFacade;

    @GetMapping
    public Page<PointDto> list(@RequestParam(required = false) PointType type,
                               @RequestParam(required = false) String optionSearch,
                               @RequestParam(required = false) String term,
                               Pageable page) {

        authenticationFacade.assertAdmin();
        return pointService.find(type, optionSearch, term, page);
    }

    @GetMapping("/{id}")
    public SavePointDto getDetail(@PathVariable long id) {
        authenticationFacade.assertAdmin();
        return pointService.findById(id);
    }

    @PatchMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void edit(@PathVariable long id, @RequestBody SavePointDto dto) {
        authenticationFacade.assertAdmin();
        pointService.editPoint(id, dto);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void addPoint(@RequestBody SavePointDto dto) {
        authenticationFacade.assertAdmin();
        pointService.addPoint(dto);
    }

    @DeleteMapping
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removePoint(@RequestParam List<Long> ids) {
        authenticationFacade.assertAdmin();
        pointService.removePoint(ids);
    }

}
