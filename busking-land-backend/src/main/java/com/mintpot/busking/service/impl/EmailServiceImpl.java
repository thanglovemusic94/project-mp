package com.mintpot.busking.service.impl;

import com.mintpot.busking.dto.UserDto;
import com.mintpot.busking.model.BuskerInfo;
import com.mintpot.busking.model.Busking;
import com.mintpot.busking.model.User;
import com.mintpot.busking.repository.BuskerRepository;
import com.mintpot.busking.repository.BuskingRepository;
import com.mintpot.busking.service.BuskingService;
import com.mintpot.busking.service.EmailService;
import com.mintpot.busking.service.UserService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.time.Instant;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.Optional;
import java.util.TimeZone;

@Service
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender javaMailSender;

    private final BuskingRepository buskingRepository;

    private final BuskerRepository buskerRepository;

    public EmailServiceImpl(@Qualifier("getJavaMailSender") JavaMailSender javaMailSender, BuskingRepository buskingRepository, BuskerRepository buskerRepository) {
        this.javaMailSender = javaMailSender;
        this.buskingRepository = buskingRepository;
        this.buskerRepository = buskerRepository;
    }

    @Override
    public void sendTestMail() {

        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo("thang.minpot@gmail.com");
        Date now = Date.from(Instant.now());
        String nowStr = DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm:ss").withZone(TimeZone.getTimeZone("Asia/Seoul").toZoneId()).format(now.toInstant());
        String title = "[버스커 신청 승인 안내]";
        String message = "안녕하세요, 버스킹랜드 (주) 입니다.";
        message += "\n" + nowStr + " 에 신청하신 버스커 신청이 승인되었습니다.";
        message += "\n감사합니다.";

        msg.setSubject(title);
        msg.setText(message);

        javaMailSender.send(msg);
    }

    @Override
    public void sendMail(String mail, String title, String message) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(mail);
        msg.setSubject(title);
        msg.setText(message);
        javaMailSender.send(msg);
    }

    @Override
    public void approveBusker(int buskerId) {
        try {
            Date now = Date.from(Instant.now());
            String nowStr = DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm:ss").withZone(TimeZone.getTimeZone("Asia/Seoul").toZoneId()).format(now.toInstant());
            Optional<BuskerInfo> buskerOptional = buskerRepository.findBuskerWithoutStatusById(buskerId);
            if(buskerOptional.isPresent()) {
                BuskerInfo buskerInfo = buskerOptional.get();
                User user = buskerInfo.getUser();
                if(!StringUtils.isEmpty(user.getEmail())) {
                    String title = "[버스커 신청 승인 안내]";
                    String message = "안녕하세요, 버스킹랜드 (주) 입니다.";
                    message += "\n" + nowStr + " 에 신청하신 버스커 신청이 승인되었습니다.";
                    message += "\n문의사항은 카카오톡 플러스친구 버스킹랜드로 연락주시길 바랍니다.\n" +
                            "감사합니다.";
                    sendMail(user.getEmail(), title, message);
                }
            }
        } catch (Exception ignored) {

        }
    }

    @Override
    public void rejectBusker(int buskerId) {
        try {
            Date now = Date.from(Instant.now());
            String nowStr = DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm:ss").withZone(TimeZone.getTimeZone("Asia/Seoul").toZoneId()).format(now.toInstant());
            Optional<BuskerInfo> buskerOptional = buskerRepository.findBuskerWithoutStatusById(buskerId);
            if(buskerOptional.isPresent()) {
                BuskerInfo buskerInfo = buskerOptional.get();
                User user = buskerInfo.getUser();
                if(!StringUtils.isEmpty(user.getEmail())) {
                    String title = "[버스커 신청 반려 안내]";
                    String message = "안녕하세요, 버스킹랜드 (주) 입니다.";
                    message += "\n안타까운 소식을 " + user.getName() + "님께 전달 드립니다 .";
                    message += "\n" + nowStr + " 에 신청하신 버스커 신청이 반려되었습니다.";
                    message += "\n문의사항은 카카오톡 플러스친구 버스킹랜드로 연락주시길 바랍니다.";
                    message += "\n감사합니다.";
                    sendMail(user.getEmail(), title, message);
                }
            }
        } catch (Exception ignored) {

        }
    }

    @Override
    public void approveBusking(int buskingId) {
        try {
            Date now = Date.from(Instant.now());
            Optional<Busking> buskingOptional =  buskingRepository.findById(buskingId);
            if(buskingOptional.isPresent()) {
                Busking busking = buskingOptional.get();
                if(busking.getCreatedAt() != null) {
                    now = busking.getCreatedAt();
                }
                String nowStr = DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm:ss").withZone(TimeZone.getTimeZone("Asia/Seoul").toZoneId()).format(now.toInstant());
                User user = busking.getUser();
                if(!StringUtils.isEmpty(user.getEmail())) {
                    String title = "[버스킹랜드] 라이브 신청 승인 안내";
                    String message = "안녕하세요, 버스킹랜드 (주) 입니다.";
                    message += "\n" + nowStr + " 에 신청하신 라이브 신청이 승인되었습니다.";
                    message += "\n문의사항은 카카오톡 플러스친구 버스킹랜드로 연락주시길 바랍니다.\n" +
                            "감사합니다.";
                    sendMail(user.getEmail(), title, message);
                }
            }

        } catch (Exception ignored) {

        }
    }

    @Override
    public void rejectBusking(int buskingId) {
        try {
            Date now = Date.from(Instant.now());
            Optional<Busking> buskingOptional =  buskingRepository.findById(buskingId);
            if(buskingOptional.isPresent()) {
                Busking busking = buskingOptional.get();
                if(busking.getCreatedAt() != null) {
                    now = busking.getCreatedAt();
                }
                String nowStr = DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm:ss").withZone(TimeZone.getTimeZone("Asia/Seoul").toZoneId()).format(now.toInstant());
                User user = busking.getUser();
                if(!StringUtils.isEmpty(user.getEmail())) {
                    String title = "[버스킹랜드] 라이브 신청 반려 안내";
                    String message = "안녕하세요, 버스킹랜드 (주) 입니다.";
                    message += "\n안타까운 소식을 " + user.getName() + "님께 전달 드립니다.";
                    message += "\n" + nowStr + " 에 신청하신 라이브 신청이 반려되었습니다.";
                    message += "\n문의사항은 카카오톡 플러스친구 버스킹랜드로 연락주시길 바랍니다.";
                    message += "\n감사합니다.";
                    sendMail(user.getEmail(), title, message);
                }
            }

        } catch (Exception ignored) {

        }
    }


}
