package com.mintpot.readingm.backend.repository;

import com.mintpot.readingm.backend.entity.MstConfig;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.Optional;

public interface MstConfigRepository extends JpaRepository<MstConfig, Long> {

    Optional<MstConfig> findByConfigKey(String configKey);

    @Query("update MstConfig m set m.configValue = :value where m.configKey = :key")
    @Modifying
    @Transactional
    void updateValueByKey(String key, String value);

}
