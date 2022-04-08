package com.mintpot.pii.entity.id;

import com.mintpot.pii.entity.Config;
import com.mintpot.pii.exception.BusinessException;
import com.mintpot.pii.exception.error.ErrorCode;
import org.hibernate.LockMode;
import org.hibernate.Session;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;
import org.springframework.util.StringUtils;

import java.io.Serializable;
import java.util.regex.Pattern;

public class CompanyIdGenerator implements IdentifierGenerator {

    private final Integer MAX_INCREMENT = 99;
    private final String START_INCREMENT = "01";

    @Override
    public Serializable generate(SharedSessionContractImplementor session, Object obj) {
        var ss = (Session) session;
        Config companySeq = ss.createQuery("select c from Config c where c.id = 'COMPANY_SEQUENCE'", Config.class).uniqueResultOptional()
                .orElseThrow(() -> new BusinessException(ErrorCode.SYS_GET_COMPANY_SEQUENCE_FAILED));
        //ss.lock(companySeq, LockMode.PESSIMISTIC_WRITE);
        final var curSeq = companySeq.getValue();
        companySeq.setValue(nextVal(companySeq.getValue()));
        ss.update(companySeq);

        return curSeq;
    }

    private String nextVal(String companySeq) {
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

