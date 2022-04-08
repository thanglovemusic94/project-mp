package com.mintpot.readingm.backend.service;

import com.mintpot.readingm.backend.dto.sms.SingleMessage;
import com.mintpot.readingm.backend.dto.sms.SmsResponse;

public interface SmsService {
    SmsResponse sendSingleMessage(SingleMessage message);
}
