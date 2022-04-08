import { CButton } from "@coreui/react";
import { useRef, useState } from "react";
import IconRemoveCommon from "../../commons/IconRemoveCommon";
import PopupCommon from "../../commons/PopupCommon";

import { TYPE_IMAGE } from "../../constants/TypeContaint";

const BannerUpload = ({
    urlImage,
    index,
    data,
    setData,
    arrFile,
    setArrFiles
}) => {

    const [size, setSize] = useState("000 x 000")
    const [urlImg, setUrlImg] = useState(urlImage)
    const inputRef = useRef();
    const [showError, setShowError] = useState(false)
    const [content, setContent] = useState("")
    const handleUpload = (e) => {
        inputRef.current?.click();

    };
    const handleDisplayFileDetails = () => {
        const files = inputRef.current?.files
        if (TYPE_IMAGE.indexOf(files[0].type) !== -1) {
            if (files.length > 0) {
                arrFile[index] = files[0]
                setArrFiles(arrFile)
                setData([...data])
            }

        } else {
            setContent(".jpg, .jpeg, .png확장자만 등록 가능합니다.")
            setShowError(true)
        }

        inputRef.current.value = ""
    };

    const onImgLoad = (e) => {
        const { naturalHeight, naturalWidth } = e.target
        setSize(naturalWidth + " x " + naturalHeight)
    }

    const handleCloseImage = () => {
        setUrlImg(null)
        arrFile[index] = null
        setArrFiles(arrFile)
        data[index]['imgChanged'] = true
        setData([...data])
        setSize("000 x 000")
    };


    return (
        <>
            <div className={'d-flex flex-wrap align-items-center mt-4'}>
                <CButton
                    className={'btn btn-dark me-4'}
                    onClick={handleUpload}
                >
                    파일 첨부
                </CButton>

                <span> * {size} 크기 이미지 파일</span>

            </div>
            <label htmlFor="file-upload">
                <input id="file-upload" type="file"
                    className="d-none"
                    ref={inputRef}
                    onChange={handleDisplayFileDetails}
                    accept=".jpg,.jpeg,.png"
                />
            </label>
            {
                (urlImg && urlImg.trim().length > 0) ?
                    <>
                        <div className={'bg-dark w-100 border-secondary position-relative'}
                            style={{ height: "20vh" }}>
                            <img className="w-100 h-100" src={urlImg ? urlImg : URL.createObjectURL(arrFile[index])}
                                onLoad={(e) => onImgLoad(e)}
                                alt="" />
                            <div className={'position-absolute top-0 end-0 mt-2 me-3 '}>
                                <IconRemoveCommon handler={handleCloseImage} />
                            </div>
                        </div>
                    </>
                    :
                    <>
                        {
                            arrFile[index] &&
                            <div className={'bg-dark w-100 border-secondary  position-relative'}
                                style={{ height: "20vh" }}>
                                <img className="w-100 h-100"
                                    onLoad={(e) => onImgLoad(e)}
                                    src={URL.createObjectURL(arrFile[index])} alt="" />
                                <div className={'position-absolute top-0 end-0 mt-2 me-3 '}>
                                    <IconRemoveCommon handler={handleCloseImage} />
                                </div>
                            </div>
                        }
                    </>
            }
            <PopupCommon
                show={showError}
                setShow={setShowError}
                content={content}
            />
        </>
    )
}

export default BannerUpload
