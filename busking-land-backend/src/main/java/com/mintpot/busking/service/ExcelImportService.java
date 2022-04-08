package com.mintpot.busking.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;

public interface ExcelImportService {

    boolean hasExcelFormat (MultipartFile file);

    void excelLands (InputStream is);
}
