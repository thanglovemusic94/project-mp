import LCPagination from 'components/LCPagination'
import React, { useState, useEffect } from 'react'
import { ClassService } from 'services/ClassService'
import ReactPlayer from 'react-player'
import SearchNotFound from 'components/SearchNotFound'
import { CourseStatus, convertCourseStatus } from 'constants/student.course.status.constants'
import { convertSchool, convertGrade } from 'constants/student.target.constants'
import { getRole, UserRole } from 'constants/role.constants'

const MyMathDavinciDetails = (props) => {

    const { classInfo } = props.location.state
    const role = getRole().value

    const [data, setData] = useState({
        content: [],
        totalPages: 0,
        totalElements: 0,
        number: 0,
        size: 0,
    })

    const [pageable, setPageable] = useState({
        page: 0,
        size: 10,
        sort: 'courseIndex,asc',
    })

    const [courseSelect, setCourseSelect] = useState({
        courseIndex: '',
        courseName: '',
        status: '',
        schoolTarget: '',
        gradeTarget: '',
        material: '',
        urlVideo: '',
        time: '',
        timeWatch: 0,
        startWatch: '',
        isPlay: false,
    })

    useEffect(() => {
        ClassService.getDaVinciCourses(classInfo.classId, classInfo.childId, pageable)
            .then((resp) => {
                if (resp.status === 200) {
                    setData(resp.data)
                    setCourseSelect(resp.data.content[0])
                }

            }).catch((err) => {
                console.error(err)
            })
    }, [pageable])

    const handleSelect = (value) => {
        if (courseSelect.isPlay) {
            let timeWatch = courseSelect.timeWatch || 0
            timeWatch = timeWatch + Math.abs(new Date() - courseSelect.startWatch)

            handleEnrollment(timeWatch, value.time)
            setCourseSelect({ ...courseSelect, timeWatch: timeWatch })

        }

        const course = { ...value, timeWatch: 0, isPlay: false }
        setCourseSelect(course)
    }

    function handlePageChange(pgNo) {
        if (pgNo >= 0) setPageable({ ...pageable, page: pgNo })
    }

    const handleOnPlay = () => {
        setCourseSelect({ ...courseSelect, startWatch: new Date(), isPlay: true })
    }

    const handleOnPause = () => {
        let timeWatch = courseSelect.timeWatch || 0
        timeWatch = timeWatch + Math.abs(new Date() - courseSelect.startWatch)
        setCourseSelect({ ...courseSelect, timeWatch: timeWatch, isPlay: false })

        handleEnrollment(timeWatch, courseSelect.time)
    }

    const handleEnrollment = (timeWatch, totalTime) => {
        let remainingTime = totalTime * 60 * 1000 - timeWatch
        if (timeWatch > 300000) {
            if (remainingTime < 300000) {
                if (courseSelect.status != CourseStatus.COMPLETE.value) {
                    updateStatus(CourseStatus.COMPLETE.value)
                }
            } else {
                if (courseSelect.status == CourseStatus.PRE_COURSE.value) {
                    updateStatus(CourseStatus.IN_PROGRESS.value)
                }
            }

        }
        // if (courseSelect.status == CourseStatus.PRE_COURSE.value) {
        //     updateStatus(CourseStatus.IN_PROGRESS.value)
        // }
        // if (timeWatch > 300000) {
        //     if (courseSelect.status != CourseStatus.COMPLETE.value) {
        //         updateStatus(CourseStatus.COMPLETE.value)
        //     }
        // } else {
        //     if (courseSelect.status == CourseStatus.PRE_COURSE.value) {
        //         updateStatus(CourseStatus.IN_PROGRESS.value)
        //     }
        // }
    }

    const updateStatus = (status) => {
        ClassService.changeStatus(classInfo.classId, courseSelect.courseIndex, status)
            .then((resp) => {
                if (resp.status === 200) {
                    let courseList = data.content
                    courseList.map((value) => {
                        if (value.courseIndex === courseSelect.courseIndex) {
                            value.status = status;
                        }
                    })

                    setData({ ...data, content: courseList })
                }
            })
            .catch((err) => {
                console.error(err)
            })
    }

    return (
        <>{
            data.content.length ?
                <section className="mymathdavincidetail-section">
                    {
                        role === UserRole.STUDENT.value &&
                        <div className="lecture-video">
                            <div className="embed-responsive embed-responsive-21by9">
                                {/* <iframe
                                className="embed-responsive-item"
                                src={courseSelect.urlVideo}
                                title="YouTube video player"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen
                            ></iframe> */}
                                <ReactPlayer
                                    url={courseSelect.urlVideo}
                                    controls={true}
                                    width='100%'
                                    height='100%'
                                    onPlay={handleOnPlay}
                                    onPause={handleOnPause}
                                />
                            </div>
                            <h3 className="lecture-video-title">
                                {courseSelect.courseIndex + 1}강 {courseSelect.courseName}
                            </h3>
                        </div>
                    }
                    <div className="justify-content-between course-infor">
                        <div className="class-name">
                            <h3 >
                                [과학수학 다빈치] {classInfo.className}
                            </h3>
                        </div>
                        <div className="course-target">
                            <span >
                                대상학생 : {courseSelect.grade}
                            </span>
                        </div>
                        <div className="course-target">
                            <span>수업준비 : {courseSelect.materials}</span>
                        </div>
                    </div>

                    <div className="tablelist g700">
                        <div className="tablelist-header">
                            <div className="tcol-10 d-none d-lg-block font-weight-bold font-weight-bold">
                                강의
                            </div>
                            <div className="tcol-60 d-none d-lg-block font-weight-bold text-left">
                                강의 제목
                            </div>
                            <div className="tcol-15 d-none d-lg-block font-weight-bold">
                                수강여부
                            </div>
                            <div className="tcol-15 d-none d-lg-block font-weight-bold">
                                강의 시간
                            </div>
                        </div>
                        <div className="tablelist-body course-body">
                            {data.content.map((value, index) => (
                                <Course
                                    key={index}
                                    value={value}
                                    handleSelect={(value) => handleSelect(value)}
                                    courseIndex={courseSelect.courseIndex}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="pagination-wrapper d-flex justify-content-center my-5">
                        <LCPagination
                            pageNumber={data.number}
                            totalPage={data.totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </section>
                :
                <SearchNotFound />
        }
        </>
    )
}

function Course({ value, handleSelect, courseIndex }) {
    let colorStatus = ''
    if (value.status === 'IN_PROGRESS') colorStatus = 'inprogress'
    if (value.status === 'COMPLETE') colorStatus = 'done'

    let background = ''
    if (value.courseIndex === courseIndex) background = 'course-select'
    return (
        <div className={`tablelist-row course-item ${background}`} onClick={() => handleSelect(value)}>
            <div className="tcol-md-10 text-500">
                {value.courseIndex + 1}강
            </div>
            <div className="tcol-md-60 text-left">
                {value.courseName}
            </div>
            <div className={`tcol-md-15 lecture-status text-500 ${colorStatus}`}>
                {convertCourseStatus(value.status)}
            </div>
            <div className="tcol-md-15">
                {value.time}분
            </div>
        </div>
    )
}

export default MyMathDavinciDetails
