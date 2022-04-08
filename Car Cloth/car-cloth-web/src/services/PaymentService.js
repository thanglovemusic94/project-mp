import { API } from "../utils/ApiUtils";

const PaymentService = {
  finishPayment,
  initPayment,
};

const PAYMENT_BASE_URL = "/payments";

function finishPayment({ impUid, merchantUid }) {
  return API.post(`${PAYMENT_BASE_URL}/complete`, { impUid, merchantUid });
}

function initPayment(points) {
  return API.post(`${PAYMENT_BASE_URL}/init`, { points });
}

export default PaymentService;
