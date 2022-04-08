package com.mintpot.busking.helper;

import com.mintpot.busking.model.BankWithdraw;
import com.mintpot.busking.model.constant.Status;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.TimeZone;


public class ExcelHelper {
    public static String TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
//    static String[] HEADERs = { "Application date", "Applicant", "Email", "Phone number", "Status", "Application point" };
    static String[] HEADERs = { "신청일자", "신청자", "이메일", "휴대폰 번호", "상태", "신청 코인" };
    static String SHEET = "정산 관리";
//    static String SHEET = "settlement management";

    public static ByteArrayInputStream withdrawsToExcel(List<BankWithdraw> withdraws) {

        try (Workbook workbook = new XSSFWorkbook();
             ByteArrayOutputStream out = new ByteArrayOutputStream();) {
            Sheet sheet = workbook.createSheet(SHEET);
            for (int i=0; i<7; i++){
                sheet.setColumnWidth(i, 7000);
            }

            CellStyle headerStyle = workbook.createCellStyle();
            headerStyle.setFillForegroundColor(IndexedColors.LIGHT_GREEN.getIndex());
            headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            headerStyle.setFillBackgroundColor(IndexedColors.BLACK.getIndex());

            XSSFFont font = ((XSSFWorkbook) workbook).createFont();
            font.setFontName("Arial");
            font.setFontHeightInPoints((short) 16);
            font.setBold(true);

            headerStyle.setFont(font);
            // Header
            Row headerRow = sheet.createRow(0);

            for (int col = 0; col < HEADERs.length; col++) {
                Cell cell = headerRow.createCell(col);
                cell.setCellValue(HEADERs[col]);
                cell.setCellStyle(headerStyle);
            }

            int rowIdx = 1;
            for (BankWithdraw withdraw : withdraws) {
                Row row = sheet.createRow(rowIdx++);
                SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
                sdf.setTimeZone(TimeZone.getTimeZone("Asia/Seoul"));
                String createOn = sdf.format(withdraw.getPointHistory().getCreatedOn());
                row.createCell(0).setCellValue(createOn);
                row.createCell(1).setCellValue(withdraw.getUser().getName());
                row.createCell(2).setCellValue(withdraw.getUser().getEmail());
                row.createCell(3).setCellValue(withdraw.getUser().getPhone());
                if (withdraw.getPointHistory().getStatus().equals(Status.ACTIVATED)){
//                    row.createCell(4).setCellValue("actiised");
                    row.createCell(4).setCellValue("정산 완료");
                }else {
                    row.createCell(4).setCellValue(withdraw.getPointHistory().getStatus().toString());
                }
                row.createCell(5).setCellValue(withdraw.getPointHistory().getAmount());
            }

            workbook.write(out);
            return new ByteArrayInputStream(out.toByteArray());
        } catch (IOException e) {
            throw new RuntimeException("fail to import data to Excel file: " + e.getMessage());
        }
    }
}
