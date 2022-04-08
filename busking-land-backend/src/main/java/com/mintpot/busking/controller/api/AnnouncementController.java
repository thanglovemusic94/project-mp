package com.mintpot.busking.controller.api;


import com.mintpot.busking.dto.SliceDto;
import com.mintpot.busking.dto.api.AnnouncementInfoDto;
import com.mintpot.busking.service.AnnouncementService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Api(tags = { "Announcements "})
public class AnnouncementController {

    private final AnnouncementService announcementService;

    public AnnouncementController(AnnouncementService announcementService) {
        this.announcementService = announcementService;
    }

    @GetMapping("/announcements")
    @ApiOperation("Get List Announcements")
    SliceDto<AnnouncementInfoDto> getAnnouncements (@RequestParam int page,
                                                   @RequestParam int size) {
        return announcementService.getAllAnnouncement(PageRequest.of(page, size));
    }
}
