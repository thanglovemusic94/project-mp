package com.mintpot.busking.repository;

import com.mintpot.busking.model.FcmToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FCMTokenRepository extends JpaRepository<FcmToken, Integer> {

    @Query("select ft from FcmToken ft where ft.user.id in :listUserIds")
    List<FcmToken> findByListIds(@Param("listUserIds") List<Integer> listUserIds);

    @Query("from FcmToken ft where ft.user.id = :userId")
    FcmToken findByUserId (Integer userId);
}
