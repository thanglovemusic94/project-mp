package com.mintpot.readingm.backend.service.user;

import com.mintpot.readingm.backend.entity.clazz.Class;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service("studentService")
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService {

    @Override
    public Page<Class> getClassByUserId(long studentId, String classType, Pageable page) {

        return null;
    }
}
