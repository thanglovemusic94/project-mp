package com.mintpot.readingm.backend.service.user;

import com.mintpot.readingm.backend.entity.clazz.Class;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserService {

    Page<Class> getClassByUserId(long userId, String classType, Pageable page);
}
