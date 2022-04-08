package com.mintpot.busking.service;

public interface EmailService {

    void sendTestMail();

    void sendMail (String mail, String title, String message);

    void approveBusker (int buskerId);

    void rejectBusker (int buskerId);

    void approveBusking (int buskingId);

    void rejectBusking (int buskingId);
}
