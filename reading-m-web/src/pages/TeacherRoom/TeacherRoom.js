import React from 'react'
import {getRole} from "../../constants/role.constants";
import ParentTeacherRoom from "./ParentTeacherRoom";
import TutorTeacherRoom from "./TutorTeacherRoom";

export default function TeacherRoom() {
    const roleName = getRole().value;
    return (
        <div className="myprofile-body">
            {roleName === 'PARENT' && <ParentTeacherRoom/>}
            {roleName === 'TUTOR' && <TutorTeacherRoom/>}
        </div>
    )
}
