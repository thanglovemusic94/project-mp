package com.mintpot.readingm.backend.service;

import com.mintpot.readingm.backend.dto.admin.ClassDto;
import com.mintpot.readingm.backend.dto.payment.AdPaymentDetailDto;
import com.mintpot.readingm.backend.dto.payment.AdPaymentListView;
import com.mintpot.readingm.backend.dto.payment.SavePaymentDto;
import com.mintpot.readingm.backend.entity.CouponUsed;
import com.mintpot.readingm.backend.entity.Enrollment;
import com.mintpot.readingm.backend.entity.Payment;
import com.mintpot.readingm.backend.entity.PointUsed;
import com.mintpot.readingm.backend.entity.clazz.GoalClass;
import com.mintpot.readingm.backend.entity.clazz.LiveClass;
import com.mintpot.readingm.backend.entity.clazz.TextBookClass;
import com.mintpot.readingm.backend.entity.clazz.VodClass;
import com.mintpot.readingm.backend.entity.constant.*;
import com.mintpot.readingm.backend.entity.user.Student;
import com.mintpot.readingm.backend.exception.CommonException;
import com.mintpot.readingm.backend.exception.ErrorCode;
import com.mintpot.readingm.backend.repository.*;
import com.mintpot.readingm.backend.security.AuthenticationFacade;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.util.Strings;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {
    private final ModelMapper mapper;

    private final PaymentRepository paymentRepository;

    private final ClassRepository classRepository;

    private final StudentRepository studentRepository;

    private final ParentRepository parentRepository;

    private final PointUsedRepository pointUsedRepository;

    private final CouponUsedRepository couponUsedRepository;

    private final CouponRepository couponRepository;

    private final AuthenticationFacade authenticationFacade;

    private final ExcelService excelService;

    private final EnrollmentRepository enrollmentRepo;

    @Override
    public Page<AdPaymentDetailDto> findBySpec(Specification<Payment> query, Pageable page) {
        return paymentRepository.findAll(query, page).map(this::convertEntityToDto);
    }

    @Override
    public Page<AdPaymentListView> find(ClassType classType, PaymentMethod method, String tutorName,
                                        LocalDate startTime, LocalDate endTime,
                                        String optionSearch, String term, Pageable page) {
        String payerName = null;
        String amount = null;

        if(!Strings.isBlank(optionSearch)) {
            if("payerName".equals(optionSearch)) {
                payerName = term;
                term = null;
            } else if("amount".equals(optionSearch)) {
                amount = term;
                term = null;
            }
        }

        return paymentRepository.findCompletedPayment(
                classType != null ? classType.getCode() : null,
                method != null ? method.getCode() : null,
                tutorName,
                startTime != null ? LocalDateTime.of(startTime, LocalTime.of(0, 0, 0)) : null,
                endTime != null ? LocalDateTime.of(endTime, LocalTime.of(23, 59, 59)) : null,
                payerName, amount, term, page, AdPaymentListView.class);
    }

    @Override
    public AdPaymentDetailDto getPaymentById(Long paymentId) {
        return paymentRepository.findById(paymentId).map(this::convertEntityToDto)
                .orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));
    }

    @Override
    public Payment findEntityById(Long paymentId) {
        return paymentRepository.findById(paymentId).orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));
    }

    @Override
    public Payment createPayment(SavePaymentDto paymentDto) {
        Payment entity = mapper.map(paymentDto, Payment.class);
        entity.setStatus(PaymentStatus.PENDING);
        long parentId = authenticationFacade.getAuthentication().getUserId();
        var coupons = couponRepository.findCoupOnStillValid(parentId, paymentDto.getClassType());
        long couponId = paymentDto.getCouponId();

        if (couponId > -1) {
            var coupon = coupons.stream()
                    .filter(c -> c.getId() == paymentDto.getCouponId())
                    .findFirst().orElseThrow(() -> new CommonException(ErrorCode.PAYMENT_COUPON_NOT_VALID));

            entity.setCoupon(coupon);
        }

        entity.setFinalAmount(entity.getAmount() - entity.getCashPoint()
                - entity.getCashPoint() - entity.getDiscount());
        String orderId;
        do {
            orderId = UUID.randomUUID().toString();
        } while (paymentRepository.existsByOrderId(orderId));

        entity.setOrderId(orderId);
        var payer = parentRepository.findById(parentId).orElseThrow(() -> new CommonException(ErrorCode.USER_NOT_EXIST));
        entity.setPayer(payer);
        var existsChild = studentRepository.existsByIdAndParent_Id(paymentDto.getChildId(), parentId);

        if (!existsChild) {
            throw new CommonException(ErrorCode.PAYMENT_CHILD_NOT_FOUND);
        }

        entity.setChildren(new Student(paymentDto.getChildId()));
        var clazz = classRepository.findById(paymentDto.getClassId()).orElseThrow(() -> new CommonException(ErrorCode.CLASS_NOT_FOUND));
        entity.setClassInformation(clazz);
        if (clazz instanceof TextBookClass) {
            entity.setClassType(ClassType.LIVE_BOOK);
        } else if (clazz instanceof GoalClass) {
            entity.setClassType(ClassType.LIVE_GOAL);
        }else if (clazz instanceof VodClass) {
            //var paymenteds=paymentRepository.findByPayer(parent);
            entity.setClassType(ClassType.MATHEMATICS);
            var classVideo=((VodClass) clazz).getVideos();
            for (var pay:entity.getVideoInPays()
                 ) {
                var isExists=false;
                for (var source:classVideo
                     ) {
                    if(pay.getVideoUrl().equals(source.getVideoUrl())){
                        pay.setPrice(source.getFee());
                        pay.setTime(source.getTime());
                        pay.setVideoName(source.getName());
                        pay.setPayment(entity);
                        isExists=true;
                        break;
                    }
                }
                if(!isExists) throw new CommonException(ErrorCode.ENTITY_NOT_FOUND);
            }

            if(paymentDto.getCourseIndex() == null || paymentDto.getCourseIndex().isEmpty()) {
                throw new CommonException(ErrorCode.COURSE_EMPTY);
            }

            paymentDto.getCourseIndex().forEach( cIndex -> {
                Enrollment enrollment = new Enrollment();

                enrollment.setCourseIndex(cIndex);
                enrollment.setVodClass((VodClass)clazz);
                enrollment.setStudent(entity.getChildren());
                enrollment.setStatus(null);

                enrollmentRepo.save(enrollment);
            });
        }

        return paymentRepository.save(entity);
    }

    @Override
    @Transactional
    public Payment completePayment(Payment payment) {
        var clazz = payment.getClassInformation();
        clazz.addStudent(payment.getChildren());
        classRepository.save(clazz);
        long parentId = authenticationFacade.getAuthentication().getUserId();
        payment.setStatus(PaymentStatus.COMPLETED);
        var cashPoint = payment.getCashPoint();
        var eventPoint = payment.getEventPoint();
        var pointUsedBuilder = PointUsed
                .builder()
                .paymentId(payment.getId())
                .parentId(parentId)
                .name("Point used (" + payment.getClassInformation().getName() + ")");

        if (cashPoint > 0) {
            pointUsedRepository.save(pointUsedBuilder
                    .type(PointType.CASH_POINT)
                    .amount(cashPoint)
                    .build()
            );
        }

        if (eventPoint > 0) {
            pointUsedRepository.save(pointUsedBuilder
                    .type(PointType.EVENT_POINT)
                    .amount(eventPoint)
                    .build()
            );
        }

        var coupon = payment.getCoupon();
        if (coupon != null) {
            var couponUsed = CouponUsed
                    .builder()
                    .couponId(coupon.getId())
                    .parentId(parentId)
                    .paymentId(payment.getId())
                    .build();

            couponUsedRepository.save(couponUsed);
        }

        if(clazz instanceof VodClass) {
            List<Enrollment> enrollments = enrollmentRepo.findByClassIdAndStudentId(
                clazz.getId(), payment.getChildren().getId());

            if(enrollments != null && !enrollments.isEmpty()) {
                LocalDate dateNow = LocalDate.now();

                enrollments.forEach(c -> {
                    c.setStatus(CourseStatus.PRE_COURSE);
                    c.setPaymentDate(dateNow);

                    enrollmentRepo.save(c);
                });
            }
        }

        return paymentRepository.save(payment);
    }

    @Override
    public byte[] exportExcel(List<Long> ids) throws IOException {
        var headers = List.of("결제일시", "결제 상태", "수업 정보", "대상 학생", "수업 준비",
                "수업일시", "결제 예정 금액", "할인 금액", "현금 포인트", "이벤트 포인트", "최종 결제 금액",
                "결제 수단", "이름", "휴대폰 번호", "이메일", "자녀 정보");

        Workbook wb = new XSSFWorkbook();
        CreationHelper createHelper = wb.getCreationHelper();
        CellStyle cellStyle = wb.createCellStyle();
        cellStyle.setDataFormat(createHelper.createDataFormat().getFormat("yyyy-MM-dd HH:mm:ss"));
        Sheet sheet = wb.createSheet();
        int rowIdx = 0;
        Row row = sheet.createRow(rowIdx++);
        excelService.createHeader(row, headers);
        var paymentList = paymentRepository.findAllById(ids);
        for (Payment payment : paymentList) {
            AdPaymentDetailDto dto = convertEntityToDto(payment);
            row = sheet.createRow(rowIdx++);
            int cellIdx = 0;
            Cell cell = row.createCell(cellIdx++);
            cell.setCellValue(dto.getPaymentTime());

            cell.setCellStyle(cellStyle);
            cell = row.createCell(cellIdx++);
            cell.setCellValue(dto.getStatus().getKoreanLabel());

            cell = row.createCell(cellIdx++);
            cell.setCellValue(dto.getClassType().getKoreanLabel());

            cell = row.createCell(cellIdx++);
            var grade = dto.getClassInformation().getTargetStudentGrade();
            cell.setCellValue(grade == null ? "" : grade);

            cell = row.createCell(cellIdx++);
            var materials = dto.getClassInformation().getMaterials();
            cell.setCellValue(materials == null ? "" : materials);

            cell = row.createCell(cellIdx++);
            cell.setCellValue(dto.getClassInformation().getOpenDate());
            cell.setCellStyle(cellStyle);

            cell = row.createCell(cellIdx++);
            cell.setCellValue(dto.getAmount());

            cell = row.createCell(cellIdx++);
            cell.setCellValue(dto.getDiscount());

            cell = row.createCell(cellIdx++);
            cell.setCellValue(dto.getCashPoint());

            cell = row.createCell(cellIdx++);
            cell.setCellValue(dto.getEventPoint());

            cell = row.createCell(cellIdx++);
            cell.setCellValue(dto.getPayValue());

            cell = row.createCell(cellIdx++);
            cell.setCellValue(dto.getMethod().getKoreanLabel());

            cell = row.createCell(cellIdx++);
            cell.setCellValue(dto.getPayer().getName());

            cell = row.createCell(cellIdx++);
            cell.setCellValue(dto.getPayer().getPhone());

            cell = row.createCell(cellIdx++);
            cell.setCellValue(dto.getPayer().getEmail());

            cell = row.createCell(cellIdx);
            cell.setCellValue(dto.getChildrenName());
        }

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        wb.write(outputStream);
        return outputStream.toByteArray();
    }

    @Override
    public AdPaymentDetailDto convertEntityToDto(Payment entity) {
        AdPaymentDetailDto dto = mapper.map(entity, AdPaymentDetailDto.class);
        dto.setPaymentTime(entity.getCreatedOn());
        com.mintpot.readingm.backend.entity.clazz.Class clazz = entity.getClassInformation();
        ClassDto classDto = mapper.map(clazz, ClassDto.class);
        if (clazz instanceof LiveClass) {
            classDto.setTutorName(((LiveClass) clazz).getTutor().getName());
        }
        dto.setClassInformation(classDto);
        dto.setPayValue(entity.getFinalAmount());
        dto.setChildrenName(entity.getChildren().getName());
        return dto;
    }

}
