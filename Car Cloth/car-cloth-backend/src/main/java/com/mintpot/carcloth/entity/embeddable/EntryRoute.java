package com.mintpot.carcloth.entity.embeddable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EntryRoute implements Serializable {
    @Column(columnDefinition = "tinyint(1) default 0")
    private boolean search;

    @Column(columnDefinition = "tinyint(1) default 0")
    private boolean recommendedByFriend;

    @Column(columnDefinition = "tinyint(1) default 0")
    private boolean advertisement;
}
