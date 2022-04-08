import React, { useState, useEffect } from 'react'
import { Button, Collapse } from 'react-bootstrap'
import LCPagination from 'components/LCPagination'
import { DateUtils } from 'utils/DateUtils'
import { Link } from "react-router-dom";
import SearchNotFound from "../../../components/SearchNotFound";
import { LiveClassType } from 'constants/class.constants';
import { UserService } from 'services/UserService';
import { UserStorage } from 'storages/UserStorage';
import { ClassService } from 'services/ClassService';
import { convertAttend } from 'constants/class.attended.constants';

export default function MyClassBook({ childId }) {
    const [pageable, setPageable] = useState({
        page: 0,
        size: 10,
        sort: 'openDate,desc',
    })

    const classType = LiveClassType.TextBookClass.value
    const [data, setData] = useState({ content: [] })
    const userId = childId ?? UserStorage.getLocalUserId()

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
    }, [pageable, userId])

    function handlePageChange(pgNo) {
        if (pgNo >= 0) setPageable({ ...pageable, page: pgNo })
    }
    return (
        <>
            {
                data.content.length > 0 ?
                    <section className="myclassbook-section">
                        <div className="tablelist g700">
                            <div className="tablelist-header">
                                <div className="tcol-md-60 tcol-100 text-center label font-weight-bold">
                                    수업 정보
                                </div>
                                <div className="tcol-md-15 tcol-20 d-none d-lg-block font-weight-bold">
                                    수업일시
                                </div>
                                <div className="tcol-20 d-none d-lg-block font-weight-bold">
                                    지도교사
                                </div>
                            </div>
                            <div className="tablelist-body">
                                {data.content.map((clazz, index) => (
                                    <ClassItem
                                        key={index}
                                        clazz={clazz}
                                        index={index}
                                        childId={childId}
                                        params={pageable}
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
                    <SearchNotFound content={'내 수업이 없습니다.'} />
            }

        </>
    )
}

function ClassItem({ clazz, index, childId, params }) {
    const [open, setOpen] = useState(new Array(params.size).fill(false))
    const [data, setData] = useState(null);

    const handleChangeOpen = (event, index) => {
        setOpen(open.map((item, idx) => {
            if (idx === index) {
                item = !item
                if (item === true) {
                    ClassService.getLiveBookCurriculums(clazz.id, childId).then((resp) => {
                        if (resp.status === 200) {
                            setData(resp.data)
                        }
                    })
                }
                return item;
            } else return item

        }));
    };

    return (
        <div className="tablelist-row-group">
            <div
                className="tablelist-row pointer"
                onClick={(e) => handleChangeOpen(e, index)}
                aria-expanded={open[index]}>
                <div className="tcol-md-60 tcol-100 text-left label text-500">
                    [LiveClass 책글] {clazz.name}
                </div>
                <div className="tcol-md-15 tcol-35 title-opendate text-g500">
                    {DateUtils.toLocalDate(clazz.openDate)}
                </div>
                <div className="tcol-20 title-name">{clazz.tutor.name}</div>
                <span className="toggle-action">
                    <i className="lcicon-dropClose"></i>
                </span>
            </div>

            <div className="tablelist-row-group">
                <Collapse in={open[index]} key={index}>
                    <div className="answer1">
                        {data?.map((value, index) => {
                            const { attend, color, icon } = convertAttend(value.present, value.end)
                            return (
                                <React.Fragment key={index}>
                                    <div className="tablelist-row g100">
                                        <div className="tcol-md-30 text-left mr-3">
                                            <span className="mr-3 text-500">{value.curriculumIndex + 1} 주차</span>
                                            {value.classBook}
                                        </div>
                                        <div className="tcol-md-15 mr-3 text-left">{value.writer}</div>
                                        <div className="tcol-md-20 mr-3 text-left">{value.publisher}</div>
                                        <div className="tcol-md-30 text-lg-right d-flex d-lg-block mt-2">
                                            <span className={`status-attendance ${color}`}>
                                                {attend}
                                            </span>
                                            <Button
                                                variant="white"
                                                className="btw-224 btn-outline-g300"
                                                size="sm"
                                                as={Link}
                                                to={{
                                                    pathname: "/my-class/book-detail",
                                                    state: {
                                                        classId: clazz.id,
                                                        curriculumIndex: value.curriculumIndex,
                                                        studentId: clazz.childId,
                                                        icon: icon
                                                    }
                                                }}
                                            >
                                                교실로 가기
                                            </Button>
                                        </div>
                                    </div>
                                </React.Fragment>
                            )
                        })}
                    </div>
                </Collapse>
            </div>
        </div>
    )
}
