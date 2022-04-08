import React from 'react'
import StudentEdit from "./Student/StudentProfileEdit";
import ParentEdit from "./Parent/ParentProfileEdit";
import TutorEdit from "./Tutor/TutorProfileEdit";
import {getRole} from "../../constants/role.constants";

export default function ProfileEdit() {
    const roleName = getRole().value;
    return (
        <>
            <div className="myprofile-body">
                {roleName === 'STUDENT' && <StudentEdit/>}
                {roleName === 'PARENT' && <ParentEdit/>}
                {roleName === 'TUTOR' && <TutorEdit/>}
            </div>
        </>
    )
}
