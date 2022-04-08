import React, { useEffect, useState } from 'react'
import LCPagination from 'components/LCPagination'
import { Button, Collapse } from 'react-bootstrap'
import { UserService } from 'services/UserService'
import { UserStorage } from 'storages/UserStorage'
import { LiveClassType } from 'constants/class.constants'
import { DateUtils } from 'utils/DateUtils'
import { Link } from "react-router-dom"
import SearchNotFound from 'components/SearchNotFound'
import { ClassService } from 'services/ClassService'
import { NewspaperService } from 'services/NewspaperService'

export default function MyActivity({ childId }) {
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
        sort: 'openDate,desc',
    })

    const userId = childId ?? UserStorage.getLocalUserId()
    useEffect(() => {

        UserService.getClassesByUserId(
            userId,
            LiveClassType.TextBookClass.value,
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
            {data.content.length > 0 ?
                <section className="myactivity-section">
                    <div className="tablelist g700">
                        <div className="tablelist-header">
                            <div className="tcol-md-60 tcol-100 text-500 font-weight-lg-bold">
                                수업 정보
                            </div>
                            <div className="tcol-md-15 tcol-20 font-weight-bold d-none d-lg-block">
                                수업일시
                            </div>
                            <div className="tcol-20 font-weight-bold d-none d-lg-block">
                                지도교사
                            </div>
                        </div>

                        <div className="tablelist-body">
                            {data.content.map((clazz, index) => (
                                <ClassItem
                                    key={`clazz-item-${index}`}
                                    clazz={ { ...clazz, "childId": userId } }
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
                <SearchNotFound content="자녀 수업활동이 없습니다." />
            }
        </>
    )
}

function ClassItem({ clazz }) {
    const [open, setOpen] = useState(false)
    const [data, setData] = useState([])

    const handleChangeOpen = (event) => {
        
        if (data.length === 0) {
        
            ClassService.getLiveBookCurriculums(clazz.id, clazz.childId).then((resp) => {
                        
                if (resp.status === 200) {

                    setData(resp.data);
                    setOpen(true);
                }
            })
            
        } else {
        
            setOpen(!open);
        }
                    
    };
    
    return (
        <div className="tablelist-row-group">
            <div
                className="tablelist-row pointer"
                onClick={handleChangeOpen}
                aria-expanded={open}
            >
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
                <Collapse in={open}>
                    <div>
                        {
                            data.map((curriculumItem, index) => {
                                let sourceItem = {
                                    ...curriculumItem,
                                    "clazzId": clazz.id,
                                    "childId": clazz.childId
                                }

                                return (
                                    <ClassCurriculumItem 
                                        key={`ClassCurriculumItem_${clazz.id}_${clazz.childId}_${index}`}
                                        source={ sourceItem } 
                                    />
                                )
                            })
                        }
                    </div>
                </Collapse>
            </div>
        </div>
    )
}

function ClassCurriculumItem({ source }) {
    const weekNum = source.curriculumIndex + 1;

    const [newspaper, setNewspaper] = useState(null);

    // Ugly solution, need to update API to remove this later
    useEffect(() => {
        
        NewspaperService.getByCurriculum(source.clazzId, source.childId, source.curriculumIndex).then((resp) => {
  
            setNewspaper(resp.data);
        })
    }, [])

    return (
        <div className="tablelist-row g100">
            <div className="tcol-md-30 text-left mr-3">
                <span className="mr-3 text-500">{weekNum}주차</span>
                {source.classBook}
            </div>
            <div className="tcol-md-15 mr-3">{source.writer}</div>
            <div className="tcol-md-15 mr-3">{source.publisher}</div>
            <div className="tcol-md-35 text-right d-none d-lg-block">
                <Button
                    variant="g300"
                    className="btn-outline ml-1 btn-activity"
                    size="sm"
                    as={Link}
                    to={{
                        "pathname": "/my-class/class-activity",
                        "state": {
                            "url": source.activity1
                        }
                    }}
                    hidden={ source.activity1 === null }
                >
                    수업활동1
                </Button>
                <Button
                    variant="g300"
                    className="btn-outline ml-1 btn-activity"
                    size="sm"
                    as={Link}
                    to={{
                        "pathname": "/my-class/class-activity",
                        "state": {
                            "url": source.activity2
                        }
                    }}
                    hidden={ source.activity2 === null }
                >
                    수업활동2
                </Button>
                <Button
                    variant="m500"
                    className="btn-outline ml-1 btn-activity"
                    size="sm"
                    as={Link}
                    to={{
                        "pathname": "/my-class/newspaper",
                        "state": {
                            "classId": source.clazzId,
                            "curriculumIndex": source.curriculumIndex,
                            "studentId": source.childId
                        }
                    }}
                    hidden={ newspaper === null }
                >
                    신문칼럼
                </Button>
            </div>
        </div>        
    )
}