package com.mintpot.busking.repository;

import com.mintpot.busking.constant.UserStatus;
import com.mintpot.busking.dto.UserDto;
import com.mintpot.busking.model.User;
import com.mintpot.busking.model.constant.AdminStatus;
import com.mintpot.busking.model.constant.SNSType;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.mintpot.busking.model.constant.Status;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Integer> {


    @Query("select u from User u where u.status = " + Status.Constant.ACTIVATED_VALUE + " and u.phone = :phone and u.snsInfo.type = :snsType")
    Optional<User> findUserByPhone(String phone, SNSType snsType);

    @Query("select u from User u where u.status = " + Status.Constant.ACTIVATED_VALUE + " and u.phone = :phone and u.email = :email and u.snsInfo.type = :snsType")
    Optional<User> findUserByEmailAndPhone (String email, String phone, SNSType snsType);


    @Query("select u from User u where u.status = " + Status.Constant.ACTIVATED_VALUE +" and u.email = :email and u.password = :password")
    Optional<User> getUserByEmailAndPassword (String email, String password);

	@Query("select u from User u where u.status = " + Status.Constant.ACTIVATED_VALUE +"")
	List<User> getAllActivated();

    @Query("select u from User u where u.status = " + Status.Constant.ACTIVATED_VALUE +"")
    @EntityGraph(attributePaths = {"favorites"}, type = EntityGraph.EntityGraphType.LOAD)
    Page<User> findAll(Pageable pageable);

    @Query("select u from User u join SNSInfo sns on u.id = sns.user.id where u.status = " + Status.Constant.ACTIVATED_VALUE +" and u.name like %:name% or u.email like %:email% or sns.type = :snsType")
    Page<User> search(Pageable pageable, @Param("name") String name, @Param("email") String email, @Param("snsType") SNSType snsType);

    @Query("select u.id from User u left join u.snsInfo sns where u.status = " + UserStatus.Constant.ACTIVATED_VALUE
            + " and sns.snsId = :snsId and sns.type= :snsType")
    Optional<Integer> getUserIdBySnsIdAndSnsType(@Param("snsId") String snsId, @Param("snsType") SNSType snsType);

    @Query("select u.id from RefreshToken rt left join rt.user u where rt.refreshToken = :refreshToken and u.status " +
            "=" + UserStatus.Constant.ACTIVATED_VALUE )
    Optional<Integer> getUserIdByRefreshToken(@Param("refreshToken") String refreshToken);


    @Query("select case when count(u) > 0 then true else false end from User u where u.status = " + Status.Constant.ACTIVATED_VALUE)
    boolean existsByIdAndStatus(int id, UserStatus status);

    @Query("select case when count(u) > 0 then true else false end from User u where u.phone = :phone and u.status = " + Status.Constant.ACTIVATED_VALUE)
    boolean existsByPhone(String phone);

    @Query("select case when count(u) > 0 then true else false end from User u left join SNSInfo sns on sns.user.id = u.id where u.email = :email and sns.type = :snsType and u.status = " + Status.Constant.ACTIVATED_VALUE)
    boolean existsByEmail(String email, SNSType snsType);

    @Query("select case when count(u) > 0 then true else false end from User u where u.email = :email and u.status = " + Status.Constant.ACTIVATED_VALUE)
    boolean existsByEmail(String email);

    @Query("select case when count(u) > 0 then true else false end from User u left join SNSInfo sns on sns.user.id = u.id where u.email = :email and u.id <> :userId and sns.type = :snsType and u.status = " + Status.Constant.ACTIVATED_VALUE)
    boolean existsByEmailAndUser(String email, SNSType snsType, int userId);

    @Query("select case when count(u) > 0 then true else false end from User u where u.phone = :phone and u.id <> :userId and u.status = " + Status.Constant.ACTIVATED_VALUE)
    boolean existsByPhoneAndUser(String phone, int userId);

    @Query("select u from User u where u.status = " + Status.Constant.ACTIVATED_VALUE +" and u.id = :id")
    @EntityGraph(attributePaths = {"favorites", "snsInfo"}, type = EntityGraph.EntityGraphType.FETCH)
    Optional<User> getUserWithFavorite (int id);


    @Modifying
    @Query("update User u set u.name= :name where u.id = :id ")
    void updateUserName( @Param("id") int id, @Param("name") String name);

    @Query("select u from User u join AdminInfo ad on u.id=ad.user.id where u.name = :name and u.status = "+ Status.Constant.ACTIVATED_VALUE +" and ad.status=" + AdminStatus.Constant.ACTIVATED_VALUE)
    @EntityGraph(attributePaths = {"favorites", "snsInfo"}, type = EntityGraph.EntityGraphType.FETCH)
    Optional<User> findByName(String name);

    @Query("select u from User u where u.name = :name")
    @EntityGraph(attributePaths = {"favorites", "snsInfo"}, type = EntityGraph.EntityGraphType.FETCH)
    Optional<User> findByNameActive(String name);

    @Query("select count (u.id) from User u where u.status= " + UserStatus.Constant.ACTIVATED_VALUE + " and u.favorites.size > 0 ")
    long totalUserActive();

    @Query("select u from User u where (:keyword is null or u.name like %:keyword%) " +
            "and (u.status = " + UserStatus.Constant.ACTIVATED_VALUE +") " +
            "and u.favorites.size > 0 " +
            "order by u.createdOn desc ")
    @EntityGraph(attributePaths = {"favorites", "snsInfo"}, type = EntityGraph.EntityGraphType.FETCH)
    Page<User> findAllBySearch(Pageable pageable, @Param("keyword") String keyword);

    @Query("select u from User u where u.status = " + UserStatus.Constant.ACTIVATED_VALUE +" and u.id = :id")
    @EntityGraph(attributePaths = {"favorites", "snsInfo"}, type = EntityGraph.EntityGraphType.FETCH)
    Optional<User> findById(Integer id);
    
}
