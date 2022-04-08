const Format = {
    datetime,
    number,
    money
}

const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

function convertTZ(date, tzString) {
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));
}

function datetime(source, format, isTimeZone) {
    let sourceDate;
    if(isTimeZone) {
        sourceDate = convertTZ(source, timeZone)
    } else {
        sourceDate = new Date(source);
    }

    let formattedString = `${format}`;
    formattedString = formattedString.replace("YYYY", sourceDate.getFullYear());
    formattedString = formattedString.replace("MM", `${sourceDate.getMonth() + 1}`.padStart(2, "0"));
    formattedString = formattedString.replace("DD", `${sourceDate.getDate()}`.padStart(2, "0"));
    formattedString = formattedString.replace("hh", `${sourceDate.getHours()}`.padStart(2, "0"));
    formattedString = formattedString.replace("HH", `${sourceDate.getHours()}`.padStart(2, "0"));
    formattedString = formattedString.replace("MM", `${sourceDate.getMinutes()}`.padStart(2, "0"));
    formattedString = formattedString.replace("mm", `${sourceDate.getMinutes()}`.padStart(2, "0"));
    return formattedString
}


function money(number, unit = ' 원') {
    let str = ''
    str = str + new Intl.NumberFormat('ko-KR', {
        minimumFractionDigits: 0
    }).format(number) + unit

    return str;
}

function number(number, digits) {
    let str = ''
    str = str + new Intl.NumberFormat('ko-KR', {
        minimumFractionDigits: digits
    }).format(number)

    return str;
}


export default Format
