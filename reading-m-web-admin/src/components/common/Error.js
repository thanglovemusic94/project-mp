import { useDispatch, useSelector } from "react-redux";
import { CLOSE_ERROR_POPUP } from "../../constants/action.type.constants";

export default function Error() {

    const { show, contents } = useSelector(state => state.error)

    const dispatch = useDispatch()

    function handleClose() {
        dispatch({ type: CLOSE_ERROR_POPUP })
    }

    return (
        <CustomAlert color="danger" show={show} contents={contents} handleClose={handleClose}/>
    )
}

function CustomAlert({show, contents, handleClose }) {
    if (show) {
        return <>
            <div className={`alert alert-danger alert-dismissible`} role="alert">
                <span>{contents}</span>
                <button className="close" aria-label="Close" onClick={handleClose}>×</button>
            </div>
        </>
    }
    return null
}
