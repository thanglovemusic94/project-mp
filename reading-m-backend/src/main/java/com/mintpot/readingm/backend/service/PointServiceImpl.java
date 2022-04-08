package com.mintpot.readingm.backend.service;

import com.mintpot.readingm.backend.dto.admin.ParentDto;
import com.mintpot.readingm.backend.dto.admin.PointDto;
import com.mintpot.readingm.backend.dto.admin.SavePointDto;
import com.mintpot.readingm.backend.entity.Point;
import com.mintpot.readingm.backend.entity.constant.IssuingMode;
import com.mintpot.readingm.backend.entity.constant.PointAction;
import com.mintpot.readingm.backend.entity.constant.PointType;
import com.mintpot.readingm.backend.entity.user.Parent;
import com.mintpot.readingm.backend.exception.CommonException;
import com.mintpot.readingm.backend.exception.ErrorCode;
import com.mintpot.readingm.backend.repository.ParentRepository;
import com.mintpot.readingm.backend.repository.PointRepository;
import com.mintpot.readingm.backend.user.User;
import com.mintpot.readingm.backend.user.UserRepository;
import com.mintpot.readingm.backend.user.UserStatus;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.util.Strings;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PointServiceImpl implements PointService {

    private final PointRepository pointRepository;

    private final ParentRepository parentRepository;

    private final ModelMapper mapper;

    @Override
    public Page<PointDto> find(PointType type, String optionSearch, String term, Pageable page) {
        String pointName = null;
        String point = null;

        if(!Strings.isBlank(optionSearch)) {
            if("pointName".equals(optionSearch)) {
                pointName = term;
                term = null;
            } else if("point".equals(optionSearch)) {
                point = term;
                term = null;
            }
        }

        return pointRepository.find(type, pointName, point, term, page).map(p -> mapper.map(p, PointDto.class));
    }

    @Override
    public void editPoint(Long id, SavePointDto dto) {
        Point point = pointRepository.findById(id).orElseThrow(() ->
                new CommonException(ErrorCode.ENTITY_NOT_FOUND));

        point.setType(dto.getType() != null ? dto.getType() : point.getType());
        point.setName(dto.getName() != null ? dto.getName() : point.getName());
        point.setAmount(dto.getAmount() != null ? dto.getAmount() : point.getAmount());
        point.setStartValidDate(dto.getStartValidDate() != null ? dto.getStartValidDate() : point.getStartValidDate());
        point.setEndValidDate(dto.getEndValidDate() != null ? dto.getEndValidDate() : point.getEndValidDate());
        point.setIssuingMode(dto.getIssuingMode() != null ? dto.getIssuingMode() : point.getIssuingMode());
        Set<Long> parentIdList = dto.getParentIdList();
        if (point.getIssuingMode() == IssuingMode.SELECT && parentIdList != null &&
            parentIdList.size() > 0
        ) {
            point.setMembers(new HashSet<>(parentRepository.findAllById(parentIdList)));
        } else if (point.getIssuingMode() == IssuingMode.ALL) {
            point.setMembers(new HashSet<>());
        }

        pointRepository.save(point);
    }

    @Override
    public void addPoint(SavePointDto dto) {
        Point point = mapper.map(dto, Point.class);
        point.setAction(PointAction.PROVIDE);
        Set<Long> parentIdList = dto.getParentIdList();
        if (parentIdList != null && !parentIdList.isEmpty()) {
            point.setMembers(new HashSet<>(parentRepository.findAllById(parentIdList)));
        }
        pointRepository.save(point);
    }

    @Override
    public void removePoint(List<Long> ids) {
        for (long id: ids) {
            pointRepository.deleteById(id);
        }
    }

    @Override
    public SavePointDto findById(Long id) {
        Point point = pointRepository.findById(id).orElseThrow(() ->
                new CommonException(ErrorCode.ENTITY_NOT_FOUND));

        SavePointDto dto = mapper.map(point, SavePointDto.class);
        Set<Parent> members = point.getMembers();
        if (members != null) {
            dto.setParentIdList(members.stream().map(User::getId).collect(Collectors.toSet()));
        }
        return dto;
    }
}
