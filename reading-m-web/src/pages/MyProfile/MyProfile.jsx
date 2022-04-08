import React from 'react'
import ParentProfile from "./Parent/ParentProfile";
import TutorProfile from "./Tutor/TutorProfile";
import StudentProfile from "./Student/StudentProfile";
import {getRole} from "../../constants/role.constants";

export default function MyProfile() {
    const roleName = getRole().value;
    return (
            <div className="myprofile-body">
                {roleName === 'STUDENT' && <StudentProfile/>}
                {roleName === 'PARENT' && <ParentProfile/>}
                {roleName === 'TUTOR' && <TutorProfile/>}
            </div>
    )
}
