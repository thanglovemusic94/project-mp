package com.mintpot.busking.repository;

import com.mintpot.busking.model.SNSInfo;
import com.mintpot.busking.model.User;
import com.mintpot.busking.model.constant.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SNSInfoRepository extends JpaRepository<SNSInfo, Integer> {

    @Query("select sns from SNSInfo sns where sns.user.id = :userId")
    Optional<SNSInfo> getSNSInfoByUser(int userId);

}
