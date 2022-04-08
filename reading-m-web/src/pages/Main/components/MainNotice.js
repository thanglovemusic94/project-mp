import React, { useEffect, useState } from 'react'
import DateTime from '../../../components/common/DateTime'
import { NoticeService } from '../../../services/NoticeService'
import { addDays } from '../../../utils/DateUtils'
import { Link } from 'react-router-dom'

export default function MainNotice() {
    const [notices, setNotices] = useState([])

    useEffect(() => {
        NoticeService.findByQuery({
            page: 0,
            size: 5,
            sort: 'createdOn,desc',
        })
            .then((resp) => {
                setNotices(resp.data.content)
            })
            .catch((err) => console.log(err))
    }, [])

    return (
        <>
            <section className="main-section main-notice">
                <div className="main-container">
                    <div className="row">
                        <div className="col-lg-6">
                            <h3 className="section-title">
                                공지사항{' '}
                                <Link to="/notice-list">+ 전체보기</Link>
                            </h3>
                            <div className="notice-list on-main">
                                <div className="notice-body">
                                    <ul className="reset-list">
                                        {notices.map((notice, index) => (
                                            <NoticeItem key={`MainNotice_noticeList_${index}`} notice={notice} />
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 d-flex justify-content-center align-items-center">
                            <div className="mt-lg-0 mt-5">
                                <Link
                                    to="/notice-details/1"
                                    className="notice-link liveclass-platform"
                                >
                                    <i className="lcicon-liveclassPlatform"></i>
                                    <span>LiveClass 리딩엠 플랫폼</span>
                                </Link>
                                <Link
                                    to="/notice-details/3"
                                    className="notice-link tutor-process"
                                >
                                    <i className="lcicon-tutorProcess"></i>
                                    <span>지도교사 선발과정</span>
                                </Link>
                                <Link
                                    to="/tutor-apply"
                                    className="notice-link tutor-apply"
                                >
                                    <i className="lcicon-tutorApply"></i>
                                    <span>지도교사 지원하기</span>
                                </Link>
                                <Link
                                    to="/"
                                    className="notice-link liveclass-introduction"
                                >
                                    <i className="lcicon-liveclassIntroduction"></i>
                                    <span>리딩엠 회사소개</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

function NoticeItem({ notice }) {
    const today = new Date()

    return (
        <li>
            <span className="notice-label">
                {today < addDays(new Date(notice.createdOn), 7) && (
                    <span>New</span>
                )}
            </span>

            <span className="notice-title">
                <Link
                    to={{
                        pathname: `/notice-details/${notice.id}`,
                        state: {
                            previousPage: '/'
                        }
                    }}
                >
                    {notice.title}
                </Link>
            </span>
            <span className="notice-date text-g500">
                <DateTime date={notice.createdOn} format="YYYY.MM.DD" />
            </span>
        </li>
    )
}
