import React, { useState } from 'react'
import { Button, Collapse } from 'react-bootstrap'
import { Link } from "react-router-dom";
import LCPagination from 'components/LCPagination'
import { convertGoalClassCategory } from 'constants/goal.class.category.constants'
import useClassesByUserId from "./customHook/useClassesByUserId";
import { ClassService } from 'services/ClassService';
import SearchNotFound from "../../../components/SearchNotFound";
import { UserStorage } from "../../../storages/UserStorage";
import { classDateFormat } from 'constants/datetime.constants';
import { convertAttend } from 'constants/class.attended.constants';

export default function MyClassGoal({ childId, classType }) {
    const [pageable, setPageable] = useState({
        page: 0,
        size: 10,
        sort: 'openDate,desc',
    })
    const userId = childId ?? UserStorage.getLocalUserId()
    const { data } = useClassesByUserId(classType, pageable, userId)
    function handlePageChange(pgNo) {
        if (pgNo >= 0) setPageable({ ...pageable, page: pgNo })
    }

    return (
        <>
            {
                data.content.length ?
                    <section className="myclassgoal-section">
                        <div className="tablelist g700">
                            <div className="tablelist-header">
                                <div className="tcol-md-70 tcol-100 text-center font-weight-bold">
                                    수업 정보
                                </div>
                                <div className="tcol-25 d-none d-lg-block font-weight-bold">
                                    지도교사
                                </div>
                            </div>
                            <div className="tablelist-body">
                                {data.content.map((clazz, index) => (
                                    <GoalClassItem
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
                    <SearchNotFound content={'자녀 수업이 없습니다.'} />
            }
        </>
    )
}

function GoalClassItem({ clazz, index, childId, params }) {
    const [open, setOpen] = useState(new Array(params.size).fill(false))
    const [data, setData] = useState(null);

    const handleChangeOpen = (event, index) => {
        setOpen(open.map((item, idx) => {
            if (idx === index) {
                item = !item
                if (item === true) {
                    ClassService.getLiveGoalCurriculums(clazz.id, childId).then((resp) => {
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
                aria-controls={`example-collapse-text ${index}`}
                aria-expanded={open[index]}
            >
                <div className="tcol-md-70 tcol-100 text-left label text-500 mt-2 mt-lg-0">
                    <span className="classgoal-cate">{convertGoalClassCategory(clazz.category)}</span>
                    [LiveClass 목적] {clazz.name}
                </div>
                <div className="tcol-25 title-name tclear mt-1 mt-lg-0">
                    {clazz.tutor.name}
                </div>
                <span className="toggle-action">
                    <i className="lcicon-dropClose"></i>
                </span>
            </div>
            <div className="tablelist-row-group">
                <Collapse in={open[index]} key={index}>
                    <div>
                        {data?.map((value, index) => {
                            const { attend, color, icon } = convertAttend(value.present, value.start)
                            return (
                                <React.Fragment key={index}>
                                    <div className="tablelist-row g300 ">
                                        <div className="tcol-100 tcol-md-35 text-left">
                                            <span className="mr-3 text-500">{value.curriculumIndex + 1} 주차</span>
                                            {value.name}
                                        </div>
                                        <div className="tcol-100 tcol-md-30 text-g500">
                                            {classDateFormat(new Date(value.start), new Date(value.end))}
                                        </div>
                                        <div className="tcol-100 tcol-md-35 text-lg-right d-flex d-lg-block mt-2 mt-lg-0">
                                            <span className={`status-attendance ${color}`}>
                                                {attend}
                                            </span>
                                            <Button
                                                variant="white"
                                                className="btw-224 btn-outline-g300"
                                                size="sm"
                                                as={Link}
                                                to={{
                                                    pathname: "/my-class/goal-detail",
                                                    state: {
                                                        'classInfo': {
                                                            'classId': clazz.id,
                                                            'curriculumIndex': value.curriculumIndex,
                                                            'icon': icon
                                                        }
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
