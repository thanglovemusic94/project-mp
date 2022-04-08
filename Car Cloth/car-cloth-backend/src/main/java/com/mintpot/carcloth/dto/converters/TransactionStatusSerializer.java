package com.mintpot.carcloth.dto.converters;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import com.mintpot.carcloth.constant.TransactionStatus;
import com.mintpot.carcloth.constant.enums.EConstructionStatus;
import org.springframework.web.context.support.SpringBeanAutowiringSupport;

import java.io.IOException;

public class TransactionStatusSerializer extends StdSerializer<Integer> {

    public TransactionStatusSerializer() {
        this(null);
        SpringBeanAutowiringSupport.processInjectionBasedOnCurrentContext(this);
    }

    public TransactionStatusSerializer(Class<Integer> t) {
        super(t);
    }

    @Override
    public void serialize(Integer code, JsonGenerator jsonGenerator,
                          SerializerProvider serializerProvider) throws IOException {

        if(code == null) return;

        EConstructionStatus status = null;

        if(code == TransactionStatus.Constant.COMPARE) {
            status = EConstructionStatus.COMPARE;
        } else if(TransactionStatus.Constant.COMPARE < code &&
                code < TransactionStatus.Constant.CONSTRUCTING) {
            status = EConstructionStatus.RESERVATION;
        } else if(code == TransactionStatus.Constant.CONSTRUCTING) {
            status = EConstructionStatus.CONSTRUCTING;
        } else if(code == TransactionStatus.Constant.COMPLETE) {
            status = EConstructionStatus.COMPLETE;
        }

        jsonGenerator.writeObject(status);
    }
}
