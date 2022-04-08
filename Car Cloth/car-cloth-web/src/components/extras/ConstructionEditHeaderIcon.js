import {EditIcon} from "../../assets/svgs/Icons";
import React from "react";
import {useHistory} from "react-router-dom";
import {CONSTRUCTION_ROUTER} from "../../constants/RouteConstants";

const ConstructionEditHeaderIcon = () =>{

    const history = useHistory()

    const moveToPageEdit = () =>{
        history.push(CONSTRUCTION_ROUTER.CONSTRUCTION_EDIT)
    }

    return (
        <div onClick={moveToPageEdit}>
            <EditIcon />
        </div>
    )
}

export default ConstructionEditHeaderIcon
