import moment from 'moment';

export const DateUtils = {
    toLocalDate,
    addDays,
}

/**
 * @param value
 * @param patterValue
 * @param patterFormat
 * @returns {string}
 * @example  value="1430PM" ; patterValue="HHmmA" ; format="hh:mm a" return "02:30 pm"
 */
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

export function addDays(date, days) {
    let newDate = new Date(date)
    newDate.setDate(date.getDate() + days)
    return newDate
}

export function convertStartEnd(start, end) {

    let startDate = moment(start).format("yyyy.MM.DD")
    let startWD = new Date(start).toLocaleDateString('ko-KR', { weekday: 'short' })
    let startTime = moment(start).format("HH:mm")
    let endTime = moment(end).format("HH:mm")

    return startDate + "." + startWD + " " + startTime + " ~ " + endTime
}

