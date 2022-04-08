package com.mintpot.busking.api.naver_stream;

import com.google.api.client.util.Base64;
import com.mintpot.busking.api.naver.UserInfo;
import com.mintpot.busking.api.naver_stream.dto.*;
import com.mintpot.busking.dto.SliceDto;
import lombok.extern.log4j.Log4j2;
import org.checkerframework.checker.units.qual.C;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Optional;

@Component
@Log4j2
public class NaverStreamingApiClientImpl implements NaverStreamingApiClient {


    @Value("${naver.stream.accessKey}")
    private String NAVER_STREAM_ACCESS_KEY;

    @Value("${naver.stream.secretKey}")
    private String NAVER_STREAM_SECRET_KEY;

    @Value("${naver.stream.qualityId}")
    private Integer NAVER_STREAM_QUALITY;

    private final String HEADER_TIMESTAMP;
    private final String HEADER_ACCESS_KEY;
    private final String HEADER_SIGNATURE;
    private final String HEADER_CODE;




    private final String URI_GET_CHANNEL;
    private final String URI_CREATE_CHANNEL;
    private final String URI_GET_SERVICE;
    private final String URI_GET_QUALITY_SET;

    private final String POST = "POST";
    private final String GET = "GET";

    private final WebClient naverStreamingClient;



    {
        HEADER_TIMESTAMP   = "x-ncp-apigw-timestamp";
        HEADER_ACCESS_KEY  = "x-ncp-iam-access-key";
        HEADER_SIGNATURE   = "x-ncp-apigw-signature-v2";
        HEADER_CODE        = "x-ncp-region_code2";

        URI_CREATE_CHANNEL = "/api/v2/channels";
        URI_GET_CHANNEL    = "/api/v2/channels";
        URI_GET_SERVICE    = "/api/v2/channels/{channelId}/serviceUrls?serviceUrlType=GENERAL";
        URI_GET_QUALITY_SET= "/api/v2/qualitySets";
    }

    public NaverStreamingApiClientImpl(WebClient naverStreamingClient) {
        this.naverStreamingClient = naverStreamingClient;
    }


    @Override
    public NaverChannelInfo createNaverChannel(String channelName) {
        String timestamp = String.valueOf(System.currentTimeMillis());
        try {
            String signature = naverMakeSignature(timestamp, URI_CREATE_CHANNEL, POST);
            CDN cdn = new CDN();
            cdn.setInstanceNo("5637930");
            NaverChannelRegisterDto registerDto = NaverChannelRegisterDto.builder().channelName(channelName)
                    .qualitySetId(NAVER_STREAM_QUALITY).useDvr(false).cdn(cdn).build();
            var resp = naverStreamingClient.post()
                    .uri(URI_CREATE_CHANNEL)

                    .header(HEADER_TIMESTAMP, timestamp)
                    .header(HEADER_ACCESS_KEY, NAVER_STREAM_ACCESS_KEY)
                    .header(HEADER_SIGNATURE, signature)
                    .header(HEADER_CODE, "KR")

                    .contentType(MediaType.APPLICATION_JSON)
                    .body(BodyInserters.fromValue(registerDto))
                    .retrieve()
                    .bodyToMono(NaverChannelRegisterResponse.class)
                    .block();

            if (resp != null && resp.getContent() != null && resp.getContent().getChannelId() != null) {
                return getNaverChannelDetail(resp.getContent().getChannelId());
            } else return null;

        } catch (Exception ex) {
            log.error(ex.getMessage());
        }
        return null;
    }

    @Override
    public NaverChannelInfo getNaverChannelDetail(String channelId) {
        String timestamp = String.valueOf(System.currentTimeMillis());
        try {
            String uri = URI_GET_CHANNEL + "/" + channelId;
            String signature = naverMakeSignature(timestamp, uri, GET);

            var resp = naverStreamingClient.get()
                    .uri(uri)

                    .header(HEADER_TIMESTAMP, timestamp)
                    .header(HEADER_ACCESS_KEY, NAVER_STREAM_ACCESS_KEY)
                    .header(HEADER_SIGNATURE, signature)
                    .header(HEADER_CODE, "KR")

                    .retrieve()
                    .bodyToMono(NaverChannelInfoResponse.class)
                    .block();
            if (resp != null && resp.getContent() != null && resp.getContent().getChannelId() != null) {
                return resp.getContent();
            } else return null;

        } catch (Exception exception) {
            log.error(exception.getMessage());
        }
        return null;
    }

    @Override
    public SliceDto<NaverServiceInfo> getNaverService(String naverStreamId) {
        String timestamp = String.valueOf(System.currentTimeMillis());
        try {
            String uri = URI_GET_SERVICE.replace("{channelId}", naverStreamId);
            String signature = naverMakeSignature(timestamp, uri, GET);

            var resp = naverStreamingClient.get()
                    .uri(uri)

                    .header(HEADER_TIMESTAMP, timestamp)
                    .header(HEADER_ACCESS_KEY, NAVER_STREAM_ACCESS_KEY)
                    .header(HEADER_SIGNATURE, signature)
                    .header(HEADER_CODE, "KR")

                    .retrieve()
                    .bodyToMono(NaverServiceResponse.class)
                    .block();
            if (resp != null && resp.getContent() != null) {
                return SliceDto.of(Arrays.asList(resp.getContent()), false);
            } else return SliceDto.of(new ArrayList<>(), false);


        } catch (Exception exception) {
            log.error(exception.getMessage());
        }
        return SliceDto.of(new ArrayList<>(), false);
    }

    @Override
    public void getNaverChannels() {
        String timestamp = String.valueOf(System.currentTimeMillis());
        try {
            String signature = naverMakeSignature(timestamp, URI_GET_CHANNEL, GET);
            var resp = naverStreamingClient.get()
                    .uri(URI_GET_CHANNEL)
                    .header(HEADER_TIMESTAMP, timestamp)
                    .header(HEADER_ACCESS_KEY, NAVER_STREAM_ACCESS_KEY)
                    .header(HEADER_SIGNATURE, signature)
                    .header(HEADER_CODE, "KR")
                    .retrieve()
                    .bodyToMono(NaverChannelInfoList.class)
                    .block();
            assert resp != null;
            resp.getContent();
        } catch (UnsupportedEncodingException | NoSuchAlgorithmException | InvalidKeyException e) {
            e.printStackTrace();
        }
    }

    @Override
    public NaverQualitySetList getNaverQualitySets() {
        String timestamp = String.valueOf(System.currentTimeMillis());
        try {
            String signature = naverMakeSignature(timestamp, URI_GET_QUALITY_SET, GET);
            var resp = naverStreamingClient.get()
                    .uri(URI_GET_QUALITY_SET)
                    .header(HEADER_TIMESTAMP, timestamp)
                    .header(HEADER_ACCESS_KEY, NAVER_STREAM_ACCESS_KEY)
                    .header(HEADER_SIGNATURE, signature)
                    .header(HEADER_CODE, "KR")
                    .retrieve()
                    .bodyToMono(NaverQualitySetList.class)
                    .block();
            return resp;
        } catch (UnsupportedEncodingException | NoSuchAlgorithmException | InvalidKeyException e) {
            e.printStackTrace();
        }
        return null;
    }


    private String naverMakeSignature (String timestamp, String url, String method) throws UnsupportedEncodingException, NoSuchAlgorithmException, InvalidKeyException {
        String space = " ";					            // 공백
        String newLine = "\n";  				        // 줄바꿈
        String accessKey = NAVER_STREAM_ACCESS_KEY;		// access key id (from portal or Sub Account)
        String secretKey = NAVER_STREAM_SECRET_KEY;		// secret key (from portal or Sub Account)

        String message = method +
                space +
                url +
                newLine +
                timestamp +
                newLine +
                accessKey;

        SecretKeySpec signingKey = new SecretKeySpec(secretKey.getBytes("UTF-8"), "HmacSHA256");
        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(signingKey);

        byte[] rawHmac = mac.doFinal(message.getBytes("UTF-8"));
        return Base64.encodeBase64String(rawHmac);
    }
}
