package com.mintpot.pii.entity;

import com.mintpot.pii.entity.constant.ConfigId;
import com.mintpot.pii.exception.BusinessException;
import com.mintpot.pii.exception.error.ErrorCode;
import com.mintpot.pii.repository.ConfigRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.persistence.PrePersist;
import java.util.regex.Pattern;

@Component
public class CompanyEntityListener { 

    private final Integer MAX_INCREMENT = 99;
    private final String START_INCREMENT = "01";

    @Autowired
    private ConfigRepository configRepo;

    @PrePersist
    public void companyPrePersist(Company company) {
        Config companySeq;
        var optCompanySeqConfig = configRepo.findById(ConfigId.COMPANY_SEQUENCE);
        if(optCompanySeqConfig.isEmpty()) {
            companySeq = new Config(ConfigId.COMPANY_SEQUENCE, nextVal(""));
        } else {
            companySeq = optCompanySeqConfig.get();
        }

        final var curSeq = companySeq.getValue();
        companySeq.setValue(nextVal(companySeq.getValue()));
        configRepo.save(companySeq);
        company.setCode(curSeq);
    }

    private String nextVal(String companySeq) {
        if(companySeq.isBlank())
            return "A" + START_INCREMENT;

        var matcher = Pattern.compile("([a-zA-Z]+)([0-9]+)").matcher(companySeq);

        if(!matcher.find())
            throw new BusinessException(ErrorCode.SYS_GET_COMPANY_SEQUENCE_FAILED, "Company sequence has wrong format.");

        var alphaPart = matcher.group(1).toUpperCase();
        var numPart = Integer.parseInt(matcher.group(2));

        if(numPart < MAX_INCREMENT) {
            return alphaPart + String.format("%0" + MAX_INCREMENT.toString().length() + "d",++numPart);
        } else {
            return increment(alphaPart) + START_INCREMENT;
        }
    }

    private String increment(String str) {
        if(str.length() == 0)
            return "A";
        var chars = str.toCharArray();
        var lastChar = chars[chars.length - 1];
        if(lastChar < 'Z') {
            chars[chars.length - 1] = ++lastChar;
            return new String(chars);
        } else {
            return increment(str.substring(0, str.length() - 1)) + 'A';
        }
    }
}
