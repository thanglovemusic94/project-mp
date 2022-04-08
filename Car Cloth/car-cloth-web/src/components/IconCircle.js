import {IconCompanyInfo} from "../assets/svgs/Icons";
import {Badge} from "react-bootstrap";

const IconCircle = ({nameIcon, render}) =>{
    switch (nameIcon) {
        case 'new':
            return (
                <>
                    <Badge bg="red" style={{width: "18px", height: "18px"}} className={'rounded-circle lh-14 py-2px px-4px5 fs-12 ms-1 '}>
                        <span className={'fw-200'}>N</span>
                    </Badge>
                </>
            )
        case 'info':
            return (
                <>
                    <Badge bg="green-300" style={{width: "18px", height: "18px"}} className={'rounded-circle d-flex align-items-center justify-content-center px-4px5 py-4px46 me-1'}>
                        <IconCompanyInfo/>
                    </Badge>
                </>
            )
        default:
            return (render)
    }
}

export default IconCircle
