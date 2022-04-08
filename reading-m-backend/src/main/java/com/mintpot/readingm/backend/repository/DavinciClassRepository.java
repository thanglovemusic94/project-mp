package com.mintpot.readingm.backend.repository;

import com.mintpot.readingm.backend.dto.admin.DavinciClassOverviewWebView;
import com.mintpot.readingm.backend.dto.admin.DavinciClassView;
import com.mintpot.readingm.backend.dto.admin.DavinciClassWebView;
import com.mintpot.readingm.backend.entity.clazz.DavinciClass;
import com.mintpot.readingm.backend.entity.constant.ClassStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public interface DavinciClassRepository extends ExtendedRepository<DavinciClass, Long> {

    DavinciClassView getById(long id);

    DavinciClassOverviewWebView findWebViewById(long id);

    Page<DavinciClassWebView> getAllByStatusAndDeleteFlg(ClassStatus status,boolean deleteFlg, Pageable page);

    Page<DavinciClass> getAllByDeleteFlg(boolean deleteFlg, Pageable page);

}
