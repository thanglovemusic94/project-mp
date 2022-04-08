
export const StringUtil = {
    formatSearch
}

function formatSearch(str) {
    return str.trim().split(/ +/).join(" ")
}

