package com.mintpot.pii.dto;

import com.mintpot.pii.entity.Product;
import com.mintpot.pii.entity.Branch;
import com.mintpot.pii.entity.embeddable.PeriodDiscount;
import com.mintpot.pii.entity.embeddable.StorageSize;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


/* @author linhnc@mintpot.vn */
@Getter
@Setter
public class ProductDto {

    private Long id;
    private Long branchId;
//    private String code;
    private String name;
    private StorageSizeDto size;
    private Long price;
    private Long deposit;
    private List<PeriodDiscountDto> periodDiscounts;
    private Integer quantity;
    private Integer purchaseLimit;
    private Integer availDays;
    private Integer minUsage;
    private String mainPhotoUrl;
    private List<String> subPhotoUrls;
    private int imageCount;

    public Product toEntity() {
        Product m = new Product();
//        m.setId(id);
//        m.setCode(code);
        m.setName(name);
        m.setSize(size.toEntityEmbeded());
        m.setPrice(price);
        m.setDeposit(deposit);
        m.setPeriodDiscounts(periodDiscounts.stream().map(pdto -> pdto.toEntityEmbeded()).collect(Collectors.toList()));
        m.setQuantity(quantity);
        m.setPurchaseLimit(purchaseLimit);
        m.setAvailDays(availDays);
        m.setMinUsage(minUsage);
        m.setMainPhotoUrl(mainPhotoUrl);
        m.setSubPhotoUrls(subPhotoUrls);
        m.setBranch(new Branch(branchId));
        return m;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class PeriodDiscountDto {

        private int monthAmount;
        private int discountPercentage;

        public PeriodDiscount toEntityEmbeded() {
            return new PeriodDiscount(monthAmount, discountPercentage);
        }
    }
    @Getter
    @Setter
    @NoArgsConstructor
    public static class StorageSizeDto {
        private float width;
        private float height;
        private float depth;
        public StorageSizeDto(float width, float height, float depth) {
            this.width = width;
            this.height = height;
            this.depth = depth;
        }

        public StorageSize toEntityEmbeded() {
            return new StorageSize(width, height, depth);
        }
    }

}
