package com.mintpot.pii.dto;

import com.mintpot.pii.entity.Product;
import lombok.Getter;
import lombok.Setter;

/* @author linhnc@mintpot.vn */
@Getter
@Setter
public class ProductRpDto {

    private long id;
    private String brandName;
    private String branchName;
    private String code;
    private String name;
//    private StorageSize size;
    private long price;
//    private long deposit;
//    private List<PeriodDiscount> periodDiscounts;
    private int quantity;
//    private int purchaseLimit;
//    private int availDays;
//    private int minUsage;
    private String mainPhotoUrl;
//    private List<String> subPhotoUrls;
//    private Branch branch;

    public ProductRpDto(Product entity) {
        
        id = entity.getId();
        brandName = entity.getBranch().getCompany().getBrandName();
        branchName = entity.getBranch().getName();
        code = entity.getCode();
        name = entity.getName();
//        size = entity.getSize();
        price = entity.getPrice();
//        deposit = entity.getDeposit();
//        periodDiscounts = entity.getPeriodDiscounts();
        quantity = entity.getQuantity();
//        purchaseLimit = entity.getPurchaseLimit();
//        availDays = entity.getAvailDays();
//        minUsage = entity.getMinUsage();
        mainPhotoUrl = entity.getMainPhotoUrl();
//        subPhotoUrls = entity.getSubPhotoUrls();
//        branch = entity.getBranch();
    }
}
