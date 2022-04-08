import { LiveClassType, SCHOOL_GRADE } from 'constants/class.constants'
import { DAY_OF_WEEK, TIME_OF_DAY } from 'constants/datetime.constants'
import React, { useContext, useEffect, useState } from 'react'
import {
    Accordion,
    AccordionContext,
    Button,
    useAccordionToggle,
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ClassCartService } from 'services/ClassCartService'
import { ClassService } from 'services/ClassService'
import ClassPhoto from '../assets/images/class-photo.png'
import { UserStorage } from 'storages/UserStorage'
import { UserRole } from 'constants/role.constants'

const ScheduleFormatter = (start, end) => {
    // @format: YYYY.MM.DD MON AM/PM hh:mm  ~ hh:mm

    let startTime = {
        hour: start.getHours(),
        minute: start.getMinutes(),
    }

    let endTime = {
        hour: end.getHours(),
        minute: end.getMinutes(),
    }

    let timeOfDay =
        start.getHours() >= 12 ? TIME_OF_DAY[0].name : TIME_OF_DAY[1].name

    let result = `${start.getFullYear()}.${start.getMonth() + 1
        }.${start.getDate()}`
    result += ` ${DAY_OF_WEEK[start.getDay()].name}${timeOfDay} `
    result += `${startTime.hour}시${start.minute > 0 ? `:${start.minute}분` : ''
        } ~`
    result += `${endTime.hour}시${end.minute > 0 ? `:${end.minute}분` : ''}`

    return result
}

// Accordion
const CustomToggle = ({ children, eventKey, callback }) => {
    const currentEventKey = useContext(AccordionContext)
    const toggleOnClick = useAccordionToggle(
        eventKey,
        () => callback && callback(eventKey)
    )
    const isCurrentEventKey = currentEventKey === eventKey

    return (
        <button
            className={isCurrentEventKey ? 'active' : null}
            onClick={toggleOnClick}
        >
            {children}
        </button>
    )
}

const LiveClassDetailItem = ({ source, type, onLiked }) => {
    const userRole = UserStorage.getLocalUserRole()
    const schoolGrade = SCHOOL_GRADE[`${source.targetStudentGrade}`]
    const gradeLevelName =
        type === LiveClassType.LiveClassBook.value ? schoolGrade.stage.label : ''
    const gradeName =
        type === LiveClassType.LiveClassBook.value
            ? schoolGrade.value + '학년'
            : ''

    function handleLike(event) {
        if (onLiked !== undefined && onLiked !== null) onLiked(source.id)
    }

    return (
        <div
            className={`td-class-item ${type === 'LIVE_GOAL' ? 'liveclass-goal' : ''
                }`}
        >
            <div
                className={`td-class-header ${type === LiveClassType.LiveClassBook.value ? 'm500' : 'b400'
                    }`}
            >
                {type === 'LIVE_BOOK' ? (
                    <LiveClassBookBadge
                        source={{ level: gradeLevelName, grade: gradeName }}
                    />
                ) : (
                    <></>
                )}
                <h3>
                    [LiveClass {type === 'LIVE_BOOK' ? '책글' : ''}
                    {type === 'LIVE_GOAL' ? '목적' : ''}]{' '}
                    <br className="d-block d-lg-none" />
                    {source.name}
                </h3>
                <span className="td-class-people">
                    <span className="payer">{source.numberOfLearners}</span>/
                    <span className="total-people">{source.stdNo}</span> 명
                </span>
            </div>
            <Accordion className="td-class-body">
                <div className="d-lg-flex">
                    {type === 'LIVE_GOAL' ? (
                        <LiveClassGoalAvatar source={source.category} />
                    ) : (
                        <></>
                    )}

                    <div className="td-class-info mt-3 mt-lg-0">
                        <div
                            className={
                                type === LiveClassType.LiveClassBook.value
                                    ? 'td-class-text'
                                    : 'td-class-text-goal'
                            }
                        >
                            <h4 className="class-name">
                                [LiveClass {type === 'LIVE_BOOK' ? '책글' : ''}
                                {type === 'LIVE_GOAL' ? '목적' : ''}]{' '}
                                {source.name}
                            </h4>
                            <div
                                className="class-target-student"
                                hidden={type === 'LIVE_GOAL'}
                            >
                                대상학생 :{' '}
                                <span>
                                    {gradeLevelName} {gradeName}
                                </span>
                            </div>
                            <div className="class-material">
                                수업준비 :<span>{source.materials}</span>
                            </div>
                            <div
                                className={`class-price ${type === LiveClassType.LiveClassGoal.value
                                        ? 'mt-1'
                                        : ''
                                    }`}
                            >
                                {source.tuitionFee} 원
                            </div>
                        </div>

                        <div className="d-lg-flex class-actions justify-content-between flex-row-reverse align-items-center">
                            <div className="d-lg-flex">
                                {source.numberOfLearners < source.stdNo && userRole === UserRole.PARENT.value &&
                                    <Button
                                        variant={
                                            type ===
                                                LiveClassType.LiveClassBook.value
                                                ? 'm500'
                                                : 'b400'
                                        }
                                        as={Link}
                                        className="btw-290 btn-payment"
                                        to={{
                                            pathname: '/payment',
                                            state: { ...source, type },
                                        }}
                                    >
                                        결제하기
                                    </Button>
                                }
                                {
                                    (userRole === UserRole.STUDENT.value || userRole === UserRole.PARENT.value) &&
                                    <span
                                        className={`icon-like ${source.addedToCart ? 'liked' : ''
                                            }`}
                                        onClick={handleLike}
                                    >
                                        <i className="lcicon-hear"></i>
                                    </span>
                                }

                            </div>
                            <div className="toggle-box row mx-n1">
                                <div className="col px-1">
                                    <CustomToggle eventKey="0">
                                        <i className="lcicon-classGuide"></i>
                                        수업안내
                                        <i className="lcicon-dropClose"></i>
                                    </CustomToggle>
                                </div>
                                <div className="col px-1">
                                    <CustomToggle eventKey="1">
                                        <i className="lcicon-classCurriculum"></i>
                                        수업 커리큘럼
                                        <i className="lcicon-dropClose"></i>
                                    </CustomToggle>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="collapse-box">
                    <Accordion.Collapse
                        className="collapse-content"
                        eventKey="0"
                    >
                        <div className="classguide-content">{source.guide}</div>
                    </Accordion.Collapse>
                    <Accordion.Collapse
                        className="collapse-content"
                        eventKey="1"
                    >
                        <>
                            {type === 'LIVE_BOOK' ? (
                                <LiveClassBookCurriculums
                                    source={source.curriculum}
                                />
                            ) : (
                                <></>
                            )}
                            {type === 'LIVE_GOAL' ? (
                                <LiveClassGoalCurriculums
                                    source={source.curriculum}
                                />
                            ) : (
                                <></>
                            )}
                        </>
                    </Accordion.Collapse>
                </div>
            </Accordion>
        </div>
    )
}

const LiveClassBookBadge = ({ source }) => {
    return (
        <span className="lcicon-flag">
            <span>
                {source.level} <br /> {source.grade}
            </span>
        </span>
    )
}

const LiveClassBookCurriculums = ({ source }) => {
    const defaultDataBook = {
        author: null,
        name: null,
        publisher: null,
    }

    return (
        <div className="classcurriculum-content">
            <div className="classcurriculum-list">
                <div className="curriculum-head clearfix">
                    <span className="tcol-md-10 tcol-20">주차</span>
                    <span className="tcol-50 d-none d-lg-block">수업일시</span>
                    <span className="tcol-20 d-none d-lg-block">수업도서</span>
                    <span className="tcol-10 d-none d-lg-block">지은이</span>
                    <span className="tcol-10 d-none d-lg-block">출판사</span>
                    <span className="tcol-80 ccol-content d-block d-lg-none">
                        수업정보
                    </span>
                </div>
                <div className="curriculum-body">
                    <ul>
                        {source.map((item, index) => {
                            const bookInfo =item.book 
                            const weekNumber = index + 1

                            const schedule = ScheduleFormatter(
                                new Date(item.start),
                                new Date(item.end)
                            )

                            return (
                                <li key={index}>
                                    <span className="tcol-md-10 tcol-20 font-weight-bold">
                                        {weekNumber}주차
                                    </span>
                                    <span className="tcol-md-50 tcol-80 ccol-date">
                                        {schedule}
                                    </span>
                                    <span className="tcol-md-20 tcol-60 ccol-book">
                                        {bookInfo.title}
                                    </span>
                                    <span className="tcol-md-10 tcol-20 ccol-author">
                                        {bookInfo.author}
                                    </span>
                                    <span className="tcol-md-10 tcol-20 ccol-publisher">
                                        {bookInfo.publisher}
                                    </span>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

const LiveClassBookAvatar = ({ source }) => {
    return (
        <div className="td-class-photo float-left">
            {/* <img src={ClassPhoto} alt="" /> */}
            <img
                src={
                    source !== undefined && source !== null
                        ? source
                        : ClassPhoto
                }
                alt=""
            />
        </div>
    )
}

const LiveClassGoalCurriculums = ({ source }) => {
    return (
        <div className="classcurriculum-content">
            <div className="classcurriculum-list">
                <div className="curriculum-head clearfix">
                    <span className="tcol-20">일차</span>
                    <span className="tcol-md-30 d-none d-lg-block">
                        수업일시
                    </span>
                    <span className="tcol-md-50 d-none d-lg-block">수업명</span>
                    <span className="tcol-80 d-block d-lg-none">수업정보</span>
                </div>
                <div className="curriculum-body">
                    <ul>
                        {source.map((item, index) => {
                            const dayNumber = index + 1

                            const schedule = ScheduleFormatter(
                                new Date(item.start),
                                new Date(item.end)
                            )

                            return (
                                <li key={index}>
                                    <span className="tcol-20 font-weight-bold">
                                        {dayNumber}일차
                                    </span>
                                    <span className="tcol-md-30 tcol-80 ccol-classdate">
                                        {schedule}
                                    </span>
                                    <span className="tcol-md-50 tcol-100 ccol-classname">
                                        {item.name}
                                    </span>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

const LiveClassGoalAvatar = ({ source }) => {
    return (
        <div className="td-class-photo float-left">
            {source === 'ESSAY' ? (
                <i className="lcicon-class-goal1"></i>
            ) : (
                <></>
            )}
            {source === 'SUBJECT' ? (
                <i className="lcicon-class-goal2"></i>
            ) : (
                <></>
            )}
            {source === 'SCHOOL_EXEC' ? (
                <i className="lcicon-class-goal3"></i>
            ) : (
                <></>
            )}
            {source === 'CONSUL_N_OTHERS' ? (
                <i className="lcicon-class-goal4"></i>
            ) : (
                <></>
            )}

            <h4 className="class-goal-cate d-none d-lg-block">
                {source === 'ESSAY' ? '국어 독서 논술' : ''}
                {source === 'SUBJECT' ? '영수사과' : ''}
                {source === 'SCHOOL_EXEC' ? '학교수행' : ''}
                {source === 'CONSUL_N_OTHERS' ? '상담기타' : ''}
            </h4>
        </div>
    )
}

const ClassList = ({ dataSource }) => {
    const [data, setData] = useState({
        content: [],
    })

    useEffect(() => {
        if (dataSource.liveClassType === LiveClassType.LiveClassBook.value) {
            let body = {
                id: dataSource.tutorId,
            }

            ClassService.getLiveClassBookDetails(body)
                .then((resp) => {
                    if (resp.status === 200) {
                        setData(resp.data)
                    }
                })
                .catch((err) => {
                    console.error(err)
                })
        } else {
            ClassService.getLiveClassGoalDetails(
                dataSource.liveClassId
            )
                .then((resp) => {
                    if (resp.status === 200) {
                        let dataHolder = {
                            content: [{ ...resp.data }],
                        }

                        setData(dataHolder)
                    }
                })
                .catch((err) => {
                    console.error(err)
                })
        }
    }, [])

    function handleLike(liveClassId) {
        ClassCartService.addToCart(liveClassId).then((resp) => {
            if (resp.status === 201) {
                let contentList = [...data.content]

                for (let item of contentList) {
                    if (item.id === liveClassId) {
                        item.addedToCart = true

                        break
                    }
                }

                setData({ content: [...contentList] })
            }
        })
    }

    return (
        <>
            <section className="td-class-list">
                {data.content.map((item, index) => {
                    return (
                        <LiveClassDetailItem
                            key={index}
                            source={item}
                            type={dataSource.liveClassType}
                            onLiked={handleLike}
                        />
                    )
                })}
                <p className="curriculumn-note mt-3">
                    * LiveClass 책글 수업은 수업 결제는 전 월의 10일 이전에
                    진행해야 1주차부터 수업 참여가 가능합니다.
                </p>
            </section>
        </>
    )
}

export default ClassList
