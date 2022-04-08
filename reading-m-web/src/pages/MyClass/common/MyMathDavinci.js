import React, { useState, useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import LCPagination from 'components/LCPagination';
import SearchNotFound from 'components/SearchNotFound';
import { DateUtils } from 'utils/DateUtils';
import { ClassService } from 'services/ClassService';
import { UserService } from 'services/UserService';
import { UserStorage } from 'storages/UserStorage';
import { LiveClassType } from './../../../constants/class.constants';

export default function MyMathDavinci({ childId }) {
    const [pageable, setPageable] = useState({
        page: 0,
        size: 10,
        sort: 'id,desc',
    })

    const classType = LiveClassType.DavinciClass.value
    const userId = childId ?? UserStorage.getLocalUserId()

    const [data, setData] = useState({ content: [] })
    const [show, setShow] = useState(false)
    const history = useHistory()

    function handlePageChange(pgNo) {
        if (pgNo >= 0) setPageable({ ...pageable, page: pgNo })
    }

    useEffect(() => {
        UserService.getClassesByUserId(
            userId,
            classType,
            pageable
        ).then((resp) => {
            if (resp.status === 200) {
                setData(resp.data)
            }
        })
    }, [pageable, childId])

    const handleGoToRom = (clazz) => {
        ClassService.isDavinciClassExpired(clazz.id, childId)
            .then((resp) => {
                if (resp.status === 200) {
                    if (resp.data) {
                        setShow(true);
                    } else {
                        history.push("/my-class/davinci-detail",
                            {
                                'classInfo': {
                                    'classId': clazz.id,
                                    'childId': childId,
                                    'className': clazz.name
                                }
                            })
                    }
                }
            })
            .catch((err) => {
                console.error(err)
            })
    }

    return (
        <>
            {
                data.content.length ?
                    <section className="mymathdavinci-section mb-5">
                        <div className="tablelist g700">
                            <div className="tablelist-header">
                                <div className="tcol-md-50 tcol-100">강의 정보</div>
                                <div className="tcol-20 d-none d-lg-block">
                                    결제일시
                                </div>
                            </div>
                            <div className="tablelist-body">
                                {data.content.map((clazz, index) => (
                                    <DavinciClassItem
                                        key={index}
                                        clazz={clazz}
                                        handleGoToRom={handleGoToRom}
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
            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modalw-386 modal-comfirm"
                centered
            >
                <Modal.Body scrollable={true}>
                    <div className="modal-body-inner flex-column">
                        <p className="mb-0">수강 기간이 종료되었습니다.</p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal-btn-half">
                    <Button variant="g700" onClick={() => setShow(false)}>
                        확인
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

function DavinciClassItem({ clazz, handleGoToRom }) {

    return (
        <div className="tablelist-row">
            <div className="tcol-md-50 tcol-80 text-left">[과학수학 다빈치] {clazz.name}</div>
            <div className="tcol-20">{DateUtils.toLocalDate(clazz.openDate)}</div>
            <div className="tcol-md-30 tcol-100 tclear text-lg-right">
                <Button
                    variant="white"
                    className="btw-224 btn-outline-g300"
                    size="sm"
                    onClick={() => handleGoToRom(clazz)}
                >
                    교실로 가기
                </Button>
            </div>
        </div>
    )
}
