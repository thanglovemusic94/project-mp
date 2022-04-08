package com.mintpot.carcloth.dto.converters;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import com.mintpot.carcloth.constant.enums.EConstructionType;
import com.mintpot.carcloth.entity.embeddable.ConstructableType;
import org.springframework.web.context.support.SpringBeanAutowiringSupport;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class ConstructableTypeSerializer extends StdSerializer<ConstructableType> {

    public ConstructableTypeSerializer() {
        this(null);
        SpringBeanAutowiringSupport.processInjectionBasedOnCurrentContext(this);
    }

    public ConstructableTypeSerializer(Class<ConstructableType> t) {
        super(t);
    }

    @Override
    public void serialize(ConstructableType constructableType, JsonGenerator jsonGenerator,
                          SerializerProvider serializerProvider) throws IOException {
        List<String> types = new ArrayList<>();

        if(constructableType.isPpf()) {
            types.add(EConstructionType.PPF.getDisplayValue());
        }

        if(constructableType.isBlackBox()) {
            types.add(EConstructionType.BLACK_BOX.getDisplayValue());
        }

        if(constructableType.isGlassFilm()) {
            types.add(EConstructionType.GLASS_FILM.getDisplayValue());
        }

        if(constructableType.isNewCarPackage()) {
            types.add(EConstructionType.NEW_CAR_PACKAGE.getDisplayValue());
        }

        if(constructableType.isPolish()) {
            types.add(EConstructionType.POLISH.getDisplayValue());
        }

        if(constructableType.isWrapping()) {
            types.add(EConstructionType.WRAPPING.getDisplayValue());
        }

        if(constructableType.isTinting()) {
            types.add(EConstructionType.TINTING.getDisplayValue());
        }

        if(constructableType.isWindShield()) {
            types.add(EConstructionType.WINDSHIELD.getDisplayValue());
        }

        jsonGenerator.writeObject(String.join(", ", types));
    }
}
