package com.mintpot.readingm.backend.dto.clazz;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClassSelectionView {
    private long id;

    private String type;

    private String name;

    private boolean disable;
}
