package com.mintpot.busking.service.impl;

import com.mintpot.busking.repository.BuskingRepository;
import com.mintpot.busking.repository.PointHistoryRepository;
import com.mintpot.busking.repository.UserRepository;
import com.mintpot.busking.service.IDashboard;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;

@Service
public class DashboardService implements IDashboard {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PointHistoryRepository pointHistoryRepository;

    @Autowired
    private BuskingRepository buskingRepository;

    @Override
    public long liveCount() {
        Date now = Date.from(Instant.now());
        return buskingRepository.countByLiveWatting(now);
    }

    @Override
    public long offlineCount() {
        Date now = Date.from(Instant.now());
        return buskingRepository.countByOflineWatting(now);
    }

    @Override
    public long totalUserCount() {
        return userRepository.totalUserActive();
    }

    @Override
    public long exchangeCount() {
        return pointHistoryRepository.exchangeCount();
    }
}
