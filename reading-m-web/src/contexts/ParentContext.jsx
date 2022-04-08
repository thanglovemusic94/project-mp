import React, {useEffect, useState} from "react";
import {UserStorage} from "../storages/UserStorage";
import {LoginService} from "../services/LoginService";

export const ProfileContext = React.createContext();

export const ProfileProvider = (props) => {
    const userId = UserStorage.getLocalUserId()
    const [user, setUser] = useState(null)

    const getUserDetail = () => {
        LoginService.getUserDetail(userId)
            .then((res) => {
                setUser(res.data)
            })
            .catch((e) => console.log(e))
    }

    useEffect(() => {
            getUserDetail()
    }, []);

    return (
        <>
            {
                user &&
                <ProfileContext.Provider value={{
                    user: user,
                    setUser: setUser,
                }}
                >
                    {props.children}
                </ProfileContext.Provider>
            }
        </>
    );
}
