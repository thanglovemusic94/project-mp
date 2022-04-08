export function constructAbsoluteURL(relativePath) {
    return `${window.location.origin.toString()}${relativePath}`
}