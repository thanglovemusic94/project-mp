//package com.mintpot.busking.configs.Mapper;
//
//import com.mintpot.busking.dto.web.request.BuskingRequestDTO;
//import com.mintpot.busking.model.Busking;
//import com.mintpot.busking.model.constant.BuskingStatus;
//import com.mintpot.busking.model.constant.BuskingType;
//import org.modelmapper.PropertyMap;
//
//public class BuskingMapper extends PropertyMap<BuskingRequestDTO, Busking> {
//    @Override
//    protected void configure() {
//
//        skip(source.getLandId(), destination.getBuskingLand());
//        map().setStatus(BuskingStatus.valueOf(source.getStatus()));
//        map().setType(BuskingType.valueOf(source.getType()));
//    }
//}
