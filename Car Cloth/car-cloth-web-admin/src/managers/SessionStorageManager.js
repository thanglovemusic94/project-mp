
export const SessionStorageManager = {
    saveNavPosition,
    loadNavPosition,
}

const NAVSSKEY = 'nav'

function saveNavPosition(value) {
    sessionStorage.setItem(NAVSSKEY, value);
}

function loadNavPosition() {
    let savedNav = sessionStorage.getItem(NAVSSKEY);

    if (savedNav !== null) {
        return parseInt(savedNav);
    }

    return null;
}


