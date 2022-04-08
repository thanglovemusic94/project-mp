import React, { useState, useEffect } from 'react'
import { ClassReviewService } from 'services/ClassReviewService'
import { convertClassType } from 'constants/class.constants'
import { DateUtils } from 'utils/DateUtils'
import ReactStars from 'react-rating-stars-component'
import LCPagination from 'components/LCPagination'
import SearchNotFound from 'components/SearchNotFound'

export default function CreatedReview() {
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
        sort: 'createdOn,DESC',
    })

    useEffect(() => {
        ClassReviewService.getClassReviewByStudent(pageable).then((resp) => {
            if (resp.status === 200) {
                setData(resp.data)
            }
        })
    }, [pageable])

    const onPageChange = (page) => {
        if (page >= 0) setPageable({ ...pageable, page })
    }

    return (
        <>  {data.content.length > 0 ?
            <section className="createdreview-section">
                <div className="tablelist g700">
                    <div className="tablelist-header pl-5">
                        <div className="tcol-60 d-none d-lg-block text-left">
                            후기 내용
                        </div>
                        <div className="tcol-20 d-none d-lg-block text-center">작성일</div>
                        <div className="tcol-20 d-none d-lg-block text-left pl-5">별점</div>
                    </div>
                    <div className="tablelist-body">
                        {data.content.map((value, index) => (
                            <div key={index} className="tablelist-row pl-5 flex-column">
                                <div className="tcol-100 d-lg-flex justify-content-between">
                                    <div className="tcol-md-60 tcol-100 text-left">
                                        [{convertClassType(value.classInfo.type)}] {value.classInfo.name}
                                    </div>

                                    <div className="tcol-md-20 text-center">
                                        {DateUtils.toLocalDate(value.createdOn)}
                                    </div>
                                    <div className="tcol-md-20">
                                        <ReactStars
                                            count={5}
                                            emptyIcon={<i className="lcicon-star !important" />}
                                            filledIcon={<i className="lcicon-star-voted" />}
                                            value={value.rating}
                                            edit={false} />
                                    </div>
                                </div>
                                <div className="tcol-100 text-g500 text-left ml-4">
                                    {value.content}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="pagination-wrapper d-flex justify-content-center my-5">
                    <LCPagination
                        pageNumber={pageable.page}
                        totalPage={data.totalPages}
                        onPageChange={page => onPageChange(page)}
                    />
                </div>
            </section>
            :
            <SearchNotFound content="작성한 후기가 없습니다." />
        }
        </>
    )
}
