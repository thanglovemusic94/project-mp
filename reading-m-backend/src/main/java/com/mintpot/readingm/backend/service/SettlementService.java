package com.mintpot.readingm.backend.service;

import com.mintpot.readingm.backend.dto.settlement.AttendClassDto;
import com.mintpot.readingm.backend.dto.settlement.SettlementDetailDto;
import com.mintpot.readingm.backend.dto.settlement.SettlementListDto;
import com.mintpot.readingm.backend.dto.settlement.TutorSettlementDto;
import com.mintpot.readingm.backend.entity.clazz.LiveClass;
import com.mintpot.readingm.backend.entity.constant.ClassType;
import com.mintpot.readingm.backend.entity.constant.SettlementStatus;
import com.mintpot.readingm.backend.entity.settlement.AttendClass;
import com.mintpot.readingm.backend.entity.user.Tutor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;

public interface SettlementService {

    Page<SettlementListDto> searchSettlement(ClassType classType, SettlementStatus settlementStatus, String tutorName,
                                             LocalDate startDate, LocalDate endDate, String optionSearch, String term, Pageable page);

    SettlementDetailDto getDetail(long id);

    List<AttendClassDto> groupAttend(long settlementId);

    void summarySettlementByClass(LiveClass liveClass);

    void completeSettlement(long id);

    Page<TutorSettlementDto> findByTutor(long tutorId, Pageable page);

    byte[] exportExcel(List<Long> ids) throws Exception;
}
