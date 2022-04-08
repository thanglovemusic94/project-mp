package com.mintpot.readingm.backend.dto.admin;

import com.mintpot.readingm.backend.user.Role;

public interface UserRoleView extends UserNameView {

    Role getRole();
}
