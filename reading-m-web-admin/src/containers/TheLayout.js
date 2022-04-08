import React from 'react'
import Error from 'src/components/common/Error'
import SLoading from 'src/components/common/SLoading'
import { TheContent, TheSidebar, TheHeader } from './index'

const TheLayout = () => {
    return (
        <div className="c-app c-default-layout">
            <TheSidebar />
            <div className="c-wrapper">
                <TheHeader />
                <Error/>
                <div className="c-body">
                    <TheContent />
                </div>
                <SLoading/>
                {/* <TheFooter /> */}
            </div>
        </div>
    )
}

export default TheLayout
