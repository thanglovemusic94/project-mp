import LCPagination from 'components/LCPagination'
import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function TutorClassGoal() {
    return (
        <>
            <section className="tutorclassgoal-section">
                <div className="text-right mb-3">
                    <Button
                        variant="b500"
                        className="btw-290 btn-sm"
                        as={Link}
                        to="/move-to-9.4.1"
                    >
                        목적 개설하기
                    </Button>
                </div>
                <div className="tablelist g700">
                    <div className="tablelist-header">
                        <div className="tcol-100 tcol-md-50 font-weight-bold">
                            수업 정보
                        </div>
                    </div>
                    <div className="tablelist-body">
                        <div className="tablelist-row">
                            <div className="tcol-md-75 tcol-100 text-left text-500">
                                <span className="classgoal-cate mb-1 mb-lg-0">
                                    학교수행
                                </span>
                                <br className="d-block d-lg-none" />
                                [LiveClass 책글] 초등 6 필독 독서 수업
                            </div>
                            <div className="tcol-md-10 tcol-100">
                                <Button
                                    variant="g700"
                                    className="btw-100 btn-sm btn-outline btn-edit-tutorgola"
                                    as={Link}
                                    to="/move-to-9.2.3"
                                >
                                    수정하기
                                </Button>
                            </div>
                            <div className="tcol-md-15 tcol-100 tclear mt-2 mt-lg-0">
                                <Button
                                    variant="g300"
                                    className="btw-168 btn-sm btn-outline"
                                    as={Link}
                                    to="/move-to-9.2.2"
                                >
                                    수업 전체보기
                                </Button>
                            </div>
                        </div>
                        <div className="tablelist-row">
                            <div className="tcol-md-75 tcol-100 text-left text-500">
                                <span className="classgoal-cate mb-1 mb-lg-0">
                                    학교수행
                                </span>
                                <br className="d-block d-lg-none" />
                                [LiveClass 책글] 초등 6 필독 독서 수업
                            </div>
                            <div className="tcol-md-10 tcol-100">
                                <Button
                                    variant="g700"
                                    className="btw-100 btn-sm btn-outline btn-edit-tutorgola"
                                    as={Link}
                                    to="/move-to-9.2.3"
                                >
                                    수정하기
                                </Button>
                            </div>
                            <div className="tcol-md-15 tcol-100 tclear mt-2 mt-lg-0">
                                <Button
                                    variant="g300"
                                    className="btw-168 btn-sm btn-outline"
                                    as={Link}
                                    to="/move-to-9.2.2"
                                >
                                    수업 전체보기
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pagination-wrapper d-flex justify-content-center my-5">
                    <LCPagination
                        pageNumber={0}
                        totalPage={10}
                        onPageChange={() => {}}
                    />
                </div>
            </section>
        </>
    )
}
