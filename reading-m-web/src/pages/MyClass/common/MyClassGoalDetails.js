import React, { useEffect, useState } from 'react'
import { Button, Dropdown, Form } from 'react-bootstrap'
import { ClassService } from 'services/ClassService'
import { convertGoalClassCategory } from 'constants/goal.class.category.constants'
import { convertClassType } from 'constants/class.constants'
import { getRole, UserRole } from 'constants/role.constants'
import { classDateFormat } from "../../../constants/datetime.constants";
import { Link } from "react-router-dom";
import { StorageService } from 'services/StorageService'

const MyClassGoalDetails = (props) => {
    const { classInfo } = props.location.state
    const role = getRole().value

    const [data, setData] = useState({
        "classId": "",
        "classCategory": "",
        "classType": "",
        "className": "",
        "tutorName": "",
        "tutorImage": "",
        "notification": "",
        "curIndex": "",
        "curName": "",
        "content": "",
        "material": "",
        "start": "",
        "end": "",
        "cmAttachFiles": [],
        "attachFiles": [],
        "myAttachFiles": []
    })

    useEffect(() => {
        ClassService.getLiveGoalCurriculum(classInfo.classId, classInfo.curriculumIndex)
            .then((resp) => {
                if (resp.status === 200) {
                    setData(resp.data)
                }
            }).catch((err) => {
                console.error(err)
            })
    }, [])

    const uploadFile = (e) => {
        if (e.target.value === "") {
            return
        }
        let file = e.target.files[0];
        ClassService.addAttachedFile(classInfo.classId, classInfo.curriculumIndex, file.name)
            .then((resp) => {
                if (resp.status === 200) {
                    data.myAttachFiles?.push(resp.data)
                    setData({ ...data })
                    // push to S3
                    StorageService.upload(resp.data.url, e.target.value).then(() => {
                        let files = data.myAttachFiles?.push(resp.data)
                        setData({ ...data, myAttachFiles: files })
                    }).catch((err) => {
                        console.error(err)
                    })
                }
            }).catch((err) => {
                console.error(err)
            })
    }

    const removeMyAttacedFile = (file) => {
        ClassService.deleteAttachedFile(classInfo.classId, classInfo.curriculumIndex, file)
            .then((resp) => {
                if (resp.status === 200) {
                    let files = data.myAttachFiles
                        ?.filter(function (f) {
                            return !(f.url === file.url &&
                                f.fileName === file.fileName)
                        })

                    setData({ ...data, myAttachFiles: files })
                }
            }).catch((err) => {
                console.error(err)
            })
    }

    return (
        <>
            <section className="myclassdetails-section">
                <div className="myclassdetails-box myclassgoal mb-3">
                    <div className="myclassdetails-header b400">
                        <div className="myclassdetails-header-top">
                            <h3 className="d-flex">
                                <span className="goal-category">
                                    {convertGoalClassCategory(data.classCategory)}
                                </span>
                                <span className="mt-auto mb-auto">
                                    [{convertClassType(data.classType)}] {data.className}
                                </span>
                            </h3>
                            <span className="myclassdetails-teachername pd-left">
                                <span>지도교사</span>
                                <span className="name"> {data.tutorName}</span>
                                {
                                    role === UserRole.PARENT.value &&
                                    <Button
                                        variant=""
                                        className="btn-sm btn-consult d-none d-lg-inline-block"
                                        as={Link}
                                        to="/write-consult"
                                    >
                                        상담하기
                                    </Button>
                                }

                            </span>
                        </div>
                    </div>
                    <div className="myclassdetails-body">
                        <div className="d-lg-flex no-gutters">
                            <div className="col-lg-8 myclassdetails-left">
                                {
                                    data.notification &&
                                    <div className="myclassdetails-notify danger">
                                        <p className="mb-0">
                                            <i className="lcicon-notify"></i>
                                            <span className="label">공지사항</span>
                                            {data.notification}
                                        </p>
                                    </div>
                                }

                                <div className="myclassdetails-intro py-4">
                                    <p className="myclassdetails-bookname">
                                        {data.curIndex + 1}주차 <span className="divider">|</span>
                                        {data.curName}
                                    </p>
                                    <div className="d-flex">
                                        <div className="myclassdetails-avatar">
                                            <div>
                                                <img
                                                    src={data.tutorImage ? data.tutorImage : "https://www.w3schools.com/w3css/img_avatar2.png"}
                                                    alt="Tutor Avatar"
                                                />
                                                <p className="myclassdetails-teachername mt-2">
                                                    <span>지도교사</span>
                                                    <br className="d-lg-none" />
                                                    <span className="name ml-2">
                                                        {data.tutorName}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="myclassdetails-classcontent">
                                            {data.content}
                                        </div>
                                    </div>
                                    <div className="myclassdetails-materials">
                                        <i className="lcicon-pencilcolor align-bottom mr-1"></i>
                                        <span>1주차 수업준비 : {data.material}</span>
                                    </div>
                                </div>
                                {
                                    role === UserRole.STUDENT.value &&
                                    <div className="myclassdetails-uploadfile d-none d-lg-block">
                                        <Form>
                                            <div className="uploadfile-custom d-lg-flex p-2">
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <label className="uploadfile-label mr-2">
                                                        파일 첨부하기
                                                    </label>
                                                    <div className="uploadfile-button">
                                                        <label
                                                            htmlFor="file-upload"
                                                            className="btn-upload"
                                                        >
                                                            <i className="lcicon-plus-alt"></i>
                                                            파일 선택
                                                        </label>
                                                        <input
                                                            id="file-upload"
                                                            type="file"
                                                            onChange={(e) => uploadFile(e)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="my-attached-file">
                                                    {data.myAttachFiles?.map((value, index) => {
                                                        return (
                                                            <div key={index} className="uploadfile-name uploaded">
                                                                * {value.fileName}
                                                                <i className="lcicon-close-black"
                                                                    onClick={() => removeMyAttacedFile(value)}></i>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </Form>
                                    </div>
                                }
                            </div>

                            <div className="col-lg-4">
                                <div className="myclassdetails-right">
                                    <div className="myclassdetails-attachments">
                                        {
                                            data.cmAttachFiles ?
                                                <Dropdown className="form-control-dropdown mb-2">
                                                    <Dropdown.Toggle
                                                        className="w-100 btn-icon btn-outline btn-square btn-attachment"
                                                        variant="g300"
                                                    >
                                                        <i className="lcicon-folder"></i>
                                                        공통 첨부파일
                                                    </Dropdown.Toggle>
                                                    {
                                                        <Dropdown.Menu>
                                                            {data.cmAttachFiles.map((value, index) => {
                                                                return (
                                                                    <Dropdown.Item
                                                                        target="_blank"
                                                                        key={index}
                                                                        href={value.url}>
                                                                        {value.fileName}
                                                                    </Dropdown.Item>
                                                                )
                                                            })}
                                                        </Dropdown.Menu>
                                                    }
                                                </Dropdown>
                                                :
                                                <Dropdown className="form-control-dropdown mb-2 no-file d-none d-lg-block">
                                                    <Dropdown.Toggle
                                                        id="dropdown"
                                                        className="w-100 btn-icon btn-outline btn-square btn-attachment"
                                                        variant="g300"
                                                    >
                                                        <i className="lcicon-folder"></i>
                                                        공통 첨부파일
                                                    </Dropdown.Toggle>
                                                </Dropdown>
                                        }
                                        {
                                            data.attachFiles ?
                                                <Dropdown className="form-control-dropdown mb-2">
                                                    <Dropdown.Toggle
                                                        className="w-100 btn-icon btn-outline btn-square btn-attachment"
                                                        variant="g300"
                                                    >
                                                        <i className="lcicon-folder"></i>
                                                        첨부파일
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        {data.attachFiles?.map((value, index) => {
                                                            return (
                                                                <Dropdown.Item
                                                                    target="_blank"
                                                                    key={index}
                                                                    href={value.url}>
                                                                    {value.fileName}
                                                                </Dropdown.Item>
                                                            )
                                                        })}
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                                :
                                                <Dropdown className="form-control-dropdown mb-2 no-file d-none d-lg-block">
                                                    <Dropdown.Toggle
                                                        className="w-100 btn-icon btn-outline btn-square btn-attachment"
                                                        variant="g300"
                                                    >
                                                        <i className="lcicon-folder"></i>
                                                        첨부파일
                                                    </Dropdown.Toggle>
                                                </Dropdown>
                                        }

                                        {
                                            role === UserRole.STUDENT.value &&
                                            <div className="myclassdetails-uploadfile-mobile d-block d-lg-none">
                                                <div className="myclassdetails-uploadfile">
                                                    <Form>
                                                        <div className="uploadfile-custom d-lg-flex">
                                                            <div className="d-flex align-items-center justify-content-between">
                                                                <label className="uploadfile-label mr-2">
                                                                    파일 첨부하기
                                                                </label>
                                                                <div className="uploadfile-button">
                                                                    <label
                                                                        htmlFor="file-upload"
                                                                        className="btn-upload"
                                                                    >
                                                                        <i className="lcicon-plus-alt"></i>
                                                                        파일 선택
                                                                    </label>
                                                                    <input
                                                                        id="file-upload"
                                                                        type="file"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="uploadfile-name uploaded">
                                                                * 1개의 파일만 첨부가
                                                                가능합니다.
                                                                <i className="lcicon-close-black"></i>
                                                            </div>
                                                        </div>
                                                    </Form>
                                                </div>
                                            </div>
                                        }

                                        <div className="text-center my-3 icon-attend d-none d-lg-block">
                                            <i className={`lcicon-attend ${classInfo.icon}`}></i>
                                        </div>
                                        <div className="text-center icon-attend d-block d-lg-none">
                                            <i className={`lcicon-attend-mobile ${classInfo.icon}`}></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="myclassdetails-footer">
                        <div className="d-lg-flex myclassdetails-footer-top b100">
                            <div className="liveclass-title">
                                <div className="d-lg-flex">
                                    <h4 className="mb-2">Live 교실 </h4>
                                    <div className="liveclass-info">
                                        <p className="font-weight-bold mb-1">
                                            {data.curIndex + 1}일차 {data.curName}
                                        </p>
                                        <p className="liveclass-time">
                                            수업일시 :
                                            {
                                                //convertStartEnd(data.start, data.end)
                                                classDateFormat(new Date(data.start), new Date(data.end))
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {
                                role === UserRole.STUDENT.value &&
                                <div>
                                    <Button
                                        variant="b500"
                                        className="btw-372 d-lg-block d-none"
                                    >
                                        Live 교실 입장하기
                                    </Button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default MyClassGoalDetails
