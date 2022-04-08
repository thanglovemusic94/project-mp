package com.mintpot.pii.entity.id;

import lombok.*;

import javax.persistence.Embeddable;
import javax.persistence.GeneratedValue;
import javax.persistence.IdClass;
import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class BranchId implements Serializable {

    private String companyId;

    @GeneratedValue
    private int branchId;
}
