import {UserStorage} from "../storages/UserStorage";

export const UserRole = {
    TUTOR: {
        value: "TUTOR",
        label: "지도교사",
    },

    ADMIN: {
        value: "ADMIN",
        label: ""
    },

    STUDENT: {
        value: "STUDENT",
        label: "학생",
    },

    PARENT: {
        value: "PARENT",
        label: "학부모",
    },

    "": {
        value: "",
        label: "전체",
    },
}

export const getRole = () => {
    let strRole = UserStorage.getLocalUserRole();
    if(!strRole)
        return UserRole[""]

    const enums = Object.keys(UserRole)
    for(let i = 0; i < enums.length; i++) {
        const value = UserRole[enums[i]]

        if(enums[i] === strRole) {
            return value
        }
    }
}

export const checkClassTagRole = function (roleCheck, ...classNames){
    if (roleCheck === "STUDENT") return classNames[0];
    else if (roleCheck === "PARENT") return classNames[1];
    else if (roleCheck === "TUTOR") return classNames[2];
    else  return 'd-none';
}

export const checkURLRole = function (roleCheck, ...urls){
    if (roleCheck === "STUDENT") return urls[0];
    else if (roleCheck === "PARENT") return urls[1];
    else if (roleCheck === "TUTOR") return urls[2];
    else  return '/';
}



