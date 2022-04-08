package com.mintpot.carcloth.api;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class PaymentInfo {

    private int code;

    private String message;

    private Response response;


    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {
        private long amount;

        private String apply_num;

        private String bank_code;

        private String bank_name;

        private String buyer_addr;

        private String buyer_email;

        private String buyer_name;

        private String buyer_postcode;

        private String buyer_tel;

        private long cancel_amount;

        private String cancel_reason;

        private String card_code;

        private String card_name;

        private String card_number;

        private int card_quota;

        private int card_type;

        private boolean cash_receipt_issued;

        private String channel;

        private String currency;

        private boolean escrow;

        private String imp_uid;

        private String merchant_uid;

        private String name;

        private long paid_at;

        private String pay_method;

        private String pg_id;

        private String pg_provider;

        private String pg_tid;

        private String receipt_url;

        private long started_at;

        private String status;

        private String user_agent;
    }
}
