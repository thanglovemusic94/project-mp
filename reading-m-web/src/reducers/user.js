import {LoginService} from "../services/LoginService";

// const res =  LoginService.getProfile().then((res) => {
//     return Promise.resolve(res.data)
// }).catch(e => Promise.reject(e));

const initUser = null;
const userReducer = (user = initUser, action) => {
    const {type, payload} = action;

    switch (type) {
        case 'GET_USER': {
            return payload;
        }
        case 'SET_USER': {
            return payload
        }
        default:{
            return user;
        }
    }
}

export default userReducer;
