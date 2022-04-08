package com.mintpot.pii.dto.response;

import com.mintpot.pii.entity.Branch;
import lombok.Getter;
import lombok.Setter;

/**
 *
 * @author linhnc@mintpot.vn
 */
@Getter
@Setter
public class BranchAdminRP {
    private long id;
    private String brandName;
    private String code;
    private String name;
    private String phone;
    public BranchAdminRP(Branch branch) {
        this.id = branch.getId();
        this.brandName = branch.getCompany().getBrandName();
        this.code = branch.getCode();
        this.name = branch.getName();
        this.phone = branch.getPhone();
    }
    
}
