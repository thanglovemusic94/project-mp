import RemovableItem from 'components/common/RemovableItem'
import React, {useRef, useState} from 'react'
import {Button, Form} from 'react-bootstrap'

const ClassMaterial = ({onDataChange, onFinish}) => {
    const NUMBER_OF_ATTACHMENTS_MAX = 3
    const FILE_FORMATS = ['application/pdf', 'application/vnd.ms-powerpoint', "image/png", "image/jpeg"]

    const [selectedFiles, setSelectedFiles] = useState([])
    const [errors, setErrors] = useState({});
    const inputRef = useRef();
    const handleUpload = () => {
        inputRef.current?.click();

    };

    const checkValidate = (fileList) => {
        if (fileList.length === 0) {
            setErrors({...errors, req: true, size: false})
            return false
        } else if (fileList.length > NUMBER_OF_ATTACHMENTS_MAX) {
            setErrors({...errors, req: false, size: true})
            return false
        } else {
            setErrors({...errors, req: false, size: false})
            return true
        }
        // if(fileList.filter(v => FILE_FORMATS.indexOf(v.type) === -1)){}
        // else{}
    }

    const handleDisplayFileDetails = () => {
        let fileList = inputRef.current?.files
        let items = []
        for (let file of fileList) {
            items.push(file)
        }
        if (items.length > 0) {
            setSelectedFiles([...items])
            checkValidate(items)
        }

        console.log(fileList)
    };

    function handleAttachmentRemove(index) {
        let items = [...selectedFiles]
        items.splice(index, 1)
        setSelectedFiles([...items])
        checkValidate(items)
    }

    function handleFinish() {
        checkValidate(selectedFiles)
        if (checkValidate(selectedFiles)) {
            onDataChange({"files": selectedFiles})
            onFinish()
        }
    }


    return (
        <>
            <div className="class-material-section">
                <section className="box-section">
                    <div className="box-w612">
                        <div className="box-label">LiveClass 목적 지도교사</div>
                        <div className="box-title">
                            <h3>수업자료 샘플</h3>
                            <p className="mb-0 font-18">
                                포트폴리오나 수업계획서 등 참고 자료를 업로드 해주세요.
                            </p>
                            <p className="text-g500">
                                수업 콘텐츠의 모든 저작권은 선생님께 있으며, 저희는 수업 개설을
                                위해 자료를 검토하는 목적으로만 활용합니다. 첨부 파일은 최대
                                3개까지 등록이 가능합니다.
                            </p>
                            <p className="text-danger">*수업자료 샘플은 필수사항입니다.</p>
                        </div>

                        <Form className="was-validated">
                            <div className="d-md-flex align-items-center">
                                <Form.Label className="mr-5">
                                    첨부파일 <span className="text-danger">*</span>
                                </Form.Label>

                                <input
                                    ref={inputRef}
                                    onChange={handleDisplayFileDetails}
                                    className="d-none"
                                    type="file"
                                    multiple
                                />

                                <Button
                                    onClick={handleUpload}
                                    variant="g700"
                                    className="btn-add btn-square btw-184"
                                >
                                    <i className="lcicon-plus-alt"></i>
                                    파일 선택
                                </Button>
                                <div className="ml-5">
                                    {
                                        errors.req &&
                                        <Form.Control.Feedback type="invalid" className={'d-block'}>
                                            파일을 업로드 해주세요.
                                        </Form.Control.Feedback>
                                    }

                                    {
                                        errors.size &&
                                        <Form.Control.Feedback type="invalid" className={'d-block'}>
                                            파일은 최대 3개까지 등록이 가능합니다.
                                        </Form.Control.Feedback>
                                    }

                                </div>
                            </div>
                            <Form.Group className="d-md-flex"></Form.Group>
                        </Form>

                        {
                            (errors.req === false) &&
                            <div className="datetime-list">
                                <ul className="reset-list">
                                    {
                                        selectedFiles.map((item, index) => {
                                            return (
                                                <li key={index}>
                                                    <RemovableItem source={item.name} onDelete={() =>
                                                        handleAttachmentRemove(index)
                                                    }></RemovableItem>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        }

                    </div>
                </section>
                <div className="text-center">
                    <Button variant="p500" className="btw-386 mt-5" onClick={handleFinish}>
                        지원하기
                    </Button>
                </div>
            </div>
        </>
    )
}

export default ClassMaterial
