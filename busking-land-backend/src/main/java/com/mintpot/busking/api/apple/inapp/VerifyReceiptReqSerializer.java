package com.mintpot.busking.api.apple.inapp;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

import java.io.IOException;

public class VerifyReceiptReqSerializer extends StdSerializer<VerifyReceiptReq> {

    public VerifyReceiptReqSerializer() {
        super(VerifyReceiptReq.class);
    }

    @Override
    public void serialize(VerifyReceiptReq obj, JsonGenerator jsonGenerator, SerializerProvider serializer) throws IOException {
       jsonGenerator.writeStartObject();
       jsonGenerator.writeStringField("receipt-data", obj.getReceiptData());
       jsonGenerator.writeEndObject();
    }

}
