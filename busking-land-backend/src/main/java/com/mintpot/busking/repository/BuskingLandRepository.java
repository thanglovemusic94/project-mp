package com.mintpot.busking.repository;

import com.mintpot.busking.dto.api.BuskingLandInfoDto;
import com.mintpot.busking.dto.api.BuskingLandNearByDto;
import com.mintpot.busking.model.BuskingLand;
import com.mintpot.busking.model.City;
import com.mintpot.busking.model.Province;
import com.mintpot.busking.model.constant.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BuskingLandRepository extends JpaRepository<BuskingLand, Integer>{

    @Query("select new com.mintpot.busking.dto.api.BuskingLandInfoDto(bl.id, bl.name, bl.address, bl.lat, bl.lng, bl.city.cityId, bl.video) from BuskingLand bl where bl.city.cityId = :cityId and bl.status = com.mintpot.busking.model.constant.Status.ACTIVATED")
    Slice<com.mintpot.busking.dto.api.BuskingLandInfoDto> getBuskingLandsByCity (int cityId);

    String distanceInKm = "(((acos(sin(( :latitude *pi()/180)) * sin((bl.lat*pi()/180))+cos(( :latitude *pi()/180)) * cos((bl.lat*pi()/180)) * cos((( :longitude- bl.lng)*pi()/180))))*180/pi())*60*1.1515*1.609344) as distance";

    String selectInfo = "select bl.id, bl.lat, bl.lng, bl.name, bl.video ";

    @Query(nativeQuery = true, value = selectInfo + ", " + distanceInKm +
            " from busking_land bl" +
            " where bl.status = " + Status.Constant.ACTIVATED_VALUE +
            " having distance <= 10")
    List<BuskingLandNearByDto> findBuskingLandInNearBy(Double latitude, Double longitude);

    @Query("from BuskingLand bl where bl.name like %:keySearch% and bl.status= " + Status.Constant.ACTIVATED_VALUE + " and bl.city.status = " + Status.Constant.ACTIVATED_VALUE)
    @EntityGraph(attributePaths = {"restaurants", "city"}, type = EntityGraph.EntityGraphType.FETCH)
    Page<BuskingLand> findAll(Pageable pageable, String keySearch);

    @Query("from BuskingLand bl where bl.name like %:keySearch% and bl.status = com.mintpot.busking.model.constant.Status.ACTIVATED")
    List<BuskingLand> searchLand (String keySearch);

    @EntityGraph(attributePaths = {"restaurants", "city"}, type = EntityGraph.EntityGraphType.FETCH)
    Optional<BuskingLand> findById(Integer integer);

    @Modifying
    @Query("update BuskingLand bl set bl.status = com.mintpot.busking.model.constant.Status.DEACTIVATED")
    void deActiveAllBuskingLand ();

    @Query("select case when count(bl) > 0 then true else false end from BuskingLand bl where bl.name = :name")
    boolean existsByName (String name);

    @Query("from BuskingLand bl where bl.name = :landName")
    List<BuskingLand> searchLandByName (String landName);

    @Query("from BuskingLand bl where bl.name like %:name% and bl.status = com.mintpot.busking.model.constant.Status.ACTIVATED")
    Optional<BuskingLand> findByName(String name);

    Optional<BuskingLand> findByAddress(String address);

    @Query("select bl.name from BuskingLand bl")
    List<String> findAllName();

    @Query("select bl.name from BuskingLand bl")
    List<String> findAllAddress();

}
