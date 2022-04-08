//package com.mintpot.carcloth.entity;
//
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//
//import javax.persistence.*;
//import java.io.Serializable;
//import java.time.LocalDateTime;
//import java.time.temporal.ChronoUnit;
//import java.time.temporal.TemporalUnit;
//
//@Entity
//@Getter
//@Setter
//@NoArgsConstructor
//public class CompanyUsage implements Serializable {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private long id;
//
//    private int points;
//
//    @OneToOne(fetch = FetchType.LAZY)
//    @MapsId
//    @JoinColumn(name = "company_id", foreignKey = @ForeignKey(name = "FK_point_company"), nullable = false)
//    private Company company;
//
//    private boolean autoExtend;
//
//    private LocalDateTime autoExtendTime;
//
//    private LocalDateTime expiredTime;
//
//    public CompanyUsage(Company company) {
//        this.company = company;
//        this.autoExtend = true;
//    }
//}
