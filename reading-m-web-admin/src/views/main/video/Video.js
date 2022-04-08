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
    CInvalidFeedback,
    CForm
} from '@coreui/react';
import { trackPromise } from 'react-promise-tracker'
import { VideoSerivce } from 'src/services/VideoService';

export default function Video() {
    const [videoUrl, setVideoUrl] = useState("")

    const [showPopup, setshowPopup] = useState(false)

    const [validated, setValidated] = useState(false)

    useEffect(() => {

        trackPromise(
            VideoSerivce.getSavedURL().then((resp) => {

                if (resp.status === 200) {
                    const { configValue } = resp.data;

                    setVideoUrl(configValue);
                }
            })
        )
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();

        const form = event.currentTarget;

        if (form.checkValidity() === true) {

            trackPromise(
                VideoSerivce.saveURL(videoUrl).then((resp) => {
                    
                    if (resp.status === 200) {
                        
                        setshowPopup(true);
                    }
                })
            )
        }

        setValidated(true);
    }

    return (
        <>
            <h2 className="mb-4">동영상 등록</h2>
            <CCard>
                <CCardBody>
                    <CForm wasValidated={validated} onSubmit={handleSubmit} noValidate>

                        <div className="d-flex justify-content-end">
                            <p className="text-danger">
                                * 표시된 영역은 필수 입력 영역 입니다.
                            </p>
                        </div>

                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    <td className="td203">
                                        <span className="text-danger mr-1"></span>{' '}
                                        동영상 URL
                                    </td>
                                    <td>
                                        <CInput
                                            name="videoUrl"
                                            type="search"
                                            className="col-6"
                                            placeholder="https://www.youtube.com/"
                                            onChange={ (e) => setVideoUrl(e.target.value) }
                                            value={videoUrl}
                                            required 
                                        />
                                        <CInvalidFeedback>
                                            <span>
                                                필수 사항을 입력해주세요.
                                            </span>
                                        </CInvalidFeedback>
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
                show={showPopup}
                onClose={() => setshowPopup(!showPopup)}
                centered
                size="sm"
            >
                <CModalBody className="text-center">
                    <p>저장되었습니다</p>
                    <CButton
                        color="dark"
                        onClick={() => setshowPopup(!showPopup)}
                    >
                        확인
                    </CButton>
                </CModalBody>
            </CModal>
        </>
    )
}
