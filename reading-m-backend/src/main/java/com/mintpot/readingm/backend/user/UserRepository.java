package com.mintpot.readingm.backend.user;

import com.mintpot.readingm.backend.repository.ExtendedRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends ExtendedRepository<User, Long>, JpaRepository<User, Long>, JpaSpecificationExecutor<User> {

    Optional<User> findByEmailAndStatus(String email, UserStatus status);

    @Query("select u from User u where u.email = :email and (:role is null or u.role = :role) and u.status = " +
            UserStatus.Constant.ACTIVATED_VALUE
    )
    Optional<User> findByEmailAndRole(String email, Role role);

    @Query(value = "select u from User u left join Student std on u.id = std.id" +
            " where u.status = " + UserStatus.Constant.ACTIVATED_VALUE +
            " and u.role <> com.mintpot.readingm.backend.user.Role.ADMIN" +
            " and (:signupFrom is null or u.createdOn >= :signupFrom) and (" +
            ":signupTo is null or u.createdOn <= :signupTo) and (" +
            ":term is null or u.memberId like %:term% or u.name like %:term% or " +
            "u.phone like %:term% or u.email like %:term% or str(std.grade) like %:term%)")
    Page<User> getMemberList(Date signupFrom, Date signupTo, String term, Pageable page);

    boolean existsByEmail(String email);

    boolean existsByPhone(String phone);

    boolean existsByMemberId(String memberId);

    Optional<User> findByNameAndPhone(String name, String phone);

    @Query("update User u set u.password = :newPassword where u.phone = :phone")
    @Modifying
    @Transactional
    void updatePasswordByPhone(String phone, String newPassword);

    @Query("update User u set u.password = :newPassword where u.email = :email")
    @Modifying
    @Transactional
    void updatePasswordByEmail(String email, String newPassword);

    @Query("update User u set u.phone = :phone where u.id = :id")
    @Modifying
    @Transactional
    void updatePhoneById(long id, String phone);

    Optional<User> findByMemberIdAndNameAndPhone(String memberId, String name, String phone);

    <T> List<T> findByRole(Role role, Class<T> type);

    <T> Page<T> findByRole(Role role, Pageable page, Class<T> type);

    @Query("select u from User u where u.status = " + UserStatus.Constant.ACTIVATED_VALUE +
            " and (:role is null or u.role = :role)" +
            " and (:term is null or (u.name like %:term% or u.phone like %:term% " +
            "                     or u.email like %:term% or u.memberId like %:term%))")
    <T> Page<T> findByRoleAndQuery(Role role, String term, Pageable page, Class<T> type);
}
