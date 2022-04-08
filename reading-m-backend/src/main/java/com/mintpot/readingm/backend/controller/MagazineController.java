package com.mintpot.readingm.backend.controller;

import com.mintpot.readingm.backend.dto.admin.magazine.MagazineRqDto;
import com.mintpot.readingm.backend.dto.admin.magazine.MagazineView;
import com.mintpot.readingm.backend.entity.Magazine;
import com.mintpot.readingm.backend.repository.MagazineRepository;
import com.mintpot.readingm.backend.service.MagazineService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/magazine")
@Api(tags = {"Magazine"})
@RequiredArgsConstructor
public class MagazineController {

    private final MagazineService magazineService;
    private final MagazineRepository magazineRepository;

    @GetMapping
    Page<MagazineView> findByQuery(@RequestParam(required = false) String query, Pageable pageable) {

        return magazineRepository.findByQuery(query, pageable);
    }

    @ApiOperation(value = "create magazine")
    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_JSON_VALUE})
    Magazine createMagazine(MagazineRqDto dto) throws IOException {
        return magazineService.create(dto);
    }

    @ApiOperation("find magazine by id")
    @GetMapping("/{id}")
    Magazine findMagazineById(@PathVariable Long id) {
        return magazineService.findById(id);
    }

    @ApiOperation("update magazine")
    @PatchMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    Magazine updateMagazine(MagazineRqDto dto, @PathVariable Long id) throws IOException {
        return magazineService.update(dto, id);
    }

    @ApiOperation("delete magazine")
    @DeleteMapping()
    void removeMagazine(@RequestParam List<Long> ids) {
        magazineService.remove(ids);
    }
}
