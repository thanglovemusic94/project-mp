import {useEffect, useState} from "react";
import {CircleCloseIcon} from "../../assets/svgs/Icons";
import InputForm from "../datetimes/InputForm";

function AttachFile({label, labelBtn, uploadFile, fileName, accept}) {

    const [fName, setFName] = useState(fileName)

    useEffect(() => {
        setFName(fileName);
    }, [fileName]);

    const removeAttacedFile = () => {
        setFName("")
        uploadFile("")
    }

    const handleChange = (e) => {
        let file = e.target.files[0]
        if (file) {
            setFName(file.name)
            uploadFile(file)
        }

        e.target.value = null
    }

    return (
        <>
            <InputForm
                render={
                    <>

                        <div className="row gx-0">
                            <div
                                className={`col-4 border border-blue-300 text-center me-2 ${fName ? `company__construction--active` : `text-blue-300 `}`}>
                                <label
                                    htmlFor="file-upload"
                                    className="btn-upload d-block p-7px "
                                >
                                    {labelBtn}
                                </label>
                                <input
                                    id="file-upload"
                                    type="file"
                                    hidden={true}
                                    onChange={handleChange}
                                    accept={accept}
                                />
                            </div>


                            {fName &&
                            <div className={'position-relative col-6'}>
                                <div
                                    style={{textOverflow: "ellipsis", whiteSpace: "nowrap"}}
                                    className={`overflow-hidden border border-black-300 px-20px py-7px text-center text-black-400`}>
                                   {fileName}
                                </div>

                                <CircleCloseIcon
                                    className="position-absolute bg-white rounded-circle ove"
                                    style={{right: "-8px", top: "-8px"}}
                                    onClick={removeAttacedFile}
                                />

                            </div>
                            }

                        </div>
                    </>
                }
                name={'contact'}
                label={label}
            />

        </>
    );
}

export default AttachFile;
