package com.mintpot.busking.service;

public interface IDashboard {
    long liveCount();
    long offlineCount();
    long totalUserCount();
    long exchangeCount();
}
