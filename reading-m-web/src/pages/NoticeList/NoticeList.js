import LCPagination from 'components/LCPagination'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DateTime from '../../components/common/DateTime'
import { getRole } from '../../constants/role.constants'
import { NoticeService } from '../../services/NoticeService'
import { addDays } from '../../utils/DateUtils'

export default function NoticeList() {
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
        sort: 'createdOn,desc',
    })

    function handlePageChange(page) {
        setPageable({ ...pageable, page })
    }

    useEffect(() => {
        NoticeService.findByQuery(pageable).then((resp) => {
            setData(resp.data)
        })
    }, [pageable])

    return (
        <>
            <div className="noticelist-body">
                <h2 className="page-title mb-4">공지사항 리스트</h2>
                <div className="tablelist g700">
                    <div className="tablelist-header d-flex">
                        <div className="tcol-5 d-none d-lg-block"></div>
                        <div className="tcol-10 d-none d-lg-block">구분</div>
                        <div className="tcol-70 d-none d-lg-block">
                            공지사항
                        </div>
                        <div className="tcol-15 d-none d-lg-block">등록일</div>
                        <div className="tcol-100 d-block d-lg-none">
                            공지사항 내용
                        </div>
                    </div>
                    <div className="tablelist-body">
                        {data.content.map((notice) => (
                            <NoticeItem
                                notice={notice}
                                key={`notice_item_${notice.id}`}
                            />
                        ))}
                    </div>
                </div>
                <div className="pagination-wrapper d-flex justify-content-center my-5">
                    <LCPagination
                        pageNumber={pageable.page}
                        totalPage={data.totalPages}
                        onPageChange={(num) => handlePageChange(num)}
                    />
                </div>
            </div>
        </>
    )
}

function NoticeItem({ notice }) {
    const today = new Date()

    return (
        <div className="tablelist-row">
            <div className="tcol-md-5 tcol-15">
                <span className="notice-label">
                    {today < addDays(new Date(notice.createdOn), 7) && (
                        <span>New</span>
                    )}
                </span>
            </div>
            <div className="tcol-md-10 tcol-15 text-500">
                {getRole(notice.role).label}
            </div>
            <div className="tcol-70 text-left">
                <Link
                    to={{
                        pathname: `/notice-details/${notice.id}`,
                        state: {
                            previousPage: '/notice-list'
                        }
                    }}
                >
                    {notice.title}
                </Link>
            </div>
            <div className="tcol-md-15 text-g500 ml-15">
                <DateTime date={notice.createdOn} format="YYYY.MM.DD" />
            </div>
        </div>
    )
}
