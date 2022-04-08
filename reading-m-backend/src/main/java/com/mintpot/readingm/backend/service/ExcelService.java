package com.mintpot.readingm.backend.service;

import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Workbook;

import java.util.LinkedHashMap;
import java.util.List;

public interface ExcelService {
    void createHeader(Row row, Iterable<String> headers);

    <E> void addSheet(Workbook workbook, String sheetName, LinkedHashMap<String, String> columnMap, List<E> data) throws Exception;
}
