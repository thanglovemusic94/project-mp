package com.mintpot.readingm.backend.entity.user;

import com.mintpot.readingm.backend.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.Set;

@Entity
@Table(name = "user_parent")
@Getter
@Setter
@NoArgsConstructor
@SuperBuilder
public class Parent extends User {

    @OneToMany(mappedBy = "parent", fetch = FetchType.LAZY)
    private Set<Student> children;
}
