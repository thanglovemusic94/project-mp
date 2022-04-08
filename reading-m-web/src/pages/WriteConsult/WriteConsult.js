import React from 'react'
import {getRole} from "../../constants/role.constants";
import TutorWriteConsult from "./TutorWriteConsult";
import ParentWriteConsult from "./ParentWriteConsult";

export default function WriteConsult() {
    const roleName = getRole().value;
    return (
        <div className="myprofile-body">
            {roleName === 'PARENT' && <ParentWriteConsult/>}
            {roleName === 'TUTOR' && <TutorWriteConsult/>}
        </div>
    )
}
