import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import LCPagination from 'components/LCPagination'
import { StudentService } from 'services/StudentService'
import { convertClassType } from 'constants/class.constants'
import SearchNotFound from 'components/SearchNotFound'
import { ClassType } from 'constants/class.constants'

export default function AvailableReview() {
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
        sort: 'id,desc',
    })

    const history = useHistory()

    useEffect(() => {
        StudentService.getClassValidForReview(pageable).then((resp) => {
            if (resp.status === 200) {
                setData(resp.data)
            }
        })
    }, [pageable])

    const onPageChange = (page) => {
        if (page >= 0) setPageable({ ...pageable, page })
    }

    const writenReview = (id, type, name) => {
        history.push('/write-review',
            { 'id': id, 'clazz': `[${convertClassType(type)}] ${name}` })
    }

    return (
        <>
            {data.content.length > 0 ?
                <section className="createnewreview-section">
                    <div className="tablelist g700">
                        <div className="tablelist-header">
                            <div className="tcol-md-50 tcol-100 font-weight-bold">
                                수업 정보
                            </div>
                            <div className="tcol-20 d-none d-lg-block font-weight-bold">
                                지도교사
                            </div>
                        </div>
                        <div className="tablelist-body">
                            {data.content.map((value, index) => (
                                <div key={index} className="tablelist-row">
                                    <div className="tcol-md-50 tcol-100 text-left text-500">
                                        <Link
                                            to={{
                                                pathname: value.classType === ClassType.DavinciClass.value ?
                                                    `/mathdavinci-details/${value.classId}` :
                                                    `/liveclass-details`,
                                                state: {
                                                    'liveClassInfo': {
                                                        'tutorId': value.tutorId,
                                                        'liveClassId': value.classId,
                                                        'liveClassType': value.classType
                                                    }
                                                }
                                            }}
                                        >
                                            [{convertClassType(value.classType)}] {value.className}
                                        </Link>
                                    </div>
                                    <div className="tcol-md-20 tcol-80 d-none d-lg-block">
                                        {value.tutorName}
                                    </div>
                                    <div className="tcol-md-30 tcol-100 mt-3 mt-lg-0">
                                        <Button
                                            variant="white"
                                            className="btw-260 btn-sm btn-outline btn-g300"
                                            onClick={() => writenReview(value.classId, value.classType, value.className)}
                                        >
                                            후기 작성하기
                                        </Button>
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
                <SearchNotFound content="작성 가능한 후기가  없습니다." />
            }
        </>
    )
}
