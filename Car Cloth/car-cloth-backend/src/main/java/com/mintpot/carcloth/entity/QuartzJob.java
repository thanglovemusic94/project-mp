package com.mintpot.carcloth.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class QuartzJob {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne
    @JoinColumn(name = "company_id", foreignKey = @ForeignKey(name = "FK_quartz_job_company"), nullable = false)
    private Company company;

    @CreationTimestamp
    private LocalDateTime createdOn;

    public QuartzJob(Company company) {
        this.company = company;
    }
}
