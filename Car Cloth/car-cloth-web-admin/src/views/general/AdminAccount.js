import {useEffect, useState} from "react";
import {handleChange} from "../../utils/StateUtils";
import {LocalStorageManager} from "../../managers/LocalStorageManager";
import PopupCommon from "../../commons/PopupCommon";
import AdminService from "../../services/AdminService";
import { CFormInput } from "@coreui/react";

const AdminAccount = () => {

    const [data, setData] = useState({newPassword: null})
    const [showRequired, setShowRequired] = useState(false)
    const [showSave, setShowSave] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault()
        const form = event.currentTarget
        //check password
        if (!data.newPassword || data.newPassword.trim().length === 0) {
            setShowRequired(!showRequired)
            return
        }
        if (form.checkValidity() === false) {
            event.stopPropagation()
            setShowRequired(!showRequired)
            // form.classList.add('was-validated')
        } else {
            AdminService.changePassWord(data).then((res) =>{
                LocalStorageManager.removeUserToken()
                setShowSave(!showSave)
            })
        }
    }

    useEffect(() => {
        AdminService.getPassword().then((res) =>{
            setData({newPassword: res.data})
        })
    },[])

    return (
        <>
            <div className="container mt-5">
                <div className={'d-flex justify-content-start align-items-center'}>
                    <form className={'w-50'}
                          noValidate
                          onSubmit={handleSubmit}
                    >
                        <div className="mb-3 row">
                            <label htmlFor="id" className="col-3 form-label">관리자 아이디</label>
                            <div className={'col-9'}>
                                {LocalStorageManager.getPayloadToken()?.name}
                            </div>
                            {/*<div className="invalid-feedback"> Please choose a Id. </div>*/}
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="newPassword" className="col-3 form-label">관리자 비밀번호</label>
                            <div className={'col-9'}>
                            <CFormInput
                                    className="form-control" id="newPassword"
                                    type="text"
                                    name="newPassword"
                                    onChange={e => handleChange(e, data, setData)}
                                    value={data.newPassword}
                                    required
                                />
                                {/* <input type="text" className="form-control" id="newPassword"
                                       onChange={e => handleChange(e, data, setData)}
                                       name={'newPassword'}
                                       required
                                       value={data.newPassword}/> */}
                            </div>
                        </div>

                        <div className={'text-center'}>
                            <button type="submit" className="btn btn-dark">저장</button>
                        </div>
                    </form>
                </div>
            </div>
            <PopupCommon show={showRequired} setShow={setShowRequired}/>
            <PopupCommon
                type={'YES'}
                show={showSave}
                setShow={setShowSave}
                onClickYes={() => window.location.reload()}
            />
        </>
    )
}

export default AdminAccount
