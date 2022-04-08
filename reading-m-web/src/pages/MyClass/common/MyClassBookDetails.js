import React, { useEffect, useState } from 'react'
import { Button, Dropdown, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ClassService } from 'services/ClassService'
import DateTime from 'components/common/DateTime'
import { getRole } from 'constants/role.constants'
import { UserRole } from 'constants/role.constants'
import { classDateFormat } from 'constants/datetime.constants'
import { StorageService } from 'services/StorageService'
import ModalNotification from 'components/common/ModalNotification'

const MyClassBookDetails = (props) => {
    const { classId, curriculumIndex, studentId, icon } = props.history.location.state;
    const role = getRole().value
    const [data, setData] = useState({})
    const [btnGoTo, setbtnGoTo] = useState({ class: 'btn-g500', isDisabled: true });
    const [show1, setShow1] = useState(false);

    useEffect(() => {
        ClassService.getLiveBookCurriculum({ classId, curriculumIndex, studentId })
            .then(res => {
                if (res.status === 200) {
                    if (new Date(res.data?.end) > new Date()) {
                        setbtnGoTo({ class: 'btn-m500', isDisabled: false })
                    }

                    setData(res.data)
                }
            }).catch(err => console.log(err))
    }, [])

    const uploadFile = (e) => {
        if (e.target.value === "") {
            return
        }

        if (data.myAttachFiles && data.myAttachFiles.length >= 1) {
            setShow1(true)
            return
        }

        let file = e.target.files[0];
        ClassService.addAttachedFile(classId, curriculumIndex, file.name)
            .then((resp) => {
                if (resp.status === 200) {
                    data.myAttachFiles?.push(resp.data)
                    setData({ ...data })
                    //push to S3
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
        ClassService.deleteAttachedFile(classId, curriculumIndex, file)
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

    const openLiveClassOnZoom = (liveClassId) => {
        ClassService.getLiveClassZoomURL(liveClassId).then((resp) => {

            if (resp.status === 200) {

                window.open(resp.data);
            }
        })
    }

    return (
        <>
            <section className="myclassdetails-section">
                <div className="myclassdetails-box myclassbook mb-3">
                    <div className="myclassdetails-header m500">
                        <div className="myclassdetails-header-top">
                            <span className="lcicon-flag-big">
                                <span>
                                    초등 <br /> 3학년
                                </span>
                            </span>
                            <h3 className="mr-2">
                                [LiveClass 책글] {data.className}
                            </h3>
                            <span className="myclassdetails-date"><DateTime format="YYYY.MM" date={new Date()} /></span>
                            <br className="d-lg-none" />
                            <span className="myclassdetails-teachername">
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

                        <div className="myclassdetails-header-bottom d-block d-lg-none">
                            <Button
                                variant=""
                                className="btn-sm btn-consult"
                                as={Link}
                                to="/write-consult"
                            >
                                상담하기
                            </Button>
                        </div>
                    </div>
                    <div className="myclassdetails-body">
                        <div className="d-lg-flex no-gutters">
                            <div className="col-lg-8 myclassdetails-left">
                                <div className="myclassdetails-notify danger">
                                    <p className="mb-0 d-flex">
                                        <i className="lcicon-notify"></i>
                                        <span className="label">공지사항</span>
                                        {data.notification}
                                    </p>
                                </div>
                                <div className="myclassdetails-intro py-4">
                                    <p className="myclassdetails-bookname">
                                        1주차
                                        <span className="divider">|</span>
                                        홍길동전
                                    </p>
                                    <div className="d-flex">
                                        <div className="myclassdetails-avatar">
                                            <div>
                                                <img
                                                    src={data.tutorImage}
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
                                            <p>{data.content}</p>
                                        </div>
                                    </div>
                                    <div className="myclassdetails-materials">
                                        <i className="lcicon-pencilcolor"></i>
                                        {data.material}
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
                                    {
                                        data.cmAttachFiles ?
                                            <Dropdown className="form-control-dropdown mb-2">
                                                <Dropdown.Toggle
                                                    id="dropdown"
                                                    className="w-100 btn-icon btn-outline btn-square btn-attachment"
                                                    variant="g300"
                                                >
                                                    <i className="lcicon-folder"></i>
                                                    공통 첨부파일
                                                </Dropdown.Toggle>
                                                {
                                                    data.cmAttachFiles?.length &&
                                                    <Dropdown.Menu>
                                                        {
                                                            data.cmAttachFiles.map((file, i) =>
                                                                <Dropdown.Item href={file.url} key={i}>
                                                                    {file.fileName}
                                                                </Dropdown.Item>
                                                            )
                                                        }
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
                                                    id="dropdown"
                                                    className="w-100 btn-icon btn-outline btn-square btn-attachment"
                                                    variant="g300"
                                                >
                                                    <i className="lcicon-folder"></i>
                                                    첨부파일
                                                </Dropdown.Toggle>
                                                {
                                                    <Dropdown.Menu>
                                                        {
                                                            data.attachFiles.map((file, i) =>
                                                                <Dropdown.Item href={file.url} key={i}>
                                                                    {file.fileName}
                                                                </Dropdown.Item>
                                                            )
                                                        }
                                                    </Dropdown.Menu>
                                                }
                                            </Dropdown>
                                            :
                                            <Dropdown className="form-control-dropdown mb-2 no-file">
                                                <Dropdown.Toggle
                                                    id="dropdown"
                                                    className="w-100 btn-icon btn-outline btn-square btn-attachment d-none d-lg-block"
                                                    variant="g300"
                                                >
                                                    <i className="lcicon-folder"></i>
                                                    첨부파일
                                                </Dropdown.Toggle>
                                            </Dropdown>
                                    }

                                    <Button
                                        variant="m500"
                                        className="w-100 btn-icon btn-outline btn-square mb-2 d-none d-lg-block"
                                        as={Link}
                                        to={{
                                            pathname: "/my-class/class-activity",
                                            state: {
                                                url: data.activity1
                                            }
                                        }}
                                    >
                                        <i className="lcicon-pencil"></i>
                                        수업활동 1
                                    </Button>
                                    {
                                        data.activity2 &&
                                        <Button
                                            variant="m500"
                                            className="w-100 btn-icon btn-outline btn-square mb-2 d-none d-lg-block"
                                            as={Link}
                                            to={{
                                                pathname: "/my-class/class-activity",
                                                state: {
                                                    url: data.activity2
                                                }
                                            }}
                                        >
                                            <i className="lcicon-pencil"></i>
                                            수업활동 2
                                        </Button>
                                    }
                                    <Button
                                        variant="m500"
                                        className="w-100 btn-icon btn-outline btn-square mb-2 d-none d-lg-block"
                                        as={Link}
                                        to={{
                                            pathname: "/my-class/newspaper",
                                            state: {
                                                classId: classId,
                                                curriculumIndex: curriculumIndex,
                                                studentId: studentId
                                            }
                                        }}
                                    >
                                        <i className="lcicon-newspayper"></i>
                                        신문칼럼
                                    </Button>

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
                                    <div className="text-center my-3 icon-attend d-none d-lg-block">
                                        <i className={`lcicon-attend ${icon}`}></i>
                                    </div>
                                    <div className="text-center icon-attend d-block d-lg-none">
                                        <i className={`lcicon-attend-mobile ${icon}`}></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="myclassdetails-footer">
                        <div className="d-lg-flex myclassdetails-footer-top m100">
                            <div className="liveclass-title">
                                <div className="d-lg-flex">
                                    <h4 className="mb-2">Live 교실 </h4>
                                    <div className="liveclass-info">
                                        <p className="font-weight-bold mb-1">
                                            {curriculumIndex + 1}주차 {data.bookName}
                                        </p>
                                        <p className="liveclass-time">
                                            수업일시 : {classDateFormat(new Date(data.start), new Date(data.end))}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {
                                role === UserRole.STUDENT.value &&
                                <div>
                                    <Button
                                        className={`btw-372 d-lg-block ${btnGoTo.class}`}
                                        disabled={btnGoTo.isDisabled}
                                        onClick={() => openLiveClassOnZoom(classId)}
                                    >
                                        라이브 교실 입장하기
                                    </Button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </section>
            {/* Modal notify only one file can be attached. */}
            <ModalNotification
                show={show1}
                onShow={setShow1}
                content={"1개의 파일만 첨부가 가능합니다."}
            />
        </>
    )
}

export default MyClassBookDetails
