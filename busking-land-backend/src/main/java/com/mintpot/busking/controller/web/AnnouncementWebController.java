package com.mintpot.busking.controller.web;

import com.mintpot.busking.controller.AdminController;
import com.mintpot.busking.dto.AnnouncementDTO;
import com.mintpot.busking.dto.PageResponse;
import com.mintpot.busking.model.Announcement;
import com.mintpot.busking.service.AnnouncementService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@CrossOrigin(origins = {"${settings.cors_origin}"})
@RestController
@RequestMapping(path = "/web/announcement")
@Api(tags = {"Web Announcement Api"})
@Log4j2
public class AnnouncementWebController extends AdminController {

    @Autowired
    private AnnouncementService announcementService;

    @ApiOperation("Get All Announcement")
    @GetMapping("")
    public ResponseEntity<?> getAll( @RequestParam(defaultValue = "0", required = false) Integer page,
                                     @RequestParam(defaultValue = "10", required = false) Integer size
//                                     @RequestParam(defaultValue = "") List<String> sort
    )
    {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        PageResponse<AnnouncementDTO> announcementDTOs = announcementService.findAllActivated(pageable);
        return ResponseEntity.ok(announcementDTOs);
    }

    @ApiOperation("Get Announcement By Id")
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public AnnouncementDTO getAnnouncementById(@PathVariable("id") Integer id) {
        AnnouncementDTO announcementDTO = announcementService.findById(id);
        return announcementDTO;
    }

    @ApiOperation("create Announcement")
    @PostMapping("")
    @ResponseStatus(HttpStatus.CREATED)
    public AnnouncementDTO create(@Valid @RequestBody AnnouncementDTO body) {
        AnnouncementDTO announcementDTO = announcementService.create(body);
        return announcementDTO;
    }



    @ApiOperation("Put Announcement")
    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public AnnouncementDTO update(@Valid @RequestBody AnnouncementDTO body, @PathVariable Integer id) {
         return  announcementService.update(body, id);
    }

    @ApiOperation("Delete Announcement")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable Integer id) {
        announcementService.delete(id);
    }
}
