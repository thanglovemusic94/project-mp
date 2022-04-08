import { API } from "../utils/ApiUtils";

const CompanyPointService = {
    getHoldingPoints,
    realeaseAutoExtend,
    restoreAutoExtend
}

function getHoldingPoints() {
    return API.get("company-usage")
}

function realeaseAutoExtend() {
    return API.patch("company-usage/release")
}

function restoreAutoExtend() {
    return API.patch("company-usage/restore-auto")
}
export default CompanyPointService