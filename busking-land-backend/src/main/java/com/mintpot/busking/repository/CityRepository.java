package com.mintpot.busking.repository;

import com.mintpot.busking.model.City;
import com.mintpot.busking.model.Province;
import com.mintpot.busking.model.constant.Status;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface CityRepository extends CrudRepository<City, Integer> {

    @Query("from City c where c.province.provinceId = :provinceId and c.status = com.mintpot.busking.model.constant.Status.ACTIVATED")
    Slice<City> getCitiesByProvince (int provinceId);

    @Query("from City c where c.cityName like %:keySearch%")
    List<City> searchCity (String keySearch);

    @Query("from City c where c.cityName = :cityName and c.status = com.mintpot.busking.model.constant.Status.ACTIVATED")
    Optional<City> findByName (String cityName);

    @Query("from City c where c.status = " + Status.Constant.ACTIVATED_VALUE)
    List<City> listCity();

}
