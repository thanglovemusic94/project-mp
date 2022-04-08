package com.mintpot.readingm.backend.dto.admin;

import com.mintpot.readingm.backend.user.Role;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class NoticeListView {

    private long id;

    private String title;

    private Role role;

    private Date createdOn;

}