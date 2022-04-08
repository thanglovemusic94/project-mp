package com.mintpot.readingm.backend.service.impl;

import com.mintpot.readingm.backend.dto.settlement.*;
import com.mintpot.readingm.backend.entity.clazz.GoalClass;
import com.mintpot.readingm.backend.entity.clazz.LiveClass;
import com.mintpot.readingm.backend.entity.clazz.TextBookClass;
import com.mintpot.readingm.backend.entity.constant.ClassType;
import com.mintpot.readingm.backend.entity.constant.RefundStatus;
import com.mintpot.readingm.backend.entity.constant.SettlementStatus;
import com.mintpot.readingm.backend.entity.settlement.AttendClass;
import com.mintpot.readingm.backend.entity.settlement.Settlement;
import com.mintpot.readingm.backend.entity.user.Tutor;
import com.mintpot.readingm.backend.exception.CommonException;
import com.mintpot.readingm.backend.exception.ErrorCode;
import com.mintpot.readingm.backend.repository.AttendClassRepository;
import com.mintpot.readingm.backend.repository.PaymentRepository;
import com.mintpot.readingm.backend.repository.SettlementRepository;
import com.mintpot.readingm.backend.service.AttendService;
import com.mintpot.readingm.backend.service.ExcelService;
import com.mintpot.readingm.backend.service.LiveClassService;
import com.mintpot.readingm.backend.service.SettlementService;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.util.Strings;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAdjusters;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SettlementServiceImpl implements SettlementService {

    private final AttendService attendService;

    private final AttendClassRepository attendClassRepo;

    private final PaymentRepository paymentRepository;

    private final SettlementRepository settlementRepository;

    private final ExcelService excelService;

    private final LiveClassService liveClassService;

    private final ModelMapper mapper;

    @Override
    public Page<SettlementListDto> searchSettlement(ClassType classType, SettlementStatus settlementStatus, String tutorName,
                                                    LocalDate startDate, LocalDate endDate, String optionSearch, String term, Pageable page) {
        String strClassType = null;
        if (classType == ClassType.LIVE_BOOK) {
            strClassType = TextBookClass.class.getSimpleName();
        } else if (classType == ClassType.LIVE_GOAL){
            strClassType = GoalClass.class.getSimpleName();
        }

        String className = null;
        String tuitionFee = null;
        String payerNumber = null;
        String fee = null;
        String tax = null;
        String amount = null;

        if(!Strings.isBlank(optionSearch)) {
            if("className".equals(optionSearch)) {
                className = term;
                term = null;
            } else if("tuitionFee".equals(optionSearch)) {
                tuitionFee = term;
                term = null;
            } else if("payerNumber".equals(optionSearch)) {
                payerNumber = term;
                term = null;
            } else if("fee".equals(optionSearch)) {
                fee = term;
                term = null;
            } else if("tax".equals(optionSearch)) {
                tax = term;
                term = null;
            } else if("amount".equals(optionSearch)) {
                amount = term;
                term = null;
            }
        }

        return settlementRepository.find(strClassType, settlementStatus, tutorName, startDate, endDate,
            className, tuitionFee, payerNumber, fee, tax, amount ,term, page, SettlementListDto.class);
    }

    @Override
    public SettlementDetailDto getDetail(long id) {
        return settlementRepository.findById(id, SettlementDetailDto.class)
                .orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));
    }

    @Override
    public List<AttendClassDto> groupAttend(long settlementId) {
        var settlement = settlementRepository.findById(settlementId)
                .orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));

        return attendService.groupAttendByClassTime(
                new ArrayList<>(settlement.getAttendClass()));
    }

    @Override
    public void summarySettlementByClass(LiveClass liveClass) {
        List<AttendClass> attendClassList = getAttend(liveClass.getId());
        int payerNumber = paymentRepository.countPaymentNotRefund(liveClass);
        Settlement settlement = new Settlement();
        settlement.setAttendClass(new HashSet<>(attendClassList));
        settlement.setPayerNumber(payerNumber);
        settlement.setLiveClass(liveClass);
        settlement.setStatus(SettlementStatus.UN_SETTLED);
        settlementRepository.save(settlement);

    }

    @Override
    public void completeSettlement(long id) {
        Settlement settlement = settlementRepository.findById(id)
                .orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));

        settlement.setStatus(SettlementStatus.SETTLEMENT_COMPLETED);
        settlement.setSettledDate(LocalDateTime.now());
        settlementRepository.save(settlement);
    }

    @Override
    public Page<TutorSettlementDto> findByTutor(long tutorId, Pageable page) {
        return settlementRepository.findByLiveClass_Tutor_Id(tutorId, page, TutorSettlementDto.class);
    }

    @Override
    public byte[] exportExcel(List<Long> ids) throws Exception {
        List<Settlement> settlementList = settlementRepository.findAllById(ids);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd hh:mm a");
        LinkedHashMap<String, String> settlementColumnMap = new LinkedHashMap<>();
        settlementColumnMap.put("정산상태", "status");
        settlementColumnMap.put("정산 완료일", "settledDate");
        settlementColumnMap.put("수업 개설일", "classDate");
        settlementColumnMap.put("지도교사 이름", "tutorName");
        settlementColumnMap.put("수업 종류", "classType");
        settlementColumnMap.put("수업명", "className");
        settlementColumnMap.put("교육비", "tuitionFee");
        settlementColumnMap.put("결제 인원", "payerNumber");
        settlementColumnMap.put("수수료", "fee");
        settlementColumnMap.put("세금", "tax");
        settlementColumnMap.put("PG사 수수료", "pgFee");
        settlementColumnMap.put("정산금액", "amount");
        settlementColumnMap.put("은행", "bank");
        settlementColumnMap.put("계좌번호", "bankAccount");

        LinkedHashMap<String, String> attendColumnMap = new LinkedHashMap<>();
        attendColumnMap.put("수업일시", "classDate");
        attendColumnMap.put("지도교사 수업 여부", "tutorInClass");
        attendColumnMap.put("학생명", "studentName");
        attendColumnMap.put("학생 출석 여부", "studentAttend");
        Workbook wb = new XSSFWorkbook();
        int i = 1;

        for (Settlement settlement : settlementList) {
            ExcelSettlementDto excelSettlement = mapper.map(settlement, ExcelSettlementDto.class);
            excelSettlement.setStatus(settlement.getStatus().getKoreanLabel());
            LiveClass liveClass = settlement.getLiveClass();
            Tutor tutor = liveClass.getTutor();
            excelSettlement.setClassDate(liveClass.getOpenDate());
            excelSettlement.setClassType(liveClassService.classTypeInKor(liveClass));
            excelSettlement.setClassName(liveClass.getName());
            excelSettlement.setTuitionFee(liveClass.getTuitionFee());
            excelSettlement.setTutorName(tutor.getName());
            excelSettlement.setBank(tutor.getBank());
            excelSettlement.setBankAccount(tutor.getBankAccount());
            excelService.addSheet(wb, "Settlement" + i, settlementColumnMap, List.of(excelSettlement));
            var attendList = attendService.groupAttendByClassTime(
                    new ArrayList<>(settlement.getAttendClass()));

            List<ExcelAttendDto> excelAttendList = new ArrayList<>();
            for (var attend : attendList) {
                String startTime = attend.getStartTime().format(formatter);
                String endTime = attend.getEndTime().format(formatter);
                String classTime = startTime + " - " + endTime;
                for (var participant : attend.getStudents()) {
                    ExcelAttendDto excelAttend = new ExcelAttendDto();
                    excelAttendList.add(excelAttend);
                    excelAttend.setClassDate(classTime);
                    excelAttend.setTutorInClass(attend.isTutorPresent());
                    excelAttend.setStudentName(participant.getName());
                    excelAttend.setStudentAttend(participant.isPresent());
                }
            }

            excelService.addSheet(wb, "AttendClass" + i, attendColumnMap, excelAttendList);
            i++;
        }

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        wb.write(outputStream);
        return outputStream.toByteArray();
    }

    private List<AttendClass> getAttend(long classId) {
        var previousMonth = LocalDate.now().minusMonths(1);
        var startDay = previousMonth.withDayOfMonth(1);
        var startTime= LocalDateTime.of(startDay, LocalTime.of(0, 0, 0));
        var endDay = previousMonth.with(TemporalAdjusters.lastDayOfMonth());
        var endTime = LocalDateTime.of(endDay, LocalTime.of(0, 0, 0));
        return attendClassRepo.findByClassAndTime(classId, startTime, endTime);
    }
}
