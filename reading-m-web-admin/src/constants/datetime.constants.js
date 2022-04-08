import {DateUtils} from "../utils/DateUtils";

export const DAY_OF_WEEK = [
    {"name": "월", "value": "MONDAY"},
    {"name": "화", "value": "TUESDAY"},
    {"name": "수", "value": "WEDNESDAY"},
    {"name": "목", "value": "THURSDAY"},
    {"name": "금", "value": "FRIDAY"},
    {"name": "토", "value": "SATURDAY"},
    {"name": "일", "value": "SUNDAY"}
]

export const TIME_OF_DAY = [
    {"name": "오전", "value": "AM"},
    {"name": "오후", "value": "PM"}
]

//ex: str =  YYYY.MM.DD 월 오전 1시 30분 ~ 4시 30분
export function classDateFormat(start: Date, end: Date) {
    let str = '';
    str = DateUtils.toLocalDate(start);
    str += " " + checkDayOfWeek(start.getDay()) + " " + checkAmPm(start.getHours())
        + " " + start.getHours() + "시 " + checkMinutes(start.getMinutes())
        + " ~ " + end.getHours() + "시 " + checkMinutes(end.getMinutes())
    return str;
}

//ex: 월 오전 1시 30분 ~ 4시 30분
export function hopeDateFormat(day, startHours, startMinutes, endHours, endMinutes) {
    let str = '';
    str += checkDayOfWeek(day) + " " + checkAmPm(startHours)
        + " " + startHours + "시 " + checkMinutes(startMinutes)
        + " ~ " + endHours + "시 " + checkMinutes(endMinutes)
    return str;
}

export function checkDayOfWeek(value: number | string) {
    switch (value) {
        case 1 :
        case 'MONDAY':
            return '월';
        case 2:
        case 'TUESDAY':
            return "화"
        case 3:
        case 'WEDNESDAY':
            return "수"
        case 4:
        case 'THURSDAY':
            return "목"
        case 5:
        case 'FRIDAY':
            return "금"
        case 6:
        case 'SATURDAY':
            return "토"
        case 0:
        case 'SUNDAY':
            return "일"
        default:
            return "";
    }
}

export function checkMinutes(value: number) {
    if (value === 0) return '00분'
    return value + '분';
}

export function checkAmPm(value: number) {
    if (value >= 12) return '오후';
    return '오전';
}
