package com.mintpot.pii.repository;

import com.mintpot.pii.entity.Config;
import com.mintpot.pii.entity.constant.ConfigId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConfigRepository extends JpaRepository<Config, ConfigId> {
}
