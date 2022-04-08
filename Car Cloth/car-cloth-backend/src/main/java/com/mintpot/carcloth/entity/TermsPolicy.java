package com.mintpot.carcloth.entity;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TermsPolicy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Lob
    @NotBlank
    private String servicePolicy;

    @Lob
    @NotBlank
    private String privacyStatement;

    @Lob
    @NotBlank
    private String refundPolicy;

    @UpdateTimestamp
    private LocalDateTime updatedOn;

    @Column(updatable = false)
    @CreationTimestamp
    private LocalDateTime createdOn;
}
