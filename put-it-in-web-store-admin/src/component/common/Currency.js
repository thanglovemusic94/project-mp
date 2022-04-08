import React from "react";

function Currency(props) {
    const DefaultCurrency = { "local": "ko-KR", "suffix": "원" };
    var showSuffix = (props.showSuffix!=null) ? props.showSuffix : true
    var currency = '';
    if (showSuffix) {
        currency = <span>{props.amount.toLocaleString(DefaultCurrency.local, { maximumFractionDigits: 0 })}&nbsp;{(props.suffix) ? props.suffix : DefaultCurrency.suffix}</span>
    }
    else{
        currency = <span>{props.amount.toLocaleString(DefaultCurrency.local, { maximumFractionDigits: 0 })}</span>
    }
    return currency
}

export default Currency