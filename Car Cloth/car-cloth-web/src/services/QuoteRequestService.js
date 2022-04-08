import { API } from "../utils/ApiUtils";

export const QuoteRequestService = {
    createQuote
}

const BASE_URL = "/main-home/request-quote";

function createQuote(args) {

    return API.post(BASE_URL, args);
}