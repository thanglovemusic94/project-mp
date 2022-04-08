package com.mintpot.busking.service.impl;

import com.mintpot.busking.api.firebase.FirebaseChannelClient;
import com.mintpot.busking.api.naver_stream.NaverStreamingApiClient;
import com.mintpot.busking.api.naver_stream.dto.NaverChannelInfo;
import com.mintpot.busking.api.naver_stream.dto.NaverServiceInfo;
import com.mintpot.busking.dto.BuskingProgressInfo;
import com.mintpot.busking.dto.PageResponse;
import com.mintpot.busking.dto.SliceDto;
import com.mintpot.busking.dto.api.*;
import com.mintpot.busking.dto.web.BuskingDTO;
import com.mintpot.busking.dto.web.request.BuskingEditDTO;

import com.mintpot.busking.dto.web.response.BuskingNameDTO;
import com.mintpot.busking.exception.BusinessException;
import com.mintpot.busking.exception.constant.ErrorCode;
import com.mintpot.busking.facade.AuthenticationFacade;
import com.mintpot.busking.model.*;
import com.mintpot.busking.model.constant.Period;
import com.mintpot.busking.model.constant.*;
import com.mintpot.busking.repository.*;
import com.mintpot.busking.service.BuskingService;
import com.mintpot.busking.service.EmailService;
import com.mintpot.busking.service.PointService;
import com.mintpot.busking.service.S3Service;
import com.mintpot.busking.utils.DateTimeUtils;
import com.mintpot.busking.utils.search.BuskingSpecification;
import com.mintpot.busking.utils.search.SearchCriteria;
import com.mintpot.busking.utils.search.SearchOperation;
import lombok.extern.log4j.Log4j2;
import org.locationtech.jts.geom.GeometryFactory;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Predicate;
import java.text.ParseException;
import java.time.*;
import java.util.*;
import java.util.concurrent.TimeUnit;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@Log4j2
public class BuskingServiceImpl implements BuskingService {

    private final BuskingRepository buskingRepository;

    private final BuskingLandRepository buskingLandRepository;

    private final CityRepository cityRepository;

    private final ProvinceRepository provinceRepository;

    private final ModelMapper modelMapper;

    private final AuthenticationFacade facade;

    private final GeometryFactory geometryFactory;

    private final BuskingLikeRepository likeRepository;

    private final BuskingViewerRepository viewerRepository;

    private final BuskingSponsorRepository sponsorRepository;

    private final FirebaseChannelClient firebaseChannelClient;

    private final NaverStreamingApiClient naverStreamingApiClient;

    private final BuskerRepository buskerRepository;

    private final UserRepository userRepository;

    private final PointService pointService;

    private final EmailService emailService;

    @Autowired
    private S3Service s3Service;


    public BuskingServiceImpl(BuskingRepository buskingRepository, BuskingLandRepository buskingLandRepository, CityRepository cityRepository, ProvinceRepository provinceRepository, ModelMapper modelMapper, AuthenticationFacade facade, GeometryFactory geometryFactory, BuskingLikeRepository likeRepository, BuskingViewerRepository viewerRepository, BuskingSponsorRepository sponsorRepository, FirebaseChannelClient firebaseChannelClient, NaverStreamingApiClient naverStreamingApiClient, BuskerRepository buskerRepository, UserRepository userRepository, PointService pointService, EmailService emailService) {
        this.buskingRepository = buskingRepository;
        this.buskingLandRepository = buskingLandRepository;
        this.cityRepository = cityRepository;
        this.provinceRepository = provinceRepository;
        this.modelMapper = modelMapper;
        this.facade = facade;
        this.geometryFactory = geometryFactory;
        this.likeRepository = likeRepository;
        this.viewerRepository = viewerRepository;
        this.sponsorRepository = sponsorRepository;
        this.firebaseChannelClient = firebaseChannelClient;
        this.naverStreamingApiClient = naverStreamingApiClient;
        this.buskerRepository = buskerRepository;
        this.userRepository = userRepository;
        this.pointService = pointService;
        this.emailService = emailService;
    }

    @Override
    public void createBusking(BuskingRegDto regDto) {
        int userId = facade.getAuthentication().getUserId();
        buskerRepository.getBuskerInfoByUser(userId).orElseThrow(() -> new BusinessException(ErrorCode.INSUFFICIENT_PRIVILEGE));
        validate(regDto);
        Busking buskingInfo = modelMapper.map(regDto, Busking.class);
        BuskingLand buskingLand = new BuskingLand(regDto.getBusking_land_id());
        buskingInfo.setBuskingLand(buskingLand);
        Date start = regDto.getStart();
        Date end = Date.from(start.toInstant().plus(Duration.ofMinutes(regDto.getDurationInMinute())));
        buskingInfo.setEnd(end);
        buskingInfo.setUser(new User(userId));
        buskingInfo.setStatus(BuskingStatus.IN_ACTIVE);
        buskingInfo = buskingRepository.save(buskingInfo);
        //activeBusking(buskingInfo.getId());
    }

    @Override
    public SliceDto<BuskingInfoDto> getBuskingWaiting(LocalDate startDate, LocalDate endDate) {
        int userId = facade.getAuthentication().getUserId();
        Date now = Date.from(Instant.now());
        //default time zone
        ZoneId defaultZoneId = ZoneId.systemDefault();
        Date queryStart = Date.from(startDate.atStartOfDay(defaultZoneId).toInstant());
        Date queryEnd = Date.from(endDate.atTime(LocalTime.MAX).atZone(defaultZoneId).toInstant());
        if (queryStart.before(now)) {
            queryStart = now;
        }

        List<Busking> buskingInfos = buskingRepository.getBuskingWaitingByUser(userId, queryEnd, queryStart);
        List<BuskingInfoDto> result = new ArrayList<>();
        buskingInfos.forEach(buskingInfo -> {
            BuskingInfoDto infoDto = modelMapper.map(buskingInfo, BuskingInfoDto.class);
            result.add(infoDto);
        });
        return SliceDto.of(result, false);
    }

    @Override
    public SliceDto<BuskingInfoDto> getBuskingScheduleInLand(int landId, LocalDate startDate, LocalDate endDate) {
        BuskingLand buskingLand = buskingLandRepository.findById(landId).orElseThrow(() -> new BusinessException(ErrorCode.BUSKING_NOT_FOUND));
        Date now = Date.from(Instant.now());
        //default time zone
        ZoneId defaultZoneId = ZoneId.systemDefault();
        Date queryStart = Date.from(startDate.atStartOfDay(defaultZoneId).toInstant());
        Date queryEnd = Date.from(endDate.atTime(LocalTime.MAX).atZone(defaultZoneId).toInstant());
        // now show all include inactive busking
//        if(queryStart.before(now)) {
//            queryStart = now;
//        }

        //List<Busking> buskingInfoList = buskingRepository.findBuskingInLand(landId, queryStart, queryEnd);
        List<BuskingInfoDto> result = buskingRepository.findBuskingInfoInLand(landId, queryStart, queryEnd);
        return SliceDto.of(result, false);
    }


    @Override
    public SliceDto<BuskingInfoDto> getBusking(Pageable pageable, Period period) {
        int userId = facade.getAuthentication().getUserId();
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.MONTH, -period.getValue());
        log.debug("Getting busking history from {}", cal.getTime().toString());


        Slice<Busking> buskingInfos = buskingRepository.getBuskingInfoByUser(userId, cal.getTime(), pageable);
        List<BuskingInfoDto> result = new ArrayList<>();
        buskingInfos.forEach(buskingInfo -> {
            BuskingInfoDto infoDto = modelMapper.map(buskingInfo, BuskingInfoDto.class);
            int numberView = (int) buskingInfo.getViewerList().stream().filter(buskingViewer -> buskingViewer.getStatus() == BuskingViewerStatus.JOIN).count();
            infoDto.setNumberViewer(numberView);
            result.add(infoDto);
        });
        return SliceDto.of(result, buskingInfos.hasNext());
    }

    private void activeBusking(int buskingId) {
        Busking buskingInfo = buskingRepository.findById(buskingId).orElseThrow(() -> new BusinessException(ErrorCode.BUSKING_NOT_FOUND));
        buskingInfo.generateChannelId();
        firebaseChannelClient.createChannel(buskingInfo.getChannelId());
        NaverChannelInfo naverChannelInfo = naverStreamingApiClient.createNaverChannel(buskingInfo.getChannelId());
        buskingInfo.setNaverStreamId(naverChannelInfo.getChannelId());
        buskingInfo.setNaverStreamKey(naverChannelInfo.getStreamKey());
        buskingInfo.setNaverStreamUrl(naverChannelInfo.getPublishUrl());
        buskingInfo.setStatus(BuskingStatus.ACTIVE);
        buskingRepository.save(buskingInfo);
    }

    private void validate(BuskingRegDto regDto) {
        if (regDto.getType() == null) throw new BusinessException(ErrorCode.BUSKING_MISSING_TYPE);
        if (regDto.getName() == null) throw new BusinessException(ErrorCode.BUSKING_MISSING_NAME);
        if (regDto.getTitle() == null) throw new BusinessException(ErrorCode.BUSKING_MISSING_TITLE);
        if (regDto.getImage() == null) throw new BusinessException(ErrorCode.BUSKING_MISSING_IMAGE);
        if (regDto.getStart() == null) throw new BusinessException(ErrorCode.BUSKING_MISSING_TIME);
        if (regDto.getDurationInMinute() == null) throw new BusinessException(ErrorCode.BUSKING_MISSING_TIME);
        buskingLandRepository.findById(regDto.getBusking_land_id()).orElseThrow(() -> new BusinessException(ErrorCode.BUSKING_MISSING_PLACE));
    }

    @Override
    public void editBusking(BuskingRegDto regDto, int buskingId) {
        int userId = facade.getAuthentication().getUserId();
        Busking buskingInfo = buskingRepository.findById(buskingId).orElseThrow(() -> new BusinessException(ErrorCode.BUSKING_NOT_FOUND));
        if (buskingInfo.getUser().getId() != userId) {
            throw new BusinessException(ErrorCode.INSUFFICIENT_PRIVILEGE);
        }
        if (buskingInfo.getStart().before(Date.from(Instant.now()))) {
            throw new BusinessException(ErrorCode.BUSKING_CANNOT_EDIT);
        }

        if (!StringUtils.isEmpty(regDto.getName())) {
            buskingInfo.setName(regDto.getName());
        }

        if (!StringUtils.isEmpty(regDto.getTitle())) {
            buskingInfo.setTitle(regDto.getTitle());
        }

        if (!StringUtils.isEmpty(regDto.getImage())) {
            buskingInfo.setImage(regDto.getImage());
        }

        if (!StringUtils.isEmpty(regDto.getStart())) {
            buskingInfo.setStart(regDto.getStart());
            Date end = new Date(regDto.getStart().getTime() + TimeUnit.MINUTES.toMillis(buskingInfo.getDurationInMinute()));
            buskingInfo.setEnd(end);
        }

        if (!StringUtils.isEmpty(regDto.getDurationInMinute())) {
            Date end = new Date(buskingInfo.getStart().getTime() + TimeUnit.MINUTES.toMillis(buskingInfo.getDurationInMinute()));
            buskingInfo.setEnd(end);
            buskingInfo.setDurationInMinute(regDto.getDurationInMinute());
        }

        if (!StringUtils.isEmpty(regDto.getType())) {
            buskingInfo.setType(regDto.getType());
        }

        if (!StringUtils.isEmpty(regDto.getBusking_land_id())) {
            buskingInfo.setBuskingLand(new BuskingLand(regDto.getBusking_land_id()));
        }

        buskingRepository.save(buskingInfo);
    }

    @Override
    public void deleteBusking(BuskingDeleteDto buskingDeleteDto) {
        int userId = facade.getAuthentication().getUserId();
        Busking buskingInfo = buskingRepository.findById(buskingDeleteDto.getId()).orElseThrow(() -> new BusinessException(ErrorCode.BUSKING_NOT_FOUND));
        if (buskingInfo.getUser().getId() != userId) {
            throw new BusinessException(ErrorCode.INSUFFICIENT_PRIVILEGE);
        }
        if (buskingInfo.getStart().before(Date.from(Instant.now()))) {
            throw new BusinessException(ErrorCode.BUSKING_CANNOT_DELETE);
        }

        buskingInfo.setStatus(BuskingStatus.DELETED);

        buskingRepository.save(buskingInfo);
    }


    @Override
    public SliceDto<BuskingInfoDto> getBuskingLiveInNearBy(Double lat, Double lng) {
        Date now = Date.from(Instant.now());
        List<BuskingNearByDto> doubles = buskingRepository.findBuskingLiveInNearBy(lat, lng, now);
        List<BuskingInfoDto> buskingInfoDtoList = new ArrayList<>();
        doubles.forEach(buskingNearByDto -> {
            log.error("name: " + buskingNearByDto.getName());
            buskingInfoDtoList.add(BuskingInfoDto.from(buskingNearByDto));
        });
        return SliceDto.of(buskingInfoDtoList, false);
    }

    @Override
    public SliceDto<BuskingInfoDto> getBuskingInScheduleInNearBy(Double lat, Double lng) {
        Date now = Date.from(Instant.now());
        Date time = Date.from(Instant.now().plus(Duration.ofDays(1)));
        List<BuskingNearByDto> doubles = buskingRepository.findBuskingInScheduleInNearBy(lat, lng, time, now);
        List<BuskingInfoDto> buskingInfoDtoList = new ArrayList<>();
        doubles.forEach(buskingNearByDto -> {
            log.error("name: " + buskingNearByDto.getName());
            buskingInfoDtoList.add(BuskingInfoDto.from(buskingNearByDto));
        });
        return SliceDto.of(buskingInfoDtoList, false);
    }


    @Override
    public SliceDto<BuskingInfoDto> getBuskingLiveFilter(BuskingFilterDto filterDto) {
        filterDto.validate();
        Date now = Date.from(Instant.now());
        List<BuskingNearByDto> doubles;
        if (filterDto.getCityId() > 0) {
            doubles = buskingRepository.findBuskingLiveInProvince(filterDto.getCityId(), now);
        } else {
            doubles = buskingRepository.findBuskingLiveInLand(filterDto.getLandId(), now);
        }
        List<BuskingInfoDto> buskingInfoDtoList = new ArrayList<>();
        doubles.forEach(buskingNearByDto -> {
            log.error("name: " + buskingNearByDto.getName());
            buskingInfoDtoList.add(BuskingInfoDto.from(buskingNearByDto));
        });
        return SliceDto.of(buskingInfoDtoList, false);
    }

    @Override
    public SliceDto<BuskingInfoDto> getBuskingScheduleFilter(BuskingFilterDto filterDto) {
        filterDto.validate();
        Date now = Date.from(Instant.now());
        Date time = Date.from(Instant.now().plus(Duration.ofDays(1)));

        List<BuskingNearByDto> doubles;
        if (filterDto.getCityId() > 0) {
            doubles = buskingRepository.findBuskingScheduleInProvince(filterDto.getCityId(), time, now);
        } else {
            doubles = buskingRepository.findBuskingScheduleInLand(filterDto.getLandId(), time, now);
        }
        List<BuskingInfoDto> buskingInfoDtoList = new ArrayList<>();
        doubles.forEach(buskingNearByDto -> {
            log.error("name: " + buskingNearByDto.getName());
            buskingInfoDtoList.add(BuskingInfoDto.from(buskingNearByDto));
        });
        return SliceDto.of(buskingInfoDtoList, false);
    }

    @Override
    public SliceDto<HomeSearchDto> buskingHomeSearch(String keySearch) {
        List<HomeSearchDto> searchDtoList = new ArrayList<>();
        List<Province> provinceList = provinceRepository.searchProvince(keySearch);
        provinceList.forEach(province -> searchDtoList.add(new HomeSearchDto(province)));
//        List<City> cities = cityRepository.searchCity(keySearch);
//        cities.forEach(city -> searchDtoList.add(new HomeSearchDto(city)));
        List<BuskingLand> buskingLands = buskingLandRepository.searchLand(keySearch);
        buskingLands.forEach(buskingLand -> searchDtoList.add(new HomeSearchDto(modelMapper.map(buskingLand, BuskingLandInfoDto.class))));
        return SliceDto.of(searchDtoList, false);
    }

    @Override
    public void addViewer(BuskingViewerRegDto viewerRegDto) {
        int userId = facade.getAuthentication().getUserId();
        int buskingId = viewerRegDto.getBusking_id();
        Busking buskingInfo = buskingRepository.findById(buskingId).orElseThrow(() -> new BusinessException(ErrorCode.BUSKING_NOT_FOUND));
        List<BuskingViewer> viewers = viewerRepository.getBuskingViewerByBuskingAndUser(buskingId, userId);
        boolean shouldAdd = false;
        boolean shouldAddInAccumulative = false;
        if (viewers.size() == 0) {
            shouldAdd = true;
            shouldAddInAccumulative = true;
        } else {
            BuskingViewer lastStatus = viewers.get(0);
            if (lastStatus.getStatus() == BuskingViewerStatus.LEFT) {
                shouldAdd = true;
            }
        }

        if (shouldAddInAccumulative) {
            buskingInfo.addViewerAccumulative();
        }

        if (shouldAdd) {
            buskingInfo.addViewer();
            if (buskingInfo.getNumberViewer() > 100) throw new BusinessException(ErrorCode.BUSKING_VIEWER_REACH_MAX);

            BuskingViewer buskingViewer = new BuskingViewer(BuskingViewerStatus.JOIN, viewerRegDto.getBusking_id(), userId);
            viewerRepository.save(buskingViewer);

            buskingRepository.save(buskingInfo);
            firebaseChannelClient.updateChannelViewer(buskingInfo.getChannelId(), buskingInfo.getNumberViewer());
        }
    }

    @Override
    public void removeViewer(BuskingViewerRegDto viewerRegDto) {
        int userId = facade.getAuthentication().getUserId();
        int buskingId = viewerRegDto.getBusking_id();
        Busking buskingInfo = buskingRepository.findById(buskingId).orElseThrow(() -> new BusinessException(ErrorCode.BUSKING_NOT_FOUND));
        List<BuskingViewer> viewers = viewerRepository.getBuskingViewerByBuskingAndUser(buskingId, userId);
        if (viewers.size() > 0) {
            BuskingViewer lastStatus = viewers.get(0);
            if (lastStatus.getStatus() == BuskingViewerStatus.JOIN) {
                BuskingViewer viewerLeft = new BuskingViewer();
                viewerLeft.setBuskingInfo(buskingInfo);
                viewerLeft.setUser(new User(userId));
                viewerLeft.setStatus(BuskingViewerStatus.LEFT);
                viewerRepository.save(viewerLeft);
                buskingInfo.removeViewer();
                buskingRepository.save(buskingInfo);
                firebaseChannelClient.updateChannelViewer(buskingInfo.getChannelId(), buskingInfo.getNumberViewer());
            }
        }
    }

    @Override
    public void addSponsor(BuskingSponsorRegDto sponsorRegDto) {
        int userId = facade.getAuthentication().getUserId();
        int buskingId = sponsorRegDto.getBusking_id();
        int coin = sponsorRegDto.getCoin();
        Busking buskingInfo = buskingRepository.findById(buskingId).orElseThrow(() -> new BusinessException(ErrorCode.BUSKING_NOT_FOUND));
        BuskingSponsor buskingSponsor = new BuskingSponsor(coin, buskingId, userId);
        sponsorRepository.save(buskingSponsor);
        buskingInfo.addSponsor(coin);
        buskingRepository.save(buskingInfo);

        pointService.doTransaction(coin, PointTransactionType.USE, userId, null);
        pointService.doTransaction(coin, PointTransactionType.PAID, buskingInfo.getUser().getId(), null);

        firebaseChannelClient.updateChannelSponsor(buskingInfo.getChannelId(), buskingInfo.getNumberSponsor());
    }

    @Override
    public void addLike(BuskingLikeRegDto likeRegDto) {
        int userId = facade.getAuthentication().getUserId();
        int buskingId = likeRegDto.getBusking_id();
        Busking buskingInfo = buskingRepository.findById(buskingId).orElseThrow(() -> new BusinessException(ErrorCode.BUSKING_NOT_FOUND));
        BuskingLike buskingLike = new BuskingLike(buskingId, userId);
        likeRepository.save(buskingLike);
        buskingInfo.addLike();
        buskingRepository.save(buskingInfo);
        firebaseChannelClient.updateChannelLike(buskingInfo.getChannelId(), buskingInfo.getNumberLike());
    }

    @Override
    public BuskingBroadcastLinkInfo getBroadcastLinkInfo(int buskingId) {
        int userId = facade.getAuthentication().getUserId();
        Busking buskingInfo = buskingRepository.findById(buskingId).orElseThrow(() -> new BusinessException(ErrorCode.BUSKING_NOT_FOUND));
        if (buskingInfo.getUser().getId() != userId) throw new BusinessException(ErrorCode.INSUFFICIENT_PRIVILEGE);
        return modelMapper.map(buskingInfo, BuskingBroadcastLinkInfo.class);
    }

    @Override
    public SliceDto<NaverServiceInfo> getStreamingLinkInfo(int buskingId) {
        int userId = facade.getAuthentication().getUserId();
        Busking buskingInfo = buskingRepository.findById(buskingId).orElseThrow(() -> new BusinessException(ErrorCode.BUSKING_NOT_FOUND));
        return naverStreamingApiClient.getNaverService(buskingInfo.getNaverStreamId());
    }

    @Override
    public BuskingProgressInfo streamingStatus(int buskingId) {
        int userId = facade.getAuthentication().getUserId();
        Busking buskingInfo = buskingRepository.findById(buskingId).orElseThrow(() -> new BusinessException(ErrorCode.BUSKING_NOT_FOUND));
        return modelMapper.map(buskingInfo, BuskingProgressInfo.class);
    }


    @Override
    public void startLive(int buskingId) {
        int userId = facade.getAuthentication().getUserId();
        Busking buskingInfo = buskingRepository.findById(buskingId).orElseThrow(() -> new BusinessException(ErrorCode.BUSKING_NOT_FOUND));
        buskingInfo.setProgress(BuskingProgress.IN_LIVE);
        buskingRepository.save(buskingInfo);
        firebaseChannelClient.updateChannelProgress(buskingInfo.getChannelId(), BuskingProgress.IN_LIVE);
    }

    @Override
    public void endLive(int buskingId) {
        int userId = facade.getAuthentication().getUserId();
        Busking buskingInfo = buskingRepository.findById(buskingId).orElseThrow(() -> new BusinessException(ErrorCode.BUSKING_NOT_FOUND));
        buskingInfo.setProgress(BuskingProgress.END);
        buskingRepository.save(buskingInfo);
        firebaseChannelClient.updateChannelProgress(buskingInfo.getChannelId(), BuskingProgress.END);
    }

    @Override
    public void updateConfig(BuskingConfigRegDto configRegDto) {
        int userId = facade.getAuthentication().getUserId();
        int buskingId = configRegDto.getBusking_id();
        Busking buskingInfo = buskingRepository.findById(buskingId).orElseThrow(() -> new BusinessException(ErrorCode.BUSKING_NOT_FOUND));
        firebaseChannelClient.updateChannelConfig(buskingInfo.getChannelId(), configRegDto.getConfig());
    }

    /**
     * web amdmin
     */
    @Override
    public PageResponse<BuskingDTO> findAll(Date start, Date end, String name, BuskingWebAdminStatusFilter adminStatus, BuskingType buskingType, Pageable pageable) {
        Date now = Date.from(Instant.now());

        Specification<Busking> query = Specification.where(null);

        if (start != null && end == null) {
            Specification<Busking> queryName = query.and((root, criteriaQuery, criteriaBuilder) -> {
                Predicate preStart = criteriaBuilder.greaterThan(root.get(Busking_.start), start);
                return criteriaBuilder.and(preStart);
            });
            query = query.and(queryName);
        }

        if (start == null && end != null) {
            Specification<Busking> queryName = query.and((root, criteriaQuery, criteriaBuilder) -> {
                Predicate preEnd = criteriaBuilder.lessThan(root.get(Busking_.end), end);
                return criteriaBuilder.and(preEnd);
            });
            query = query.and(queryName);
        }

        if (start != null && end != null) {
            Specification<Busking> queryName = query.and((root, criteriaQuery, criteriaBuilder) -> {
                Predicate preStart = criteriaBuilder.greaterThan(root.get(Busking_.start), start);
                Predicate preEnd = criteriaBuilder.lessThan(root.get(Busking_.end), end);
                return criteriaBuilder.and(preStart, preEnd);
            });
            query = query.and(queryName);
        }

        if (adminStatus == null) {
            adminStatus = BuskingWebAdminStatusFilter.ALL;
        }

        switch (adminStatus) {
            case COMPLETED: {
                Specification<Busking> queryName = query.and((root, criteriaQuery, criteriaBuilder) -> {
                    Predicate preEnd = criteriaBuilder.lessThan(root.get(Busking_.end), now);
                    return criteriaBuilder.and(preEnd);
                });
                query = query.and(queryName);
                break;
            }
            case IN_PROGRESS: {
                Specification<Busking> queryName = query.and((root, criteriaQuery, criteriaBuilder) -> {
                    Predicate pre1 = criteriaBuilder.greaterThan(root.get(Busking_.end), now);
                    if (buskingType == BuskingType.LIVE) {
                        Predicate preEnd = criteriaBuilder.equal(root.get(Busking_.progress), BuskingProgress.IN_LIVE);
                        return criteriaBuilder.and(pre1, preEnd);
                    }
                    if (buskingType == BuskingType.OFFLINE) {
                        Predicate pre2 = criteriaBuilder.lessThan(root.get(Busking_.start), now);
                        return criteriaBuilder.and(pre1, pre2);
                    }
                    return criteriaBuilder.and(pre1);
                });
                query = query.and(queryName);
                break;
            }
            case IN_SCHEDULE: {
                Specification<Busking> queryName = query.and((root, criteriaQuery, criteriaBuilder) -> {
                    Predicate preEnd = criteriaBuilder.greaterThan(root.get(Busking_.start), now);
                    return criteriaBuilder.and(preEnd);
                });
                query = query.and(queryName);
                break;
            }
        }

        if (!StringUtils.isEmpty(name)) {
            Specification<Busking> queryName = query.and((root, criteriaQuery, criteriaBuilder) -> {
                Join<Busking, BuskingLand> buskingLandJoin = root.join(Busking_.buskingLand, JoinType.INNER);
                Predicate predicateName = criteriaBuilder.like(root.get(Busking_.name), "%" + name + "%");
                Predicate predicateNameBusking = criteriaBuilder.like(buskingLandJoin.get(BuskingLand_.name), "%" + name + "%");
                return criteriaBuilder.or(predicateName, predicateNameBusking);
            });
            query = query.and(queryName);
        }

        if (buskingType != null) {
            BuskingSpecification specName = new BuskingSpecification(new SearchCriteria("type", SearchOperation.EQUALITY, buskingType));
            query = query.and(specName);
        }

        Specification<Busking> queryName = query.and((root, criteriaQuery, criteriaBuilder) -> {
            Predicate predicateName = criteriaBuilder.notEqual(root.get(Busking_.status), BuskingStatus.DELETED);
            return criteriaBuilder.and(predicateName);
        });
        query = query.and(queryName);

        Page<Busking> buskings = buskingRepository.findAll(query, pageable);
        Page<BuskingDTO> dtos = buskings.map(new Function<>() {
            @Override
            public BuskingDTO apply(Busking busking) {
                BuskingDTO dto = modelMapper.map(busking, BuskingDTO.class);
                dto.generateStatus();
                return dto;
            }
        });

        PageResponse<BuskingDTO> response = new PageResponse(dtos);
        return response;
    }

    @Override
    public PageResponse<BuskingDTO> findAllWaiting(Pageable pageable, BuskingType type) {
        Date now = Date.from(Instant.now());
        Specification<Busking> query = Specification.where(null);
        Specification<Busking> queryName = query.and((root, criteriaQuery, criteriaBuilder) -> {
            Predicate pre1 = criteriaBuilder.greaterThan(root.get(Busking_.end), now);
            Predicate pre2 = criteriaBuilder.equal(root.get(Busking_.type), type);
            Predicate pre3 = criteriaBuilder.equal(root.get(Busking_.status), BuskingStatus.IN_ACTIVE);
            return criteriaBuilder.and(pre1, pre2, pre3);
        });
        query = query.and(queryName);
        Page<Busking> buskings = buskingRepository.findAll(query, pageable);
        Page<BuskingDTO> dtos = buskings.map(busking -> modelMapper.map(busking, BuskingDTO.class));
        return new PageResponse(dtos);
    }

    @Override
    public BuskingEditDTO findById(Integer id) throws ParseException {
        if (buskingRepository.existsById(id)) {
            Busking busking = buskingRepository.findById(id).orElseThrow(() -> new BusinessException(ErrorCode.NOT_CONTENT));
            BuskingEditDTO dto = modelMapper.map(busking, BuskingEditDTO.class);
            log.info("start date: " + dto.getStart());
            dto.setStart(DateTimeUtils.asString(busking.getStart(), "yyyy-MM-dd HH:mm:ss"));
            dto.setEnd(DateTimeUtils.asString(busking.getEnd(), "yyyy-MM-dd HH:mm:ss"));
            dto.generateStatus();
            dto.setUsername(busking.getUser().getName());
            dto.setLand(busking.getBuskingLand().getName());
            return dto;
        } else {
            new BusinessException(ErrorCode.NOT_CONTENT);
        }
        return null;
    }

    @Override
    @Transactional
    public BuskingDTO update(BuskingEditDTO dto, Integer id) throws ParseException {
        Busking busking = buskingRepository.findById(id).orElseThrow(() -> new BusinessException(ErrorCode.NOT_CONTENT));
        busking.setImage(dto.getImage());
        busking.setStart(DateTimeUtils.asDate(dto.getStart()));
        busking.setEnd(DateTimeUtils.asDate(dto.getEnd()));
        busking.setName(dto.getName());
        busking.setDurationInMinute(dto.getDurationInMinute());

        var adminStatus = dto.getAdminStatus();
        Date now = Date.from(Instant.now());
        Date start = DateTimeUtils.asDate(dto.getStart());
        Date end = DateTimeUtils.asDate(dto.getEnd());

        if (adminStatus.equals(BuskingWebAdminStatus.WAITING) && start.after(now)) {
            busking.setStatus(BuskingStatus.IN_ACTIVE);
            busking.setProgress(BuskingProgress.INIT);
        }
        if (adminStatus.equals(BuskingWebAdminStatus.IN_SCHEDULE) && start.after(now)) {
            busking.setStatus(BuskingStatus.ACTIVE);
            busking.setProgress(BuskingProgress.INIT);
        }
        if (dto.getType() == BuskingType.LIVE) {
            if (adminStatus.equals(BuskingWebAdminStatus.IN_PROGRESS) && end.after(now)) {
                busking.setStatus(BuskingStatus.ACTIVE);
                busking.setProgress(BuskingProgress.IN_LIVE);
            }
        } else {
            if (adminStatus.equals(BuskingWebAdminStatus.IN_PROGRESS) && end.before(now) && start.before(now)) {
                busking.setStatus(BuskingStatus.ACTIVE);
                busking.setProgress(BuskingProgress.IN_LIVE);
            }
        }
        if (adminStatus.equals(BuskingWebAdminStatus.COMPLETED) && end.before(now)) {
            busking.setStatus(BuskingStatus.ACTIVE);
            busking.setProgress(BuskingProgress.END);
        }
        if (adminStatus.equals(BuskingWebAdminStatus.REJECTED)) {
            busking.setStatus(BuskingStatus.REJECT);
            busking.setProgress(BuskingProgress.INIT);
        }
        if (adminStatus.equals(BuskingWebAdminStatus.DELETED)) {
            busking.setStatus(BuskingStatus.DELETED);
            busking.setProgress(BuskingProgress.INIT);
        }

        busking.setNumberSponsor(dto.getNumberSponsor());
        busking.setNumberLike(dto.getNumberLike());
        busking.setNumberViewerAccumulative(dto.getNumberViewerAccumulative());
//        User user =  userRepository.findByNameActive(dto.getUsername()).orElseThrow(()->new BusinessException(ErrorCode.USER_NOT_EXIST));
//        busking.setUser(user);
        BuskingLand land = buskingLandRepository.findByName(dto.getLand()).orElseThrow(() -> new BusinessException(ErrorCode.LAND_NOT_EXIT));
        busking.setBuskingLand(land);

        buskingRepository.save(busking);

        BuskingDTO buskingDTO = modelMapper.map(busking, BuskingDTO.class);
        return buskingDTO;
    }


    @Override
    @Transactional
    public void delete(Integer id) {
        if (buskingRepository.existsById(id)) {
            Busking busking = buskingRepository.findById(id).orElseThrow(() -> new BusinessException(ErrorCode.NOT_CONTENT));
            busking.setStatus(BuskingStatus.DELETED);
            buskingRepository.save(busking);
        } else {
            new BusinessException(ErrorCode.NOT_CONTENT);
        }
    }


    @Override
    @Transactional
    public void reject(Integer id) {
        if (buskingRepository.existsById(id)) {
            Busking busking = buskingRepository.findById(id).orElseThrow(() -> new BusinessException(ErrorCode.NOT_CONTENT));
            busking.setStatus(BuskingStatus.REJECT);
            buskingRepository.save(busking);
            emailService.rejectBusking(id);
        } else {
            new BusinessException(ErrorCode.NOT_CONTENT);
        }
    }

    @Override
    @Transactional
    public void rejects(List<Integer> ids) {
        ids.forEach(integer -> {
            reject(integer);
        });
    }

    @Override
    @Transactional
    public void approved(Integer id) {
        if (buskingRepository.existsById(id)) {
            activeBusking(id);
            emailService.approveBusking(id);
        } else {
            new BusinessException(ErrorCode.NOT_CONTENT);
        }
    }

    @Override
    @Transactional
    public void approveds(List<Integer> ids) {
        ids.forEach(integer -> {
            approved(integer);
        });
    }

    @Override
    public List<BuskingNameDTO> findAllName() {
        List<String> list = buskingLandRepository.findAllName();
        List<BuskingNameDTO> dtoList = list.stream().map(s -> {
            return new BuskingNameDTO(s);
        }).collect(Collectors.toList());
        return dtoList;
    }

    /**
     * end web web
     */
}
