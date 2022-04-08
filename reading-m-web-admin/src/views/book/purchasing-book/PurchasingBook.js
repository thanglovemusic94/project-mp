import React, { useEffect, useState } from 'react'
import {
    CCardBody,
    CButton,
    CCard,
    CCol,
    CInput,
    CRow,
    CModal,
    CModalBody,
    CForm,
} from '@coreui/react'
import { MstConfigSerivce } from '../../../services/MstConfigService'
import { trackPromise } from 'react-promise-tracker'

const PurchasingBook = () => {
    const [openModal, setOpenModal] = useState(false)

    const [saveSucess, setSaveSuccess] = useState(false);

    const [validated, setValidated] = useState(false);

    const [bookPurchasingURL, setBookPurchasingURL] = useState('')

    const BOOK_PURCHARSING_URL_KEY = 'BookPurchasingURL'

    useEffect(() => {
        trackPromise(
            MstConfigSerivce.getByKey(BOOK_PURCHARSING_URL_KEY)
                .then(res => setBookPurchasingURL(res.data))
        )    
    }, [])

    function handleClearInput() {
        
        setBookPurchasingURL("");
    }

    async function handleSubmit(event) {
        event.preventDefault();
        event.stopPropagation();

        const form = event.target;

        if (form.checkValidity() === true) {
            let resp = await MstConfigSerivce.updateConfigByKey(BOOK_PURCHARSING_URL_KEY, bookPurchasingURL);

            if (resp.status == 200) {
                setSaveSuccess(true);
            } else {
                setSaveSuccess(false);
            }
            
            setValidated(false);  
            setOpenModal(true); 
        } else {
            setValidated(true);
        }
    }

    return (
        <>
            <h2 className="mb-4">도서 구매하러가기 등록</h2>
            <CCard>
                <CCardBody>
                    <CForm noValidate wasValidated={validated} onSubmit={handleSubmit}>
                        <div className="d-flex justify-content-end">
                            <p className="text-danger">
                                * 표시된 영역은 필수 입력 영역 입니다.
                            </p>
                        </div>

                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    <td className="td203">
                                        <span className="text-danger mr-1">*</span>
                                        도서 구매하러가기 URL
                                    </td>
                                    <td>
                                        <div className="d-flex justify-content">
                                            <CInput
                                                id="urlInput"
                                                className="col-6"
                                                value={bookPurchasingURL}
                                                onChange={e => setBookPurchasingURL(e.target.value)}
                                                required
                                            />
                                            <CButton className="mx-2" onClick={handleClearInput}>X</CButton>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <CRow className="justify-content-center mt-5">
                            <CCol md="2">
                                <CButton
                                    block
                                    color="dark"
                                    type="submit"
                                >
                                    저장
                                </CButton>
                            </CCol>
                        </CRow>
                    </CForm>
                </CCardBody>
            </CCard>
            <CModal
                show={openModal}
                onClose={() => setOpenModal(!openModal)}
                centered
                size="sm"
            >
                <CModalBody className="text-center">
                    <p>{saveSucess ? '저장되었습니다.' : '처리 중에 오류가 발생했습니다. 나중에 다시 시도하십시오.'}</p>
                    <CButton
                        color="dark"
                        onClick={() => setOpenModal(!openModal)}
                    >
                        확인
                    </CButton>
                </CModalBody>
            </CModal>
        </>
    )
}


export default PurchasingBook
