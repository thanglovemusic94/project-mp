package com.mintpot.carcloth.controller.admin;

import com.mintpot.carcloth.constant.Constants;
import com.mintpot.carcloth.dto.admin.CompanyGroupDto;
import com.mintpot.carcloth.dto.admin.CreateCompanyGroupDto;
import com.mintpot.carcloth.dto.admin.SaveCompanyGroupDto;
import com.mintpot.carcloth.entity.CompanyGroup;
import com.mintpot.carcloth.exception.CommonException;
import com.mintpot.carcloth.exception.ErrorCode;
import com.mintpot.carcloth.repository.CompanyGroupRepository;
import com.mintpot.carcloth.repository.MemberRepository;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin/points")
@RequiredArgsConstructor
@Api(tags={"Point setting"})
public class CompanyGroupController {
    private final CompanyGroupRepository companyGroupRepo;
    private final MemberRepository memberRepository;
    private final ModelMapper mapper;

    @GetMapping
    public List<CompanyGroupDto> list() {
        var sort = Sort.by("id").descending();
        return companyGroupRepo.findAll(sort).stream()
                .map(g -> mapper.map(g, CompanyGroupDto.class))
                .collect(Collectors.toList());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Transactional
    public void create(@Valid @RequestBody CreateCompanyGroupDto dto) {
        if(companyGroupRepo.findByName(dto.getName()).isPresent()) {
            throw new CommonException(ErrorCode.COMPANY_GROUP_NAME_EXISTED);
        }

        companyGroupRepo.save(new CompanyGroup(dto.getName()));
    }

    @PutMapping
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Transactional
    public void edit(@RequestBody List<SaveCompanyGroupDto> companyGroupDtos) {
        for (var companyGroupDto : companyGroupDtos) {
            var companyGroup = companyGroupRepo.findById(companyGroupDto.getId())
                    .orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));

            companyGroup.setFee(companyGroupDto.getFee());
            companyGroup.setDeliveryCost(companyGroupDto.getDeliveryCost());
            companyGroupRepo.save(companyGroup);
        }
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable long id) {
        var companyGroup = companyGroupRepo.findById(id)
                .orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));

        if(Constants.GENERAL_GROUP.equals(companyGroup.getName())) {
            throw  new CommonException(ErrorCode.COMPANY_GROUP_CANNOT_DELETE);
        }

        var members = companyGroup.getMembers();
        if (members != null && !members.isEmpty()) {
            var generalGroup = companyGroupRepo.findByName(Constants.GENERAL_GROUP).orElse(null);
            members.forEach( m -> {
                m.setGroup(generalGroup);
                memberRepository.save(m);
            });
        }

        companyGroupRepo.delete(companyGroup);
    }
}
