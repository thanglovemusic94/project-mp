package com.mintpot.busking.repository;

import com.mintpot.busking.model.FAQ;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FaqRepository extends JpaRepository<FAQ, Integer> {

    @Query("SELECT f FROM FAQ f ORDER BY f.createdOn DESC ")
    List<FAQ> getAllActivated();

}
