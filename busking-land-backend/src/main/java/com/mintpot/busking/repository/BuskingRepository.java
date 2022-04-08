package com.mintpot.busking.repository;

import com.mintpot.busking.dto.api.BuskerInfoDto;
import com.mintpot.busking.dto.api.BuskingInfoDto;
import com.mintpot.busking.dto.api.BuskingNearByDto;
import com.mintpot.busking.model.Busking;
import com.mintpot.busking.model.PointHistory;
import com.mintpot.busking.model.constant.BuskingStatus;
import com.mintpot.busking.model.constant.BuskingType;
import com.mintpot.busking.model.constant.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.Nullable;

import javax.persistence.LockModeType;
import java.time.Instant;
import java.util.Date;
import java.util.List;

public interface BuskingRepository extends JpaRepository<Busking, Integer>, JpaSpecificationExecutor<Busking> {

    String distanceInKm = "(((acos(sin(( :latitude *pi()/180)) * sin((bl.lat*pi()/180))+cos(( :latitude *pi()/180)) * cos((bl.lat*pi()/180)) * cos((( :longitude- bl.lng)*pi()/180))))*180/pi())*60*1.1515*1.609344) as distance";

    String whereInLive = " where bi.start <= :now and bi.end >= :now";

    String whereInSchedule24 = " where bi.start <= :time and bi.start > :now";

    String selectInfo = "select bi.id, bi.name, bi.image, bi.title, bi.duration_in_minute, bi.start, bi.end, bi.type, bi.status, bi.progress, bi.user_id, " +
            "bl.lat, bl.lng, bl.name as land_name, bl.id as land_id, bl.address as land_address, " +
            "bi.naver_stream_id, bi.naver_stream_url, bi.naver_stream_key, bi.channel_id, " +
            "busker.name as busker_name, busker.avatar";

    String fromAndJoinInfo = " from busking_info bi" +
                             " left join busking_land bl on bl.id = bi.land_id" +
                             " left join user_busker_info busker on busker.user_id = bi.user_id ";
    @Query(nativeQuery = true, value = selectInfo + ", " + distanceInKm +
            fromAndJoinInfo + whereInLive + " and bi.type = 1 and bi.status <> -2 and bi.status <> -3"
            /*+ " having distance <= 5"*/)
    List<BuskingNearByDto> findBuskingLiveInNearBy(Double latitude, Double longitude, Date now);

    @Query(nativeQuery = true, value = selectInfo + ", " + distanceInKm +
            fromAndJoinInfo + whereInSchedule24 + " and bi.type = 1 and bi.status <> -2 and bi.status <> -3"
            /*+ " having distance <= 5" */
            + " order by bi.start")
    List<BuskingNearByDto> findBuskingInScheduleInNearBy(Double latitude, Double longitude, Date time, Date now);

    @Query(nativeQuery = true, value = selectInfo +
            fromAndJoinInfo + whereInLive +
            " and bi.land_id = :landId and bi.type = 1 and bi.status <> -2 and bi.status <> -3")
    List<BuskingNearByDto> findBuskingLiveInLand(int landId, Date now);

    @Query(nativeQuery = true, value = selectInfo +
            fromAndJoinInfo + whereInSchedule24 +
            " and bi.land_id = :landId and bi.type = 1 and bi.status <> -2 and bi.status <> -3")
    List<BuskingNearByDto> findBuskingScheduleInLand(int landId, Date time, Date now);

    @Query(nativeQuery = true, value = selectInfo +
            fromAndJoinInfo + whereInLive +
            " and bl.city_id = :cityId and bi.type = 1 and bi.status <> -2 and bi.status <> -3")
    List<BuskingNearByDto> findBuskingLiveInCity(int cityId, Date now);


    @Query(nativeQuery = true, value = selectInfo +
            fromAndJoinInfo + whereInSchedule24 +
            " and bl.city_id = :cityId and bi.type = 1 and bi.status <> -2 and bi.status <> -3")
    List<BuskingNearByDto> findBuskingScheduleInCity(int cityId, Date time, Date now);

    @Query(nativeQuery = true, value = selectInfo +
            fromAndJoinInfo +
            "left join mst_city mc on bl.city_id = mc.city_id " +
            whereInLive +
            " and mc.province_id = :provinceId and bi.type = 1 and bi.status <> -2 and bi.status <> -3")
    List<BuskingNearByDto> findBuskingLiveInProvince(int provinceId, Date now);

    @Query(nativeQuery = true, value = selectInfo +
            fromAndJoinInfo +
            "left join mst_city mc on bl.city_id = mc.city_id " +
            whereInSchedule24 +
            " and mc.province_id = :provinceId and bi.type = 1 and bi.status <> -2 and bi.status <> -3")
    List<BuskingNearByDto> findBuskingScheduleInProvince(int provinceId, Date time, Date now);


    @Query("from Busking bi left join BuskingLand bl on bi.buskingLand.id = bl.id where bl.id = :landId and bi.start >= :startDate and bi.start < :endDate order by bi.start")
    List<Busking> findBuskingInLand (int landId, Date startDate, Date endDate);

    @Query("select new com.mintpot.busking.dto.api.BuskingInfoDto(bi.id, bi.title, bi.name, bi.image, bi.start, bi.end, bi.type, bi.user.id, bi.durationInMinute, bl.lat, bl.lng, bl.name, bl.id, bl.address, bi.numberLike, bi.numberSponsor, bi.numberViewer, bukser.name, bukser.avatar, bi.channelId) " +
            "from Busking bi " +
            "left join BuskingLand bl on bi.buskingLand.id = bl.id " +
            "left join BuskerInfo bukser on bi.user.id = bukser.user.id " +
            "where bl.id = :landId " +
            "and bi.start >= :startDate and bi.start < :endDate " +
            "and bi.status <> com.mintpot.busking.model.constant.BuskingStatus.DELETED " +
            "and bi.status <> com.mintpot.busking.model.constant.BuskingStatus.REJECT " +
            "order by bi.start")
    List<com.mintpot.busking.dto.api.BuskingInfoDto> findBuskingInfoInLand (int landId, Date startDate, Date endDate);

    @Query("from Busking bi " +
            "where bi.user.id = :userId " +
            "and bi.start >= :queryDate " +
            "and bi.status <> com.mintpot.busking.model.constant.BuskingStatus.DELETED " +
            "order by bi.start ASC ")
    @EntityGraph(attributePaths = {"buskingLand", "viewerList"}, type = EntityGraph.EntityGraphType.LOAD)
    Slice<Busking> getBuskingInfoByUser (int userId, @Param("queryDate") Date queryDate, Pageable pageable);


    @Query("from Busking bi " +
            "where bi.user.id = :userId and bi.end <= :endDate and bi.end > :startDate " +
            "and bi.status <> com.mintpot.busking.model.constant.BuskingStatus.REJECT " +
            "and bi.status <> com.mintpot.busking.model.constant.BuskingStatus.DELETED " +
            "order by bi.start ")
    @EntityGraph(attributePaths = {"buskingLand"}, type = EntityGraph.EntityGraphType.LOAD)
    List<Busking> getBuskingWaitingByUser (int userId, Date endDate, Date startDate);

    @Query("from Busking bi where bi.start >= :startTime and bi.start <= :endTime and bi.isNoticed = 0 " +
            "and bi.status = com.mintpot.busking.model.constant.BuskingStatus.ACTIVE " +
            "and bi.type = com.mintpot.busking.model.constant.BuskingType.LIVE ")
    List<Busking> getBuskingNeedToNotice (Date startTime, Date endTime);

    @EntityGraph(attributePaths = {"user", "buskingLand"}, type = EntityGraph.EntityGraphType.LOAD)
    Page<Busking> findAll(@Nullable Specification<Busking> spec, Pageable pageable);

    String queryCountWatting = "select count (*) from Busking b where b.status= " + BuskingStatus.Constant.IN_ACTIVE +" and b.start <= :now and b.end > :now" + " and b.type= ";

    @Query(queryCountWatting + BuskingType.Constant.LIVE )
    long countByLiveWatting(Date now);

    @Query(queryCountWatting + BuskingType.Constant.OFFLINE)
    long countByOflineWatting(Date now);

}
