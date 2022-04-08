package com.mintpot.carcloth.dto.converters;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import com.mintpot.carcloth.constant.enums.EEntryRouter;
import com.mintpot.carcloth.entity.embeddable.EntryRoute;
import org.springframework.web.context.support.SpringBeanAutowiringSupport;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class EntryRouteSerializer extends StdSerializer<EntryRoute> {

    public EntryRouteSerializer() {
        this(null);
        SpringBeanAutowiringSupport.processInjectionBasedOnCurrentContext(this);
    }

    public EntryRouteSerializer(Class<EntryRoute> t) {
        super(t);
    }

    @Override
    public void serialize(EntryRoute entryRoute, JsonGenerator jsonGenerator,
                          SerializerProvider serializerProvider) throws IOException {
        List<String> str = new ArrayList<>();

        if(entryRoute.isAdvertisement()) {
            str.add(EEntryRouter.ADVERTISEMENT.getDisplayValue());
        }

        if(entryRoute.isSearch()) {
            str.add(EEntryRouter.SEARCH.getDisplayValue());
        }

        if(entryRoute.isRecommendedByFriend()) {
            str.add(EEntryRouter.RECOMMENDED_BY_FRIEND.getDisplayValue());
        }

        jsonGenerator.writeObject(String.join(", ", str));
    }
}
