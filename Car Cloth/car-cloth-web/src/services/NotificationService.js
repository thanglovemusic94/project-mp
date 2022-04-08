import { API } from "../utils/ApiUtils"

const NotificationService = {
    getNotifications
}

function getNotifications(params) {
    return API.get("/my-page/notification", {
        params: params
    })
}

export default NotificationService