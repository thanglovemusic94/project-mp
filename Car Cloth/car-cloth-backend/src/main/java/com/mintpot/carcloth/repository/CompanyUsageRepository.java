//package com.mintpot.carcloth.repository;
//
//import com.mintpot.carcloth.entity.Company;
//import com.mintpot.carcloth.entity.CompanyUsage;
//import org.springframework.data.jpa.repository.JpaRepository;
//
//import java.util.Optional;
//
//public interface CompanyUsageRepository extends JpaRepository<CompanyUsage, Long> {
//    Optional<CompanyUsage> findByCompany(Company company);
//}