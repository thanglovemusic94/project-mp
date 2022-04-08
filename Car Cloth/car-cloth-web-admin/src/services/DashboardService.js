import {API} from "../utils/ApiUtils";

const DashboardService = {
    queryDashboard
}

function queryDashboard() {
    return API.get('/admin/dashboard/')
}

export default DashboardService
