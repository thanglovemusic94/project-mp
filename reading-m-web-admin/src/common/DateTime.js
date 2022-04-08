import React from "react";
import moment from 'moment';

function DateTime({format = "", type = "datetime", date=""}) {

    if (format.length === 0) {
        switch (type) {
            case "datetime":
                format = "MMMM Do YYYY, h:mm:ss"
                break;
            case "date":
                format = "YYYY-MM-DD"
                break;
            case "date-ko":
                format = "YYYY년MM월DD일"
                break
            default:
                console.error("Cannot recognize DateTime component's type value")
                break;
        }
    }

    return (
        <span>{moment(date).format(format)}</span>
    )
}

export default DateTime
