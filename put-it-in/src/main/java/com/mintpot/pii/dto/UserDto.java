package com.mintpot.pii.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mintpot.pii.entity.Bookmark;
import com.mintpot.pii.entity.BranchReview;
import com.mintpot.pii.entity.Inquiry;
import com.mintpot.pii.entity.UserCard;
import com.mintpot.pii.entity.constant.UserStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Setter
@Getter
public class UserDto {

    private String email;
    private String password;
    private String name;
    private String ssn;
    private String phone;
    private UserStatus status = UserStatus.ACTIVATED;

}
