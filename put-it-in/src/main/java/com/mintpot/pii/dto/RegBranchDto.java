package com.mintpot.pii.dto;

import com.mintpot.pii.entity.Branch;
import com.mintpot.pii.entity.Company;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class RegBranchDto {

    private long companyId;
    private String branchName;
    private String addressSimple;
    private String addressDetailed;
    private float latitude;
    private float longitude;
    private String phone;
    private String refundPolicy;
    private Set<String> keywords;
    private String mainPhotoUrl;
    private int imageCount; // number of photo will upload to s3
    // business Detail
    private String announcement;
    private String businessInfo; // contail 4 field FIXED: , slplit by End Of Line character ('\n' or <br/>);
    
//    private List<String> subPhotoUrls;
    public Branch toEntity(){
//        Branch b = new Branch();
//        BeanUtils.copyProperties(this, b, "keywords","companyId");
//        
        Branch b = new Branch();
        b.setCompany(new Company(companyId));
        b.setName(branchName);
        b.setAddressSimple(addressSimple);
        b.setAddressDetailed(addressDetailed);
        b.setPhone(phone);
        b.setRefundPolicy(refundPolicy);
//        b.setKeywords(keywords.stream().map(key->new Keyword(key)).collect(Collectors.toSet()));
        b.setAnnouncement(announcement);
        b.setBusinessInfo(businessInfo);
        return b;
    }
}
