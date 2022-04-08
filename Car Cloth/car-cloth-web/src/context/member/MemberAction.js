import MemberService from "../../services/MemberService";
import {MEMBER_ACTION} from "./MemberActionType";

export const getMemberInfor = async (dispatch)  => {
    try {
        const res = await MemberService.getMemberInfo();
        dispatch({
            type: MEMBER_ACTION.GET_MEMBER,
            payload: res.data
        })
        return Promise.resolve(res.data);
    } catch (e) {
        return Promise.reject(e)
    }
}
