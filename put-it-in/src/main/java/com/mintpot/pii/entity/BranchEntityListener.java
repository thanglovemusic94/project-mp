package com.mintpot.pii.entity;
import org.hibernate.annotations.Where;
import org.hibernate.annotations.SQLDelete;

import com.mintpot.pii.repository.SeqBranchCodeRepository;
import com.mintpot.pii.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.persistence.PostLoad;
import javax.persistence.PrePersist;
import lombok.extern.log4j.Log4j2;
@Log4j2
@Component
@SQLDelete(sql="UPDATE branch_entity_listener SET crud_status = 1 WHERE id = ?")
@Where(clause = "crud_status = 0")
public class BranchEntityListener extends EntityBase { 

    @Autowired
    private ImageService imageService;

    @Autowired
    private SeqBranchCodeRepository seqBCRepo;

    @PostLoad
    public void branchPostLoad(Branch branch) {
        if(branch.getSubPhotoUrls() != null) {
            branch.setSubPhotoUrls(imageService.generateAbsolutePhotoUrls(branch.getSubPhotoUrls()));
        }

        branch.setMainPhotoUrl(imageService.generateAbsolutePhotoUrl(branch.getMainPhotoUrl()));
    }

    @PrePersist
    public void branchPrePersist(Branch branch) {
        /*int numImg =0;
        if (branch.getCode()!= null) return; //linhnc skip reGenerate code for update*/
        var optBranchSeq = seqBCRepo.findById(branch.getCompany().getId());
        var seq = optBranchSeq.orElseGet(() -> new SeqBranchCode(branch.getCompany().getId()));
        branch.setCode(String.format("%03d", seq.getNextSeq()));
        
        seq.setNextSeq(seq.getNextSeq() + 1);
        seqBCRepo.save(seq);
    }
}
