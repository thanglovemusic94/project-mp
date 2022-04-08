package com.mintpot.readingm.backend.service.user;

import com.mintpot.readingm.backend.user.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserServiceLocator {

    @Qualifier("studentService")
    private final UserService studentService;

    @Qualifier("tutorService")
    private final UserService tutorService;

    public UserService getByRole(Role userRole) {
        switch (userRole) {
            case STUDENT:
                return studentService;
            case TUTOR:
                return tutorService;
            default:
                return null;
        }
    }
}
