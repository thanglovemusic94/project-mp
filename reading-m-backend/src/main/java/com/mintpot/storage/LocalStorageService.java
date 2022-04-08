package com.mintpot.storage;

import java.io.IOException;

public interface LocalStorageService extends StorageService {

    void uploadFile(byte[] is, String filePath);

    byte[] getFileByPath(String filePath) throws IOException;
}
