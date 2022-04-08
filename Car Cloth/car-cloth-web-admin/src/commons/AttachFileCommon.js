import IconRemoveCommon from "./IconRemoveCommon";
import {CButton} from "@coreui/react";
import {useRef, useState} from "react";
import {TYPE_IMAGE} from "../constants/TypeContaint";
import PopupCommon from "./PopupCommon";

const AttachFileCommon = ({data, file, setFile, accept}) => {
    const inputRef = useRef();
    const [isCloseFile, setIsCloseFile] = useState(false)
    const [showError, setShowError] = useState(false)
    const [content, setContent] = useState("")

    const handleUpload = () => {
        inputRef.current?.click();
    };

    const handleCloseImage = () => {
        setFile(null)
        setIsCloseFile(true)
        // setErrorFile(true)
    };

    const handleDisplayFileDetails = () => {
        const files = inputRef.current?.files
        if (TYPE_IMAGE.indexOf(files[0].type) !== -1) {
            if(files.length > 0) {
                setFile(files[0])
                setIsCloseFile(false)
            }
        } else {
            setContent(".jpg, .jpeg, .png확장자만 등록 가능합니다.")
            setShowError(true)
        }

        inputRef.current.value = ""
    };


    return (
        <div className={'d-flex flex-wrap align-items-center'}>
            <div className={'me-4'}>
                <CButton
                    className={'btn btn-dark  my-1 '}
                    onClick={() => handleUpload()}
                >
                    파일 첨부
                </CButton>
            </div>
            {
                file ?
                    <div className={'d-flex flex-wrap align-items-center'}>
                             <span style={{"textOverflow": "ellipsis"}}
                                   className={' me-2 overflow-hidden'}>
                                 {file.name}
                             </span>
                        <div><IconRemoveCommon handler={handleCloseImage}/></div>
                    </div>
                    :
                    isCloseFile ?
                        <></>
                        :
                        data.attachFile.fileName ?
                            <div className={'d-flex flex-wrap align-items-center'}>
                             <span style={{"textOverflow": "ellipsis"}}
                                   className={' me-2 overflow-hidden'}>
                                 {data.attachFile.fileName}
                             </span>
                                <div><IconRemoveCommon handler={handleCloseImage}/></div>
                            </div>
                            :
                            <></>
            }

            <label htmlFor="file-upload">
                <input id="file-upload" type="file"
                       className="d-none"
                       ref={inputRef}
                       accept={accept}
                       onChange={handleDisplayFileDetails}
                />
            </label>

            <PopupCommon
                show={showError}
                setShow={setShowError}
                content={content}
            />
        </div>
    )
}

export default AttachFileCommon
