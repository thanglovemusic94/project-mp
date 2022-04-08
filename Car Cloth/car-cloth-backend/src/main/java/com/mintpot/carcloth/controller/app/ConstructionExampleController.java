package com.mintpot.carcloth.controller.app;

import com.mintpot.carcloth.constant.ShowStatus;
import com.mintpot.carcloth.dto.ConstructionExampleDetailDto;
import com.mintpot.carcloth.dto.EditConstructionExample;
import com.mintpot.carcloth.dto.MyConstructionExampleDto;
import com.mintpot.carcloth.dto.RegConstructionExample;
import com.mintpot.carcloth.entity.ConstructionExample;
import com.mintpot.carcloth.entity.embeddable.FileInfo;
import com.mintpot.carcloth.exception.CommonException;
import com.mintpot.carcloth.exception.ErrorCode;
import com.mintpot.carcloth.repository.CompanyQuoteRepository;
import com.mintpot.carcloth.repository.ConstructionExampleRepository;
import com.mintpot.carcloth.repository.MemberRepository;
import com.mintpot.carcloth.security.AuthenticationFacade;
import com.mintpot.carcloth.utils.StorageService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/app/construction-example")
@Api(tags = {"Construction example"})
@RequiredArgsConstructor
public class ConstructionExampleController {
    private static final String PATH_STORAGE_CE = "construction-example/quote%d/%s";
    private final StorageService storageService;
    private final MemberRepository memberRepo;
    private final CompanyQuoteRepository quoteRepo;
    private final ConstructionExampleRepository constructionExampleRepo;
    private final AuthenticationFacade authenticationFacade;
    private final ModelMapper mapper;

    @GetMapping
    public Page<MyConstructionExampleDto> constructionExampleList(Pageable page) {
        long userId = authenticationFacade.getAuthentication().getUserId();
        var user = memberRepo.findById(userId).orElseThrow(() -> new CommonException(ErrorCode.USER_NOT_EXIST));
        var examples = Page.<ConstructionExample>empty();

        if (user.isCompanyMember()) {
            examples =  constructionExampleRepo.findByWriter_Id(userId, page);
        } else {
            examples = constructionExampleRepo.findAll(page);
        }

        return examples.map(ex -> {
            var dto = mapper.map(ex, MyConstructionExampleDto.class);
            dto.setCompanyName(ex.getQuotation().getCompany().getCompanyName());
            return dto;
        });
    }

    @GetMapping("/{id}")
    public ConstructionExampleDetailDto constructionExampleDetail(@PathVariable long id) {
        var constructionEx = constructionExampleRepo.findById(id)
                .orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));

        var dto = mapper.map(constructionEx, ConstructionExampleDetailDto.class);
        var company = constructionEx.getQuotation().getCompany();
        dto.setCompanyId(company.getId());
        dto.setCompanyName(company.getCompanyName());

        return dto;
    }

    @PostMapping
    public List<URL> register(@Valid @RequestBody RegConstructionExample constructionExDto) {
        long userId = authenticationFacade.getAuthentication().getUserId();
        var writer = memberRepo.findById(userId).orElseThrow(() -> new CommonException(ErrorCode.USER_NOT_EXIST));
        var quote = quoteRepo.findById(constructionExDto.getQuoteId())
                .orElseThrow(() -> new CommonException(ErrorCode.QUOTATION_NOT_FOUND));

        var constructionExample = new ConstructionExample();
        constructionExample.setStatus(ShowStatus.SHOW);
        constructionExample.setWriter(writer);
        constructionExample.setQuotation(quote);
        constructionExample.setCarType(quote.getTransaction().getRequester().getCarType());
        constructionExample.setContent(constructionExDto.getContent());
        constructionExample.setCompletedDate(constructionExDto.getCompletedDate());
        var imgNames = constructionExDto.getImages();
        var urls = new ArrayList<URL>();
        var filesInfo = new ArrayList<FileInfo>();

        for (var img : imgNames) {
            var objKey = String.format(PATH_STORAGE_CE,
                    constructionExDto.getQuoteId(), System.currentTimeMillis() + "_" + img);

            var url = storageService.getPresignedUrl(objKey, true);
            urls.add(url);
            filesInfo.add(new FileInfo(img, objKey));
        }

        constructionExample.setImages(filesInfo);
        constructionExampleRepo.save(constructionExample);
        return urls;
    }

    @PatchMapping("/{id}")
    public List<URL> edit(@PathVariable long id, @RequestBody EditConstructionExample constructionExDto) {
        long userId = authenticationFacade.getAuthentication().getUserId();
        var constructionEx = constructionExampleRepo.findById(id)
                .orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));

        if (constructionEx.getWriter().getId() != userId) {
            throw new CommonException(ErrorCode.NO_PERMISSION);
        }

        var oldImages = constructionEx.getImages();
        var changedImage = false;
        List<URL> urls = new ArrayList<>();
        var imgNames = constructionExDto.getImages();
        if (imgNames != null && imgNames.size() > 0) {
            var filesInfo = new ArrayList<FileInfo>();

            for (var img : imgNames) {
                var objKey = String.format(PATH_STORAGE_CE, constructionEx.getQuotation().getId(),
                        System.currentTimeMillis() + "_" + img);

                var url = storageService.getPresignedUrl(objKey, true);
                urls.add(url);
                filesInfo.add(new FileInfo(img, objKey));
            }

            constructionEx.setImages(filesInfo);
            changedImage = true;
        }

        if (constructionExDto.getContent() != null) {
            constructionEx.setContent(constructionExDto.getContent());
        }

        constructionExampleRepo.save(constructionEx);
        if (changedImage) {  // delete old images
            storageService.remove(oldImages.stream().map(FileInfo::getObjectKey).collect(Collectors.toList()));
        }
        return urls;
    }
}
