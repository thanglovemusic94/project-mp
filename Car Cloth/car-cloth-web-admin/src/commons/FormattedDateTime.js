const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

export default function FormattedDateTime({ source, format, isTimeZone }) {
    if(source != null){
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

        return formattedString;
    }
    return '-';
}

export function convertTZ(date, tzString) {
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
}
