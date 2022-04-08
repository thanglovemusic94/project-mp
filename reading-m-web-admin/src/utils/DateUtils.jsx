import moment from 'moment';

export const DateUtils = {
    toLocalDate,
    toLocalDateTime
}

function toLocalDate(value: String, format: String): moment {
    try {
        if (format) {
            return moment(value).format(format)
        } else {
            return moment(value).format("YYYY.MM.DD")
        }
    } catch (err) {
        console.log("error : " + err.message)
    }
}

function toLocalDateTime(value: String, format: String): moment {
    try {
        if (format) {
            return moment(value).format(format)
        } else {
            return moment(value).format("YYYY.MM.DD HH:mm:ss")
        }
    } catch (err) {
        console.log("error : " + err.message)
    }
}

export default function formatDate(value: string, patterValue: string, patterFormat: string) {
    try {
        if (patterFormat) {
            return moment(value, [patterValue]).format(patterFormat);
        } else {
            switch (patterValue) {
                case 'YYYYMMDD':
                    return moment(value, [patterValue]).format("YYYY-MM-DD");
                case 'hmmA':
                    return moment(value, [patterValue]).format("HH:mm");
                default:
                    return moment(value, [patterValue]).format("YYYY.MM.DD hh:mm:ss");
            }
        }
    } catch (err) {
        console.log("error : " + err.message)
    }
}



