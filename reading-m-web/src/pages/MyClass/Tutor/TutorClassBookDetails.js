import { ClassType } from 'constants/class.constants'
import { UserRole } from 'constants/role.constants'
import { schoolgrade } from 'constants/schoolgrade.constants'
import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ClassService } from 'services/ClassService'
import FormattedDateTime from 'components/common/FormattedDateTime'
import { checkDayOfWeek, TIME_OF_DAY } from 'constants/datetime.constants'
import { StorageService } from 'services/StorageService'

const REDUCER_ACTION = {
    "FetchData": 1,
    "UpdateNotice": 2,
    "UpdateCommonAttachedFile": 3,
    "UpdateAttachedFile": 4,
    "RemoveAttachedFile": 5,
    "RemoveCommonAttachedFile": 6
}

const initialState = {
    "type": ClassType.TextBookClass.value,
    "name": "",
    "materials": "",
    "openDate": "",
    "tutor": {
        "id": -1,
        "name": "",
        "profileImageUrl": "",
        "classIntroduction": ""
    },
    "students": [
    ],
    "curriculum": [
    ]
}

function selfReducer(state, action) {
    let newState = { ...state }
    
    switch(action.type) {
        case REDUCER_ACTION.FetchData:
            return action.data;

        case REDUCER_ACTION.UpdateNotice:

            newState.curriculum[action.index].notification = action.data;
            
            return newState;

        case REDUCER_ACTION.UpdateAttachedFile:
            {
                const { curriculum } = newState;
                const { files, curriculumIndex, studentIndex } = action.data;
    
                let studentFiles = curriculum[curriculumIndex].students[studentIndex].files;

                studentFiles = files;
            }

            return newState;

        case REDUCER_ACTION.UpdateCommonAttachedFile:
            {
                const { curriculum } = newState;
                const { files, curriculumIndex } = action.data;

                let commonFiles = curriculum[curriculumIndex].commonFiles;

                commonFiles = files;
            }

            return newState;

        case REDUCER_ACTION.RemoveAttachedFile:
            {
                const { curriculum } = newState;
                const { curriculumIndex, studentIndex, files } = action.data;

                let studentFiles = curriculum[curriculumIndex].students[studentIndex].files;

                studentFiles = files;
            }

            return newState;
        
        case REDUCER_ACTION.RemoveCommonAttachedFile:
            {
                const { curriculum } = newState;
                const { curriculumIndex, files } = action.data;

                let commonFiles = curriculum[curriculumIndex].commonFiles;
                
                commonFiles = files;
            }

            return newState

        default:
            throw Error();
    }
}

const SelfContext = createContext();


function StudentTableRow({ source }) {

    return (
        <div className="tablelist-row text-right text-lg-center">
            <div className="tcol-15 tcol-md-5" hidden={ source.new === false }>
                <span className="label-new">New</span>
            </div>
            <div className="tcol-20 d-lg-none text-500">
                학생정보
            </div>
            <div className="tcol-md-30 tcol-65">
                { source.school }{ schoolgrade[`G${ source.grade }`] } { source.name } 학생
            </div>

            <div className="tcol-md-20 tcol-100">
                { source.phone }
            </div>
            <div className="tcol-35 d-lg-none text-500">
                학부모
            </div>
            <div className="tcol-md-10 tcol-20">{ source.parent.name }</div>
            <div className="tcol-md-20 tcol-45">
                { source.parent.phone }
            </div>
            <div className="tcol-35 d-lg-none text-500">
                결제일
            </div>
            <div className="tcol-md-20 tcol-65 text-g500">
                <FormattedDateTime source={ source.paymentDate } format="YYYY.MM.DD" />
            </div>
        </div>
    )
}

function StudentTable({ source }) {

    return (
        <div className="tablelist m500">
            <div className="tablelist-header d-none d-lg-block">
                <div className="tcol-5"></div>
                <div className="tcol-30 d-none d-lg-block">
                    학생정보
                </div>
                <div className="tcol-20 d-none d-lg-block">
                    학생 휴대폰번호
                </div>
                <div className="tcol-10 d-none d-lg-block">학부모</div>
                <div className="tcol-20 d-none d-lg-block">
                    학부모 휴대폰번호
                </div>
                <div className="tcol-20 d-none d-lg-block">결제일</div>
            </div>

            <div className="tablelist-body ">
                {
                    source.map((item, index) => {

                        return <StudentTableRow key={ `StudentTableRow_${ index }` } source={ item } />
                    })
                }
            </div>
        </div>
    )
}


function UploadFileItem({ source, type }) {
    const { handleAttachmentRemove } = useContext(SelfContext);

    return (
        <div className="uploadfile-name uploaded mt-1">
            {source.fileName}
            <i className="lcicon-close-black" onClick={ (e) => handleAttachmentRemove(e, type, source) }></i>
        </div>
    )
}

function StudentDownloadFileItem({ source }) {
    const isDownloadAvailable = source.url !== undefined && source.url !== null && source.url !== "";

    return (
        <>
            {
                isDownloadAvailable === true ?
                    <div className="uploadfile-name uploaded mt-3 mt-lg-1">
                        {source.fileName}
                        
                        <Button
                            size="xs"
                            variant="m600"
                            as={Link}
                            to={source.url}
                            download
                            className="btn-download"
                        >
                            다운로드
                        </Button>
                    </div>
                    :
                    <div className="invisible uploadfile-name uploaded mt-3 mt-lg-1">
                    </div>
            }
        </>        
    )
}

function StudentUploadFileList({ source }) {
    const { handleAttachmentSelected } = useContext(SelfContext);

    return (
        <div className="box-gray mb-2 py-3">
            <div className="row mx-n2">
                <div className="col-md-6 px-2">
                    <div className="d-flex justify-content-between align-items-center">
                        <label className="uploadfile-label">
                            {source.name} 학생 파일
                            첨부하기
                        </label>
                        <div className="uploadfile-button">
                            <label
                                htmlFor={`student-file-upload-${source.curriculumIndex}_${source.index}_${source.index}`}
                                className="btn-upload btn-xs mr-0"
                            >
                                <i className="lcicon-plus-alt"></i>
                                파일 선택
                            </label>
                            <input
                                id={`student-file-upload-${source.curriculumIndex}_${source.index}_${source.index}`}
                                type="file"
                                onChange={ (e) => handleAttachmentSelected(e, REDUCER_ACTION.UpdateAttachedFile, source.curriculumIndex, source.index) }
                            />
                        </div>
                    </div>
                    {
                        source.attachedFiles?.map((item, index) => {
                            const itemKey = `StudentUploadFileItem_${index}`;

                            return (
                                <div key={itemKey}>
                                    {
                                        item !== null ?
                                            <UploadFileItem 
                                                type="student"
                                                source={ {
                                                    ...item,
                                                    "curriculumIndex": source.curriculumIndex,
                                                    "studentIndex": source.index,
                                                    "fileIndex": index
                                                } }
                                            />
                                            :
                                            <div className="d-none">
                                            </div>
                                    }
                                </div>                                
                            )
                        })
                    }                    
                </div>
                <div className="col-md-6 px-2">
                    <div
                        style={{
                            height: '32px',
                        }}
                        className="invisible d-lg-block d-none"
                    ></div>

                    {
                        source.stdAttachedFiles?.map((item, index) => {
                            const itemKey = `StudentDownloadFileItem_${index}`;

                            return (
                                <div key={itemKey}>
                                    {
                                        item !== null ?
                                            <StudentDownloadFileItem
                                                source={item}
                                            />
                                            :
                                            <div 
                                                className="d-none">
                                            </div>
                                    }
                                </div>
                                
                            )
                        })
                    }                    
                </div>
            </div>
        </div>
    )
}

function PeriodDateTime({ from, to }) {
    const formatter = (raw) => {
        return `${raw}`.padStart(2, '0');
    }

    const fromDate = new Date(from);
    const toDate = new Date(to);

    const year = fromDate.getFullYear();
    const month = formatter(fromDate.getMonth() + 1);
    const date = formatter(fromDate.getDate());

    const dayName = checkDayOfWeek(fromDate.getDay());
    
    const timeOfDay = fromDate.getHours() > 12 ? TIME_OF_DAY[0].name : TIME_OF_DAY[1].name;

    const fromHour = fromDate.getHours();
    const fromMinute = formatter(fromDate.getMinutes());
    const toHour = toDate.getHours();
    const toMinute = formatter(toDate.getMinutes());

    let res = `${year}.${month}.${date} ${dayName} ${timeOfDay} ${fromHour}시${fromMinute}분 ~ ${toHour}시${toMinute.padStart(2, '0')}분`;

    return res;
}

function CurriculumDetailsListItem({ source }) {
    const { 
        data, 
        setData, 
        handleCurriculumUpdate, 
        openLiveClassOnZoom, 
        handleAttachmentSelected 
    } = useContext(SelfContext);

    const indexNum = source.index + 1;
    const datePostFix = data.type === ClassType.TextBookClass.value ? "주차" : "일차";
    const title = data.type === ClassType.TextBookClass.value ? source.book.title : source.name;

    return (
        <div className="myclassdetails-box tutor mt-5">
            <div className="myclassdetails-labelweek m500">
                { indexNum }{ datePostFix } { title }
            </div>
            <div className="myclassdetails-body">
                <div className="myclassdetails-notify data-input">
                    <p className="mb-0 d-block d-lg-flex align-items-center">
                        <i className="lcicon-notify-g700"></i>
                        <span className="label">공지사항</span>
                        <Form.Control
                            type="text"
                            placeholder="지도교사 개인 사정으로 인해 1주차 초등 3~6 필독 독서 수업은 30분 연기됩니다."
                            className="mt-2 mt-lg-0"
                            value={ data.curriculum[source.index].notification }
                            onChange={ (ev) => setData({
                                "type": REDUCER_ACTION.UpdateNotice, 
                                "data": ev.target.value,
                                "index": source.index
                            }) }
                        />
                    </p>
                </div>
                <div className="d-lg-flex">
                    <div className="col-lg-7 py-4 px-0">
                        <div className="myclassdetails-intro">
                            <div className="d-flex">
                                <div className="myclassdetails-avatar">
                                    <div>
                                        <img
                                            src={ data.tutor.profileImageUrl }
                                            alt="Tutor Avatar"
                                        />
                                        <p className="myclassdetails-teachername">
                                            <span>지도교사</span>
                                            <br className="d-block d-lg-none" />
                                            <span className="name ml-2 ml-lg-0">
                                                { data.tutor.name }
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                <div className="myclassdetails-classcontent">
                                    <p>
                                        { source.content }
                                    </p>
                                </div>
                            </div>
                            <div className="myclassdetails-materials mb-1">
                                <i className="lcicon-pencilcolor"></i>
                                { indexNum }{ datePostFix } 수업준비 : { source.material }
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 py-4 d-none d-lg-block">
                        <Button
                            variant="m500"
                            className="btn-outline btw-224 m-1"
                            as={Link}
                            to={{
                                pathname: "/tutor/my-class-activity",
                                state: { 
                                    "role": UserRole.STUDENT.value,
                                    "type": "ACTIVITY",
                                    "number": 1,
                                    "contentUrl": source.book.studentActivity1
                                }
                            }}
                            size="sm"
                            hidden={source.book.studentActivity1 === null}
                        >
                            학생용 수업활동1
                        </Button>
                        <Button
                            variant="p500"
                            className="btn-outline btw-224"
                            as={Link}
                            to={{
                                pathname: "/tutor/my-class-activity",
                                state: { 
                                    "role": UserRole.TUTOR.value,
                                    "type": "ACTIVITY",
                                    "number": 1,
                                    "contentUrl": source.book.tutorActivity1
                                }
                            }}
                            size="sm"
                            hidden={source.book.tutorActivity1 === null}
                        >
                            교사용 수업활동1
                        </Button>
                        <Button
                            variant="m500"
                            className="btn-outline btw-224 m-1"
                            as={Link}
                            to={{
                                pathname: "/tutor/my-class-activity",
                                state: { 
                                    "role": UserRole.STUDENT.value,
                                    "type": "ACTIVITY",
                                    "number": 2,
                                    "contentUrl": source.book.studentActivity2
                                }
                            }}
                            size="sm"
                            hidden={source.book.studentActivity2 === null}
                        >
                            학생용 수업활동2
                        </Button>
                        <Button
                            variant="p500"
                            className="btn-outline btw-224"
                            as={Link}
                            to={{
                                pathname: "/tutor/my-class-activity",
                                state: { 
                                    "role": UserRole.TUTOR.value,
                                    "type": "ACTIVITY",
                                    "number": 2,
                                    "contentUrl": source.book.tutorActivity2
                                }
                            }}
                            size="sm"
                            hidden={source.book.tutorActivity2 === null}
                        >
                            교사용 수업활동2
                        </Button>
                        <Button
                            variant="m500"
                            className="btn-outline btw-224 m-1"
                            as={Link}
                            to={{
                                pathname: "/tutor/my-class-activity",
                                state: { 
                                    "role": UserRole.STUDENT.value, 
                                    "type": "NEWSPAPER", 
                                    "contentUrl": source.newspaper.fileUrl
                                }
                            }}
                            size="sm"
                            hidden={source.newspaper.fileUrl === null}
                        >
                            학생용 신문칼럼
                        </Button>
                        <Button
                            variant="p500"
                            className="btn-outline btw-224"
                            as={Link}
                            to={{
                                pathname: "/tutor/my-class-activity",
                                state: { 
                                    "role": UserRole.TUTOR.value, 
                                    "type": "NEWSPAPER", 
                                    "contentUrl": source.newspaper.fileUrl
                                }
                            }}
                            size="sm"
                            hidden={source.newspaper.fileUrl === null}
                        >
                            교사용 신문칼럼
                        </Button>
                    </div>
                </div>
                <div className="border-top-bottom">
                    <div className="myclassdetails-uploadfile">
                        <div className="uploadfile-custom mb-0 py-3">
                            <div className="col-md-6">
                                <div className="d-flex justify-content-between align-items-center">
                                    <label className="uploadfile-label">
                                        파일 첨부하기
                                        <br className="d-lg-none" />
                                        <span className="ml-n1 pl-1 mx-lg-0 pl-lg-0">
                                            * 개수 제한없이 파일 첨부가
                                            가능합니다.
                                        </span>
                                    </label>
                                    <div className="uploadfile-button">
                                        <label
                                            htmlFor={`common-file-upload-${source.index}`}
                                            className="btn-upload btn-xs mr-0"
                                        >
                                            <i className="lcicon-plus-alt"></i>
                                            파일 선택
                                        </label>
                                        <input
                                            id={`common-file-upload-${source.index}`}
                                            type="file"
                                            onChange={ (e) => handleAttachmentSelected(e, REDUCER_ACTION.UpdateCommonAttachedFile, source.index, -1) }
                                        />
                                    </div>
                                </div>
                                {
                                    source.commonFiles !== null && source.commonFiles.map((item, index) => {
                                        let displayItem = null;
                                        let displayItemKey = "";

                                        if (item === null) {
                                            displayItemKey=`CommonUploadFileItem_${source.index}_${index}_empty`;
                                            displayItem = 
                                                <div className="d-none"
                                                ></div>
                                        } else {
                                            displayItemKey=`CommonUploadFileItem_${source.index}_${index}`;
                                            displayItem = 
                                                <UploadFileItem
                                                    type="common"
                                                    source={ { 
                                                        ...item, 
                                                        "curriculumIndex": source.index,
                                                        "fileIndex": index
                                                    } }
                                                />
                                        }
                                        
                                        return (
                                            <div key={displayItemKey}>
                                                { displayItem }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="uploadfile-custom mb-0 py-3">
                            <div className="col-md-12">
                                <label className="uploadfile-label mb-2">
                                    파일 첨부하기
                                    <span>
                                        * 개수 제한없이 파일 첨부가
                                        가능합니다.
                                    </span>
                                </label>
                                {
                                    source.students.map((item, index) => {
                                        
                                        return (
                                            <StudentUploadFileList
                                                key={`StudentUploadFileList_${index}`}
                                                source={ { 
                                                    ...item, 
                                                    index,
                                                    "curriculumIndex": source.index
                                                } }
                                            />
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>

                    <div className="myclassdetails-footer">
                        <div className="d-lg-flex myclassdetails-footer-top">
                            <div className="liveclass-title">
                                <div className="d-lg-flex">
                                    <h4>Live 교실 </h4>
                                    <div className="liveclass-info">
                                        <p>{indexNum}{ datePostFix } {source.book.title}</p>
                                        <p>
                                            수업일시 : {` `}
                                            <PeriodDateTime 
                                                from={source.start}
                                                to={source.end}
                                            />
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <Button
                                    variant="m500"
                                    className="btw-372 d-lg-block d-none"
                                    onClick={ openLiveClassOnZoom }
                                >
                                    Live 교실 입장하기
                                </Button>
                            </div>
                        </div>

                        <div className="text-center myclassdetails-footer-bottom">
                            <Button
                                variant="g700"
                                className="btw-184"
                                onClick={ () => handleCurriculumUpdate(source.index) }
                            >
                                저장하기
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function CurriculumDetailsList({ source }) {

    return (
        <>
            {
                source.map((item, index) => {

                    return (
                        <CurriculumDetailsListItem 
                            key={ `CurriculumDetailsListItem_${ index }` }
                            source={ { ...item, index } }
                        />
                    )
                })
            }
        </>
  
    )
}


export default function TutorClassBookDetails(props) {
    const { liveClassId } = props.location.state;

    const [data, setData] = useReducer(selfReducer, initialState);

    const pageTitle = data.type === ClassType.TextBookClass.value ?
        ClassType.TextBookClass.label : ClassType.GoalClass.label;

    const [savedPopup, setSavedPopup] = useState(false)
    const showSavedPopup = () => setSavedPopup(true)
    const closeSavedPopup = () => setSavedPopup(false)

    useEffect(() => {

        ClassService.getFullClassDetails(liveClassId).then((resp) => {
            
            if (resp.status === 200) {
                
                setData({ "type": REDUCER_ACTION.FetchData, "data": resp.data });
            }
        })
    }, [])

    function openLiveClassOnZoom() {
        ClassService.getLiveClassZoomURL(liveClassId).then((resp) => {

            if (resp.status === 200) {

                window.open(resp.data);
            }
        })
    }

    function handleAttachmentSelected(ev, type, curriculumIndex, studentIndex) {
        const { curriculum } = data;
        const files = ev.target.files;

        let uploadFiles = [];

        if (type === REDUCER_ACTION.UpdateAttachedFile) {
            if (curriculum[curriculumIndex].students[studentIndex].attachedFiles === null) {
                curriculum[curriculumIndex].students[studentIndex].attachedFiles = []
            }

            uploadFiles = curriculum[curriculumIndex].students[studentIndex].attachedFiles;
        } else if (type === REDUCER_ACTION.UpdateCommonAttachedFile) {
            if (curriculum[curriculumIndex].commonFiles === null) {
                curriculum[curriculumIndex].commonFiles = [];
            }

            uploadFiles = curriculum[curriculumIndex].commonFiles;
        }

        for (let i = 0; i < files.length; i++) {
    
            uploadFiles.push({
                "fileName":  files[i].name,
                "url": "",
                "content": files[i]
            })
        }

        setData({ 
            "type": type, 
            "data": {
                "files": uploadFiles,
                curriculumIndex,
                studentIndex
            }
        });
    }

    function handleAttachmentRemove(ev, type, item) {
        const { curriculum } = data;
        const { curriculumIndex, studentIndex, fileIndex } = item;

        let remainedFiles = [];
        let reducerAction = null;
        
        if (type === "student") {
            remainedFiles = curriculum[curriculumIndex].students[studentIndex].attachedFiles;
            reducerAction = REDUCER_ACTION.RemoveAttachedFile;
        } else if (type === "common") {
            remainedFiles = curriculum[curriculumIndex].commonFiles;            
            reducerAction = REDUCER_ACTION.RemoveCommonAttachedFile;
        }

        remainedFiles.splice(fileIndex, 1);

        setData({ 
            "type": reducerAction, 
            "data": {
                "files": remainedFiles,
                curriculumIndex,
                studentIndex                
            }
        });
    }

    function handleCurriculumUpdate(curriculumIndex) {
        let curriculum = data.curriculum[curriculumIndex];
        let students = data.students;
        let curriculumStudents = curriculum.students;        

        let notification = curriculum.notification;
        
        let commonAttachFiles = [];
        let attachedFiles = [];
        
        let pendingUploadFiles = {
            "common": [],
            "student": []
        }

        // Setup common files to upload
        if (curriculum.commonFiles !== null) {
            for (const item of curriculum.commonFiles) {
                commonAttachFiles.push({
                    "fileName": item.fileName,
                    "url": item.url
                });

                if (item.url === "") {
                    pendingUploadFiles.common.push({
                        "fileName": item.fileName,
                        "content": item.content
                    })
                }
            }
        }

        // Setup student's files to upload
        for (var i = 0; i < curriculumStudents.length; i++) {
            const id = students[i].id;
            const attachFiles = [];

            pendingUploadFiles.student.push({
                "studentId": id,
                "attachFiles": []
            })
            
            if (curriculumStudents[i].attachedFiles !== null &&
                curriculumStudents[i].attachedFiles.length > 0) {
                
                for (const file of curriculumStudents[i].attachedFiles) {
                    attachFiles.push({
                        "fileName": file.fileName,
                        "url": file.url
                    });

                    if (file.url === "") {
                        pendingUploadFiles.student[pendingUploadFiles.student.length - 1].attachFiles.push({
                            "fileName": file.fileName,
                            "content": file.content
                        })
                    }
                }
            } 

            attachedFiles.push({
                "studentId": id,
                attachFiles
            });
        }

        // Update curriculum to database and get upload url
        ClassService.updateFullClassDetails(
            liveClassId,
            curriculumIndex,
            attachedFiles,
            commonAttachFiles,            
            notification
        ).then((resp) => {

            if (resp.status === 200) {

                const { commonAttachFiles, attachFiles } = resp.data

                // Upload common files
                if (commonAttachFiles !== null) {
                    for (const item of commonAttachFiles) {                    
                        let res = pendingUploadFiles.common.find(s => s.fileName === item.fileName);
                        
                        if (res) {
                            if (res.url === undefined) {
                                StorageService.upload(item.url, res.content);
        
                                res["url"] = item.url;
                            }
                        }
                    }
                }

                // Upload student's files
                for (const item of attachFiles) {
                    
                    let res = pendingUploadFiles.student.find(s => s.studentId === item.studentId);

                    for (const fileItem of item.attachFiles) {

                        let resItem = res.attachFiles.find(s => s.fileName === fileItem.fileName);
                        
                        if (resItem) {
                            if (resItem.url === undefined) {  
                                StorageService.upload(fileItem.url, resItem.content);

                                resItem["url"] = fileItem.url;
                            }
                        }
                    }
                }

                // Update urls of uploaded common files in client
                if (pendingUploadFiles.common.length > 0) {

                    for (const item of pendingUploadFiles.common) {
                        
                        let foundedFile = curriculum.commonFiles.find(
                            s => s.fileName === item.fileName &&
                                s.url === ""
                        )

                        if (foundedFile) {
                            foundedFile.url = item.url;
                        }
                    }
                }

                // Update urls of uploaded student's files in client
                if (pendingUploadFiles.student.length > 0) {
                    
                    for (const item of pendingUploadFiles.student) {

                        if (item.attachFiles.length > 0) {
                            let foundedStudent = curriculumStudents.find(s => s.id === item.studentId);
    
                            if (foundedStudent) {
    
                                for (const itemAttachFile of item.attachFiles) {
                                    let foundedFile = foundedStudent.attachedFiles.find(
                                        s => s.fileName === itemAttachFile.fileName
                                            && s.url === ""
                                    );
    
                                    if (foundedFile) {
                                        foundedFile.url = itemAttachFile.url
                                    }
                                }
                            }
                        }                        
                    }
                }
            }
        })

        showSavedPopup();
    }

    return (
        <SelfContext.Provider 
            value={ { data, setData, handleCurriculumUpdate, openLiveClassOnZoom, handleAttachmentSelected, handleAttachmentRemove } }
        >
            <div className="tutorclassbookdetails-body">
                <h2 className="page-title">수업 전체보기</h2>
                <div className="dropdown-divider pb-4"></div>
                <h3 className="tutorclass-name">
                    [{ pageTitle }] { data.name }
                    <br className="d-block d-lg-none" />
                    <span className="title-badge g300 ml-3 mt-2 mt-lg-0">
                        <FormattedDateTime source={ data.openDate } format="YYYY.MM" />
                    </span>
                </h3>
                
                <StudentTable
                    source={ data.students }
                />

                <CurriculumDetailsList 
                    source={ data.curriculum }
                />

                <div className="text-center mt-5">
                    <Button
                        variant="p500"
                        className="btw-386"
                        as={Link}
                        to="/tutor/my-class"
                    >
                        자세히보기
                    </Button>
                </div>
            </div>

            <Modal
                show={savedPopup}
                onHide={closeSavedPopup}
                dialogClassName="modalw-386 modal-comfirm"
                centered
            >
                <Modal.Body scrollable="true">
                    <div className="modal-body-inner flex-column ">
                        <i className="lcicon-modalComplete mb-2"></i>
                        <p className="mb-0">저장되었습니다.</p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal-btn-half">
                    <Button variant="g700" onClick={closeSavedPopup}>
                        확인
                    </Button>
                </Modal.Footer>
            </Modal>
        </SelfContext.Provider>
    )
}
