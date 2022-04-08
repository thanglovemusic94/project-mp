package com.mintpot.carcloth.controller.app;

import com.mintpot.carcloth.dto.AppNoticeDto;
import com.mintpot.carcloth.dto.BannerDto;
import com.mintpot.carcloth.dto.ConstructionExDto;
import com.mintpot.carcloth.dto.MainHomeDto;
import com.mintpot.carcloth.dto.car.CarInfoDto;
import com.mintpot.carcloth.dto.quote.TransactionRequest;
import com.mintpot.carcloth.entity.embeddable.FileInfo;
import com.mintpot.carcloth.exception.CommonException;
import com.mintpot.carcloth.exception.ErrorCode;
import com.mintpot.carcloth.repository.AppNoticeRepository;
import com.mintpot.carcloth.repository.BannerRepository;
import com.mintpot.carcloth.repository.ConstructionExampleRepository;
import com.mintpot.carcloth.repository.MemberRepository;
import com.mintpot.carcloth.security.AuthenticationFacade;
import com.mintpot.carcloth.service.MainHomeService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/app/main-home")
@Api(tags = {"Main Home"})
@RequiredArgsConstructor
public class AppMainHomeController {

    private final MainHomeService mainHomeService;
    private final AuthenticationFacade authenticationFacade;
    private final MemberRepository memberRepo;
    private final BannerRepository bannerRepo;
    private final ConstructionExampleRepository constructionExRepo;
    private final AppNoticeRepository noticeRepo;
    private final ModelMapper mapper;

    @PostMapping("/request-quote")
    @ApiOperation(value = "api for app request a new quote")
    @ResponseStatus(HttpStatus.CREATED)
    public Set<FileInfo> requestQuote(@Valid @RequestBody TransactionRequest dto) {

        return mainHomeService.requestQuote(dto);
    }

    @GetMapping
    public MainHomeDto home() {
        var res = new MainHomeDto();
        long userId = authenticationFacade.getAuthentication().getUserId();
        var user = memberRepo.findById(userId).orElseThrow(() -> new CommonException(ErrorCode.USER_NOT_EXIST));
        var carType = user.getCarType();
        if (carType != null) {
            res.setCarImage(carType.getAttachFile());
            res.setCarInfo(mapper.map(carType, CarInfoDto.class));
            res.getCarInfo().setCarNumber(user.getCarNumber());
        } else {
            res.setCarInfo(new CarInfoDto());
        }
        final int itemSize = 5;
        var examples = constructionExRepo
                .findAll(PageRequest.of(0, itemSize, Sort.by("id").descending()))
                .getContent()
                .stream()
                .map(ex -> mapper.map(ex, ConstructionExDto.class))
                .collect(Collectors.toList());

        res.setExamples(examples);

        List<BannerDto> bannerDtos = new ArrayList<>();

        var banners = bannerRepo.findAll(PageRequest.of(0, 2));
        if(banners != null && !banners.isEmpty()) {
            bannerDtos = banners.stream()
                    .map( b -> mapper.map(b, BannerDto.class))
                    .collect(Collectors.toList());
        }
        res.setBanners(bannerDtos);
        return res;
    }

    @GetMapping("/notices")
    public Page<AppNoticeDto> listNotice(Pageable page) {
        long userId = authenticationFacade.getAuthentication().getUserId();
        return noticeRepo.findByRecipient_Id(userId, page).map(notice -> mapper.map(notice, AppNoticeDto.class));
    }

    @DeleteMapping("/notices/{noticeId}")
    public void removeNotice(@PathVariable long noticeId) {
        long userId = authenticationFacade.getAuthentication().getUserId();
        var notice = noticeRepo.findByIdAndRecipient_Id(noticeId, userId)
                .orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));
        noticeRepo.delete(notice);
    }

    @PatchMapping("/notices/{noticeId}")
    public void markNotice(@PathVariable long noticeId) {
        long userId = authenticationFacade.getAuthentication().getUserId();
        var notice = noticeRepo.findByIdAndRecipient_Id(noticeId, userId)
                .orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));
        notice.setHasRead(true);
        noticeRepo.save(notice);
    }
}
