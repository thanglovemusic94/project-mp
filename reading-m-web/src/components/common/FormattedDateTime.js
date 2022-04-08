
export default function FormattedDateTime({ source, format }) {
    let sourceDate = new Date(source);
    let formattedString = `${format}`;

    formattedString = formattedString.replace("YYYY", sourceDate.getFullYear());
    formattedString = formattedString.replace("MM", `${sourceDate.getMonth() + 1}`.padStart(2, "0"));
    formattedString = formattedString.replace("DD", `${sourceDate.getDate()}`.padStart(2, "0"));

    return formattedString;
}