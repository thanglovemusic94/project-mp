import {CCard, CCardBody, CCardHeader, CCardText} from "@coreui/react";

export function DashboardInfoCard({ title, content }) {

    return (
        <CCard className="text-center">
            <CCardHeader className={'fw-bold'}>{title}</CCardHeader>
            <CCardBody>
                <CCardText className={'my-4 fw-bold'}>
                    {content}
                </CCardText>
            </CCardBody>
        </CCard>
    );
}
