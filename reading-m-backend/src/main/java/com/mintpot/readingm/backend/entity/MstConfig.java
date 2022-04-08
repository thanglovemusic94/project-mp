package com.mintpot.readingm.backend.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "mst_config")
@NoArgsConstructor
@Getter
@Setter
public class MstConfig {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(unique = true, nullable = false)
    private String configKey;

    @Column(nullable = false)
    private String configValue;

    private String description;

    public MstConfig(String configKey, String configValue) {
        this.configKey = configKey;
        this.configValue = configValue;
    }

    @Builder
    public MstConfig(String configKey, String configValue, String description) {
        this.configKey = configKey;
        this.configValue = configValue;
        this.description = description;
    }
}
