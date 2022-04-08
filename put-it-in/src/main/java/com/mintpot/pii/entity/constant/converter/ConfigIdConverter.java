package com.mintpot.pii.entity.constant.converter;

import com.mintpot.pii.entity.constant.ConfigId;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class ConfigIdConverter implements AttributeConverter<ConfigId, String> {

	@Override
	public String convertToDatabaseColumn(ConfigId configId) {
		if (configId == null)
			return null;
		return configId.toString();
	}

	@Override
	public ConfigId convertToEntityAttribute(String key) {
		if (key == null)
			return null;

		return ConfigId.valueOf(key);
	}

}
