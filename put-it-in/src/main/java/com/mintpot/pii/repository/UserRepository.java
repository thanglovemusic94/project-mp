package com.mintpot.pii.repository;

import com.mintpot.pii.entity.User;
import com.mintpot.pii.entity.constant.UserStatus;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Long> {

    Optional<User> findByEmailAndStatus(String email, UserStatus status);

    Optional<User> findByPhoneAndStatus(String phone, UserStatus status);

    boolean existsByEmail(String email);

    boolean existsByEmailAndNameAndPhoneAndStatus(String email, String name, String phone, UserStatus status);

    @Modifying
    @Query("update User u set u.password = :password where u.email = :email")
    @Transactional
    void updatePasswordByEmail(@Param("email") String email, @Param("password") String password);

}
