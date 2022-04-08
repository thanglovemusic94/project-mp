package com.mintpot.pii.entity;

import com.mintpot.pii.repository.SeqProductCodeRepository;
import com.mintpot.pii.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.persistence.PostLoad;
import javax.persistence.PrePersist;

@Component
public class ProductEntityListener { 

    @Autowired
    private ImageService imageService;

    @Autowired
    private SeqProductCodeRepository sequenceProductCodeRepository;

    @PostLoad
    public void productPostLoad(Product product) {
        if (product.getSubPhotoUrls() != null)
            product.setSubPhotoUrls(imageService.generateAbsolutePhotoUrls(product.getSubPhotoUrls()));
        product.setMainPhotoUrl(imageService.generateAbsolutePhotoUrl(product.getMainPhotoUrl()));
    }

    @PrePersist
    public void productPrePersist(Product product) {
        var optProductSeq = sequenceProductCodeRepository.findById(product.getBranch().getId());
        var seq = optProductSeq.orElseGet(() -> new SeqProductCode(product.getBranch().getId()));

        product.setCode(String.format("%02d", seq.getNextSeq()));
        seq.setNextSeq(seq.getNextSeq() + 1);
        sequenceProductCodeRepository.save(seq);
    }
}
