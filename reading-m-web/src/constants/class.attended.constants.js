export function convertAttend(present, time) {
    
    if (present === null && Date.parse(time) > new Date()) 
        return { attend: "출석 전", color: "g500", icon: "before" }

    if (present === true) 
        return { attend: "출석 완료", color: "m500", icon: "complete" }

    return { attend: "결석", color: "red", icon: "absent" }
}