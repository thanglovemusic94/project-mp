import {API} from "../utils/ApiUtils";
import {TERM_ROUTER} from "../constants/RouterConstant";

const TermService = {
    getTermsPolicy,
    updateTermsPolicy
}

function getTermsPolicy() {
    return API.get(TERM_ROUTER.API_TERM)
}

function updateTermsPolicy(data) {
    return API.put(TERM_ROUTER.API_TERM, data)
}


export default TermService


