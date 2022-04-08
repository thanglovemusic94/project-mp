package com.mintpot.pii.dto.request;

import java.util.Set;
import lombok.Getter;
import lombok.Setter;

/**
 *
 * @author linhnc@mintpot.vn
 */
@Getter @Setter
public class UpdBranchDto {
    private Long branchId;          // id for update
    private long companyId;         // can change other company
//    private String branchName;
    private String addressSimple;
    private String addressDetailed;
    private float latitude;
    private float longitude;
    private String phone;
    private String refundPolicy;
    private Set<String> keywords;
    private String mainPhotoUrl;
    //>>> sub string url??? append? overwrite???
    private int imageCount; // number of photo will upload to s3
    // business Detail
    private String announcement;
    private String businessInfo; // contail 4 field FIXED: , slplit by End Of Line character ('\n' or <br/>);
}
