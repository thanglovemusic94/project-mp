package com.mintpot.busking.repository;

import com.mintpot.busking.model.Restaurant;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface RestaurantRepository extends JpaRepository<Restaurant, Integer> {

    @Query("from Restaurant r where r.buskingLand.id = :landId")
    Slice<Restaurant> findRestaurantByBuskingLand (int landId);

    @Query("delete from Restaurant r where r.buskingLand.id = :landId")
    void removeRestaurantByBuskingLand (int landId);

}
