import LCPagination from 'components/LCPagination'
import SearchNotFound from 'components/SearchNotFound'
import { ClassType } from 'constants/class.constants'
import ModalCurriculum from 'pages/MyClass/Tutor/ModalCurriculum'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { UserService } from 'services/UserService'
import { UserStorage } from 'storages/UserStorage'

export default function TutorClassBook({ type }) {
    const history = useHistory();

    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)

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

    useEffect(() => {
        const userId = UserStorage.getLocalUserId()

        UserService.getClassesByUserId(userId, type, pageable).then((resp) => {

            if (resp.status === 200) {

                setData(resp.data)
            }
        })
    }, [pageable])

    function handlePageChange(pgNo) {
        if (pgNo >= 0) setPageable({ ...pageable, page: pgNo })
    }

    function handleOpenLiveClass() {
        if (type === ClassType.TextBookClass.value) {

            handleShow();
        } else {

            history.push({
                "pathname":"/tutor/my-class/open",
                "state": { 
                    "type": ClassType.GoalClass.value
                }
            })
        }
    }

    return (
        <>
            {
                data.content.length > 0 ?
                <section className="tutorclassbook-section">
                    <div className="text-right mb-3">
                        <Button
                            variant="m500"
                            className="btw-290 btn-sm"
                            onClick={ handleOpenLiveClass }
                        >
                            책글 개설하기
                        </Button>
                    </div>
                    <div className="tablelist g700">
                        <div className="tablelist-header">
                            <div className="tcol-100 tcol-md-50 font-weight-bold">
                                수업 정보
                            </div>
                            <div className="tcol-25 font-weight-bold d-none d-lg-block">
                                { type === ClassType.TextBookClass.value ? "수업일시" : "" }
                            </div>
                        </div>
                        <div className="tablelist-body">
                            {                            
                                data.content.map((item, index) => {

                                    return <DataItem key={ index } source={ item } type={ type } />
                                })
                            }
                        </div>
                    </div>
                    <div className="pagination-wrapper d-flex justify-content-center my-5">
                        <LCPagination
                            pageNumber={ pageable.page }
                            totalPage={ data.totalPages }
                            onPageChange={ handlePageChange }
                        />
                    </div>

                    <ModalCurriculum show={show} setShow={setShow} />
                </section>
                :
                <SearchNotFound content="내 수업이 없습니다." />
            }
        </>
    )
}

const DataItem = ({ source, type }) => {

    return (
        <div className="tablelist-row">
            {
                type === ClassType.TextBookClass.value ? 
                <>
                    <div className="tcol-md-50 tcol-100 text-left text-500">
                        { source.name }
                    </div>
                    <div className="tcol-md-25 tcol-50 text-g500 tclear">
                        { source.openDate }
                     </div>
                </>
                :
                <div className="tcol-md-75 tcol-100 text-left text-500">
                    <span className="classgoal-cate mb-1 mb-lg-0">
                        { source.category }
                    </span>

                    <br className="d-block d-lg-none" />
                    
                    [LiveClass 목적] { source.name }
                </div>
            }

            <div className="tcol-md-10 tcol-50">
                <Button
                    variant="g700"
                    className="btw-100 btn-sm btn-outline btn-edit-tutorbook"
                    as={Link}
                    to={{
                        "pathname": "/tutor/my-class/edit",
                        "state": {
                            "liveClassId": source.id,
                            "type": type
                        }
                    }}
                >
                    수정하기
                </Button>
            </div>
            <div className="tcol-md-15 tcol-100 tclear mt-3 mt-lg-0">
                <Button
                    variant="g300"
                    className="btw-168 btn-sm btn-outline"
                    as={Link}
                    to={{
                        "pathname": "/tutor/my-class/details",
                        "state": {
                            "liveClassId": source.id
                        }
                    }}
                >
                    수업 전체보기
                </Button>
            </div>
        </div>
    )
}