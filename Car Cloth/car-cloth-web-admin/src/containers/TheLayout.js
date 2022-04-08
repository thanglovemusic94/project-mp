import { useEffect, useState } from "react";
import NavigationBar from "./NavigationBar";
import Sidebar from "./Sidebar";
import TheContent from "./TheContent";
import TheHeader from "./TheHeader";
import '../scss/containers/TheLayout.scss';
import {useLocation} from "react-router";
import {NavItemHeaderConstant} from "../constants/NavItemHeaderConstant";

function TheLayout() {
    const [selectedSection, setSelectedSection] = useState(-1);
    const url = useLocation().pathname;
    useEffect(() => {
        NavItemHeaderConstant.map((value, index) => {
            if (value.route === url || url.indexOf(value.route) !== -1){
                setSelectedSection(index)
            }
            // let navPos = SessionStorageManager.loadNavPosition();
            // if (navPos !== null) {
            //     setSelectedSection(navPos);
            // }
            return value
        })
        /**
         * url not exit router => logic
         */
    }, [url])

    return (
        <div className="wrapper">
            <TheHeader />
            <NavigationBar selectedIndex={selectedSection} onSelected={setSelectedSection} />

            <div className="d-flex " >
                <Sidebar section={selectedSection} />
                <TheContent onSelected={setSelectedSection}/>
            </div>
        </div>
    );
}

export default TheLayout;
