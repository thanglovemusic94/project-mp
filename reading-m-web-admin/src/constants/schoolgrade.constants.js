export const schoolgrade = {
    G1: "초등학교 1학년",
    G2: "초등학교 2학년",
    G3: "초등학교 3학년",
    G4: "초등학교 4학년",
    G5: "초등학교 5학년",
    G6: "초등학교 6학년",
    G7: "중학교 1학년",
    G8: "중학교 2학년",
    G9: "중학교 3학년"
}

//ex: 초등학교 1학년, 초등학교 2학년
export const graderSelect = (grades: any) =>{
    let str = '';
    if (grades.length > 0 && grades instanceof Array) {
        grades.map((v, i) => {
            if (i > 0) str += ' , ' + checkGrader(v);
            else str += checkGrader(v)
        })
    }
    return str;
}

/**
 * @param grades
 * @returns {*}
 * @example G1 => 초등학교 1학년
 */
export const checkGrader = (grades: string) =>{
    if (schoolgrade.hasOwnProperty(grades))
    return schoolgrade[grades];
}


