package com.mintpot.readingm.backend.service;

import org.apache.poi.ss.usermodel.*;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class ExcelServiceImpl implements  ExcelService {
    @Override
    public void createHeader(Row row, Iterable<String> headers) {
        int i = 0;
        for(String header: headers) {
            row.createCell(i++).setCellValue(header);
        }
    }

    @Override
    public <E> void addSheet(Workbook wb, String sheetName, LinkedHashMap<String, String> columnMap, List<E> data) throws Exception {
        Sheet sheet = wb.createSheet(sheetName);
        int rowIdx = 0;
        Row row = sheet.createRow(rowIdx++);
        createHeader(row, columnMap.keySet());
        if (data == null || data.size() == 0) {
            return;
        }

        Class<?> clazz = data.get(0).getClass();
        CellStyle cellStyle = wb.createCellStyle();
        CreationHelper createHelper = wb.getCreationHelper();

        Map<String, Field> fieldMap = new LinkedHashMap<>();

        for(String header : columnMap.keySet()) {
            Field field = clazz.getDeclaredField(columnMap.get(header));
            field.setAccessible(true);
            fieldMap.put(header, field);
        }

        for (E e : data) {
            row = sheet.createRow(rowIdx++);
            int cellIdx = 0;

            for(String header : columnMap.keySet()) {
                Cell cell = row.createCell(cellIdx++);
                Field field = fieldMap.get(header);
                Object value = field.get(e);
                Class<?> fieldType = field.getType();

                if (fieldType.equals(LocalDateTime.class)) {
                    cell.setCellValue(LocalDateTime.now());
                    cellStyle.setDataFormat(createHelper.createDataFormat().getFormat("yyyy-MM-dd HH:mm:ss"));
                    cell.setCellStyle(cellStyle);
                } else if (fieldType.equals(LocalDate.class)) {
                    cell.setCellValue((LocalDate) value);
                    cellStyle.setDataFormat(createHelper.createDataFormat().getFormat("yyyy-MM-dd"));
                    cell.setCellStyle(cellStyle);
                } else if (fieldType.equals(Date.class)) {
                    cell.setCellValue((Date) value);
                    cellStyle.setDataFormat(createHelper.createDataFormat().getFormat("yyyy-MM-dd"));
                    cell.setCellStyle(cellStyle);
                } else {
                    cell.setCellValue(value == null ? "" : String.valueOf(value));
                }
            }
        }
    }

}
