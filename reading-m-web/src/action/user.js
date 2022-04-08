import {LoginService} from "../services/LoginService";

export const updateUser = (data) => async (dispatch) => {
    const res = await LoginService.changeProfile(data);
    try {
        dispatch({
            type: 'SET_USER',
            payload: data,
        });
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}

export const getUserDetails = () => async (dispatch) => {
    try {
        const res = await LoginService.getProfile();
        dispatch({
            type: 'GET_USER',
            payload: res.data,
        });
    } catch (err) {
        console.log(err)
    }
}
