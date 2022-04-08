import React, {useEffect, useState} from 'react'
import { Pagination } from 'react-bootstrap'
import { ClassReviewService } from 'services/ClassReviewService'
import DateTime from 'components/common/DateTime'

const LectureReviews = ({classId}) => {
    const [pageable, setPageable] = useState({
        pageNumber: 0,
        pageSize: 10
    })

    const [data, setData] = useState({content: []})

    useEffect(() => {
        let body = {
            ...pageable,
            id: classId
        }

        ClassReviewService.getReviews(body).then((resp) => {
            if (resp.status === 200) {
                setData(resp.data)
            }
        })
    }, [pageable])

    const onPageChange = (pageNumber) => {
        if (pageNumber >= 0 && pageNumber < data.totalPages) {
            setPageable({...pageable, pageNumber})
        }    
    }

    return (
        <>
            <section className="lecture-review-body">
                <div className="tablelist g700">
                    <div className="tablelist-header font-weight-bold">
                        <div className="tcol-100 tcol-md-50">후기내용</div>
                        <div className="tcol-20 d-none d-lg-block">작성자</div>
                        <div className="tcol-10  d-none d-lg-block">작성일</div>
                        <div className="tcol-md-20 tcol-25 d-none d-lg-block">
                            별점
                        </div>
                    </div>
                    <div className="tablelist-body">
                        {data.content.map((item, index) => 
                            <div className="tablelist-row" key={index}>
                                <div className="tcol-100 tcol-md-50 text-left">
                                    <h5> [과학수학 다빈치] {item.classInfo.name}</h5>
                                    <div className="d-flex tcol-review">
                                        <div className="tcol-20">{item.writer.name}</div>
                                        <div className="tcol-md-40 tcol-25 text-g500">
                                            <DateTime format="YYYY.MM.DD" date={item.createdOn} />
                                        </div>
                                        <div className="tcol-40">
                                            <div className={`star-box voted-${Math.round(item.rating)}`}>
                                                <i className="lcicon-star"></i>
                                                <i className="lcicon-star"></i>
                                                <i className="lcicon-star"></i>
                                                <i className="lcicon-star"></i>
                                                <i className="lcicon-star"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="mb-0 text-g500">
                                        {item.content}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
            <div className="pagination-wrapper d-flex justify-content-center my-5">
                <Pagination>
                    <Pagination.First onClick={() => onPageChange(0)}/>
                    <Pagination.Prev onClick={() => onPageChange(pageable.pageNumber - 1)}/>
                    <Pagination>{Array(data.totalPages).fill(0).map((item, index) => 
                        <Pagination.Item key={index} 
                            active={index === data.number}
                            onClick={() => onPageChange(index)}
                        >
                            {index + 1}
                        </Pagination.Item>   
                    )}</Pagination>
                    <Pagination.Next onClick={() => onPageChange(pageable.pageNumber + 1)}/>
                    <Pagination.Last onClick={() => onPageChange(data.totalPages - 1)}/>
                </Pagination>
            </div>
        </>
    )
}

export default LectureReviews
