import {LiveClassType} from "./class.constants";

export function checkStatusLiveClass(str) {
    if (str === LiveClassType.LiveClassBook.value) {
        return LiveClassType.LiveClassBook.label;
    } else if (str === LiveClassType.LiveClassGoal.value) {
        return LiveClassType.LiveClassGoal.label;
    } else if (str === LiveClassType.Mathematics.value) {
        return LiveClassType.Mathematics.label;
    }else return '모든 수업'
}

export function checkStatusCoupon(str) {
    if (str === LiveClassType.LiveClassBook.value) {
        return LiveClassType.LiveClassBook.label + '할인 쿠폰';
    } else if (str === LiveClassType.LiveClassGoal.value) {
        return LiveClassType.LiveClassGoal.label +'할인 쿠폰';
    } else if (str === LiveClassType.Mathematics.value) {
        return LiveClassType.Mathematics.label +'할인 쿠폰';
    }else return '무제한 할인 쿠폰'
}
