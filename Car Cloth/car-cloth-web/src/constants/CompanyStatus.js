export const CompanyStatus = {
    WAITING: "WAITING",
    REJECT: "REJECT",
    APPROVE: "APPROVE"
}

export function checkIsCompany(memberInfo) {
    if (memberInfo.companyId > 0 && memberInfo.registeredCompany === true && memberInfo.companyStatus === CompanyStatus.APPROVE ){ //memberInfo.expired
        return true;
    }else return false;
}
