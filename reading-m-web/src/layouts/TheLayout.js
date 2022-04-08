import React, { useEffect, useState } from 'react'
import TheHeader from './TheHeader'
import TheBody from './TheBody'
import TheFooter from './TheFooter'
import LocalNavBar from '../components/LocalNavBar'
import { AppContext } from 'contexts/AppContext'
import { UserStorage } from 'storages/UserStorage'
import { useDispatch } from 'react-redux'
import { getUserDetails } from '../action/user'

export default function TheLayout() {
    const [isLogined, setIsLogined] = useState(UserStorage.hasUserLocal())
    const dispatch = useDispatch()
    useEffect(() => {
        if (isLogined) dispatch(getUserDetails())
    }, [isLogined])
    return (
        <AppContext.Provider value={{ isLogined, setIsLogined }}>
            <div className="lc-main">
                <TheHeader />
                <LocalNavBar />
                <TheBody />
                <TheFooter />
            </div>
        </AppContext.Provider>
    )
}
