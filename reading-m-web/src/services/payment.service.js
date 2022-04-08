import {loadTossPayments} from "@tosspayments/sdk";
import API from "../utils/API";
import {constructAbsoluteURL} from "../utils/URL";

export const PaymentService = {
    requestPayment,
    transact
}

const TOSS_CLIENT_KEY = "test_ck_jkYG57Eba3GNgnyOW5l8pWDOxmA1"

function requestPayment(amount, orderId, orderName, user) {
    loadTossPayments(TOSS_CLIENT_KEY).then(tossPayments => {
        tossPayments.requestPayment('card', {
            amount,
            orderId,
            orderName,
            customerName: user.name,
            successUrl: constructAbsoluteURL("/paymentComplete/success"),
            failUrl: constructAbsoluteURL("/paymentComplete/fail")
        })
    })
}

function transact(orderId, paymentKey, amount) {
    return API.post("/parent/payment/complete", {
        "paymentKey": paymentKey,
        "tossPayment": {
            "orderId": orderId,
            "amount": amount
        }
    })
}

