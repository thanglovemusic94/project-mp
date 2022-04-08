package com.mintpot.pii.repository.projection;

import com.mintpot.pii.entity.Product;

import java.util.Set;

public interface HomeSearchPrj {

    String getName();
    String getAddressSimple();
    //int getReviewsNo();
    //float getAvgRating();
    /*Set<ProductPrj> getProducts();*/

    /*interface ProductPrj {
        String getName();
        long getPrice();
        SizePrj getSize();

        interface SizePrj {
            float getWidth();
            float getHeight();
            float getDepth();
        }
    }*/
}
