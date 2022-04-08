package com.mintpot.busking.service;

import com.google.firebase.messaging.FirebaseMessagingException;

public interface FCMService {

    void broadcastAnnouncementCreated ();

    String sendPushNoticeToDevice(String fcmToken, String title, String body, String data) throws FirebaseMessagingException;

    void putFCMToken (String token);
}
