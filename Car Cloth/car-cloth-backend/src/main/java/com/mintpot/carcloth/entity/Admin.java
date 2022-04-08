package com.mintpot.carcloth.entity;


import com.mintpot.carcloth.constant.Role;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue(value = Role.Constant.ADMIN)
@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
public class Admin extends User {

    private String encodePwd;
}