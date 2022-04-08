
const SS_BOTTOM_NAV_KEY = 'ssbottomNavKey';
const MEMBER_INFO_KEY = 'MEMBER_INFO_KEY';

export const SessionStorageManager = {
    saveBottomNav,
    getBottomNav,
    saveMemberInfo,
    getMemberInfo
}

function saveBottomNav(value) {

    sessionStorage.setItem(SS_BOTTOM_NAV_KEY, value);
}

function getBottomNav() {

    const data = sessionStorage.getItem(SS_BOTTOM_NAV_KEY);

    return parseInt(data);
}

function saveMemberInfo(data) {
    sessionStorage.setItem(MEMBER_INFO_KEY, JSON.stringify(data));
}

function getMemberInfo() {
    const data = sessionStorage.getItem(MEMBER_INFO_KEY)
    return  JSON.parse(data);
}
