package com.mintpot.pii.repository.projection;

import java.util.List;

public interface ProductDetailPrj {

    long getId();
    String getName();
    long getPrice();
    List<String> getSubPhotoUrls();

    BranchPrj getBranch();

    interface BranchPrj {
        long getId();
        String getName();
        String getAddressSimple();
        String getPhone();
    }
}
