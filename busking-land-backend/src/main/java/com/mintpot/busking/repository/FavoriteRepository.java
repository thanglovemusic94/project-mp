package com.mintpot.busking.repository;

import com.mintpot.busking.model.Favorite;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface FavoriteRepository extends JpaRepository<Favorite, Integer> {
}
