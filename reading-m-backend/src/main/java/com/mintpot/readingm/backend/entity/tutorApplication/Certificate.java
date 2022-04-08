package com.mintpot.readingm.backend.entity.tutorApplication;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.deser.std.DateDeserializers;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        include = JsonTypeInfo.As.EXISTING_PROPERTY,
        property = "type",
        visible = true)
@JsonSubTypes({
        @JsonSubTypes.Type(value  = License.class, name = "license"),
        @JsonSubTypes.Type(value = Competition.class, name = "competition"),
        @JsonSubTypes.Type(value = LanguageTest.class, name = "languageTest")})
@JsonIgnoreProperties(ignoreUnknown = true)
public abstract class Certificate implements Serializable {
    private static final long serialVersionUID = 1L;
    String type;
    @JsonDeserialize(using = DateDeserializers.DateDeserializer.class)
    Date acquiredOn;
}
