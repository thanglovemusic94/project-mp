package com.mintpot.pii.service.impl;

import com.mintpot.pii.dto.ProductTwoDto;
import com.mintpot.pii.entity.Branch;
import com.mintpot.pii.repository.BranchRepository;
import com.mintpot.pii.service.HomeService;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.extern.log4j.Log4j2;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Service;

/* @author LinhNC */
@Log4j2
@Service
public class HomeServiceImpl implements HomeService{
    @Autowired
    private BranchRepository branchRepo;
    @Autowired
    private GeometryFactory geoFac;
    @Override
    public Slice<Branch> searchOrderByPrice(String term, boolean ascending, Pageable cPage) {
        String sortDir = "asc";
        if (!ascending){
            sortDir = "desc";
        }
        //0. search branch Id by term and SORTED! AND select two product of branch
        Slice<BigInteger> branchIds = branchRepo.getIdSearchTermOrderByPrice(term,sortDir, cPage); // no have dynamic sorting by param in jpa Native ??
        List<Long> branchIdLong = branchIds.stream().map(big->big.longValue()).collect(Collectors.toList()) ;
        log.info(">> key_search:"+term+"; Size of search:"+branchIdLong.size());
        //1. select all properties of Branch by id
        List<Branch> data = branchRepo.findAllByIdInOrder(branchIdLong);//  
        
        //2.fill list Product to Branch
        branchRepo.createViewProductPrice(branchIdLong);
        List<ProductTwoDto> products = branchRepo.listTwoProductByBranchId(sortDir);

        Map<Long,Branch> mP = data.stream().collect(Collectors.toMap(pk->pk.getId(), pv->pv));
        
        log.info(">>>>>>>>> sort direction:" + sortDir);
        products.forEach(p->{
            Branch b = mP.get(p.getBranchId());
            if ( b.getProductTwo() == null) b.setProductTwo(new ArrayList<>());
            b.getProductTwo().add(p);
            log.info(">>>>>>>> product: branchId:"+p.getBranchId() +" product_id:"+p.getId()+ "; price:"+p.getPrice());
        });
        Slice<Branch> res = new SliceImpl<>(data, branchIds.getPageable(),branchIds.hasNext());
        //            res = new SliceImpl<>(data, page, data.size()>page.getOffset()*page.getPageNumber());
        return res;
    }

    @Override
    public Slice<Branch> searchOrderByDistance(String loc, String term, boolean ascending, PageRequest nPage) {
        String sortDir = "asc";
        if (!ascending){
            sortDir = "desc";
        }
        var latitude = Double.parseDouble(loc.split(",")[0].trim());
        var longitude = Double.parseDouble(loc.split(",")[1].trim());
        Point location = geoFac.createPoint(new Coordinate(latitude, longitude));

        var branchIds = branchRepo.getIdBySearchTermOrderByDistance(term, location, nPage);
        var data = branchRepo.findAllByIdInOrderByDistance(branchIds.getContent(), location);
        //2.fill list Product to Branch
        branchRepo.createViewProductPrice(branchIds.getContent());
        List<ProductTwoDto> products = branchRepo.listTwoProductByBranchId(sortDir);

        Map<Long,Branch> mP = data.stream().collect(Collectors.toMap(pk->pk.getId(), pv->pv));

        log.info(">>>>>>>>> sort direction:" + sortDir);
        products.forEach(p->{
            Branch b = mP.get(p.getBranchId());
            if ( b.getProductTwo() == null) b.setProductTwo(new ArrayList<>());
            b.getProductTwo().add(p);
            log.info(">>>>>>>> product: branchId:"+p.getBranchId() +" product_id:"+p.getId()+ "; price:"+p.getPrice());
        });
        Slice<Branch> res = new SliceImpl<>(data, branchIds.getPageable(), branchIds.hasNext());
        return res;
    }

}
