package com.mintpot.carcloth.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class CompanyGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false, unique = true)
    private String name;

    private int fee;

    private int deliveryCost;

    @CreationTimestamp
    private LocalDateTime createdOn;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "group")
    private Set<Member> members;

    public CompanyGroup(String name) {
        this.name = name;
    }
}
