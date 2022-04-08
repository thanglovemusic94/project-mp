import { useContext } from "react";
import { AppContext } from "../App";

function NavHeaderSpacer() {
    const { isPlatformIOS } = useContext(AppContext);

    return (
        <div className={`nav-header ${isPlatformIOS.current === true ? "ios" : ""}`}></div>
    );
}

export default NavHeaderSpacer;