package com.mintpot.pii.repository;

import com.mintpot.pii.entity.UserCard;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserCardRepository extends CrudRepository<UserCard, Long> {

    List<UserCard> findByUserId(long userId);
}
