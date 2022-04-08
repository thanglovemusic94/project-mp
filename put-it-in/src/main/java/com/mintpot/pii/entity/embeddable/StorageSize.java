package com.mintpot.pii.entity.embeddable;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Embeddable;

@Embeddable
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
public class StorageSize {

    private float width;

    private float height;

    private float depth;

    public StorageSize(float width, float height, float depth) {
        this.width = width;
        this.height = height;
        this.depth = depth;
    }
}
