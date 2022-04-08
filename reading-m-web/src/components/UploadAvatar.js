import React, {useEffect, useState} from 'react'
import {Button, Modal} from "react-bootstrap";

export default function UploadAvatar({file, setFile, checkEmptyFile, setCheckEmptyFile, urlImage}) {

    const [uploadPhoto, setUploadPhoto] = useState(false)
    const [urlImg, setUrlImg] = useState(urlImage)

    const SUPPORTED_FORMAT_IMAGE = [
        "image/png",
        "image/jpeg"
    ]

    const checkAcceptFile = (file) => {
        let checkSupport = SUPPORTED_FORMAT_IMAGE.filter(value => value === file.type);
        if (checkSupport.length === 0) return false
    }

    const handleCloseImage = () => {
        setFile({value: null, error: true})
        setCheckEmptyFile(true)
        setUrlImg(null)
    };

    const upload = (e) => {
            if (e.target.files[0].size >20 * 1024 * 1024) {
                setUploadPhoto(true)
                setFile({...file})
            }
            else if (checkAcceptFile(e.target.files[0]) === false){
                setCheckEmptyFile(true)
                setFile({...file})
            }
            else {
                setFile({value: e.target.files[0], error: false})
                setCheckEmptyFile(false)
            }
    }

    useEffect(() => {}, [file, checkEmptyFile, urlImg])

    return (
        <>
            <div className="box-avatar text-center">
                {

                        (urlImg ?
                                <div className="avatar-image">
                                    <img src={urlImg} alt="Avatar"/>
                                    <span className="avatar-remove" onClick={handleCloseImage}>
                                        <i className="lcicon-close"></i>
                                    </span>
                                </div>
                                :
                            (
                                file.value ?
                                    <div className="avatar-image">
                                        <img src={URL.createObjectURL(file.value)} alt="Avatar"/>
                                        <span className="avatar-remove" onClick={handleCloseImage}>
                                            <i className="lcicon-close"></i>
                                        </span>
                                    </div>
                                    :
                                    <label htmlFor="file-upload" className="btn-upload">
                                        <div className="avatar-image">
                                            <i className="lcicon-upload"></i>
                                            <div>사진추가</div>
                                            <input id="file-upload" type="file" className="d-none" onChange={upload}/>
                                        </div>
                                    </label>
                            )
                        )
                }

                <div className="avatar-note text-center">
                    * 권장 사이즈는 300x300픽셀이며, <br/>
                    최대 20MB의 jpg, png 이미지 파일만 등록 가능합니다.
                </div>

                {
                    checkEmptyFile &&
                    <p className={'text-danger'}>사진을 등록해주세요.</p>
                }

            </div>

            {/* Condition modal when upload photo */}
            <Modal
                show={uploadPhoto}
                onHide={() => setUploadPhoto(false)}
                dialogClassName="modalw-386 modal-comfirm"
                centered
            >
                <Modal.Body scrollable={true}>
                    <div className="modal-body-inner">
                        <p className="mb-0 text-center">
                            이미지의 용량이 초과되었습니다..
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal-btn-half">
                    <Button variant="g700" onClick={() => setUploadPhoto(false)}>
                        확인
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
