import FormattedDateTime from 'components/common/FormattedDateTime';
import LCPagination from 'components/LCPagination'
import SearchNotFound from 'components/SearchNotFound';
import { ClassType } from 'constants/class.constants';
import React, { useEffect, useState } from 'react'
import { Button, Collapse } from 'react-bootstrap'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { ClassService } from 'services/ClassService';

function TutorActivityInfoItem({ source }) {
    const weekNum = source.index + 1;

    return (
        <>
            <div className="tcol-md-50 tcol-35 text-left">
                <span className="mr-3 text-500  text-500 ">
                    {weekNum}주차
                </span>
                {source.book.title}
            </div>
            <div className="tcol-md-10  tcol-15">
                {source.book.author}
            </div>
            <div className="tcol-md-10">{source.book.publisher}</div>
            <div className="tcol-100 tcol-md-30 tclear text-lg-right btn-tutor">
                <Button
                    variant="white"
                    className="btw-260 mt-3 mt-lg-0 btn-outline-g300 btn-square btn-icon"
                    // as={Link}
                    // to="/images/myw3schoolsimage.jpg"
                    // download
                    size="sm"
                >
                    <i className="lcicon-download"></i>
                    수업활동 다운
                </Button>
            </div>

        </>
    )
}

function TutorActivityItem({ source }) {
    const [collapse, setCollapse] = useState(false);

    const title = `[${ClassType[`${source.type}`].label}] ${source.name}`;

    return (
        <>
            <div className="tablelist-header">
                <div className="tcol-md-70 tcol-100 ">수업 정보</div>
                <div className="tcol-25 d-none d-lg-block">수업일시</div>
            </div>

            <div className="tablelist-body">
                <div className="tablelist-row-group">
                    <div
                        className="tablelist-row pointer"
                        onClick={() => setCollapse(!collapse)}
                        aria-expanded={collapse}
                    >
                        <div className="tcol-md-70 tcol-100 text-left text-500">
                            {title}
                        </div>
                        <div className="tcol-25 text-g500 tclear">
                            <FormattedDateTime source={source.openDate} format="YYYY.MM" />
                        </div>
                        <span className="toggle-action">
                            <i className="lcicon-dropClose"></i>
                        </span>
                    </div>

                    <div className="tablelist-row-group tablelist-row-collapse">
                        <Collapse in={collapse}>
                            <div id="answer2">
                                {
                                    source.curriculum.map((item, index) => {

                                        return (
                                            <div
                                                key={`TutorActivityInfoItem_${index}`}
                                                className="tablelist-row g100"
                                            >
                                                <TutorActivityInfoItem
                                                    source={
                                                        {
                                                            ...item,
                                                            index
                                                        }
                                                    }
                                                />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </Collapse>
                    </div>
                </div>
            </div>
        </>
    )
}

export default function TutorActivityList() {
    const [data, setData] = useState({
        "content": [],
        "totalPages": 0
    });

    const [pageable, setPageable] = useState({
        "page": 0,
        "size": 10
    });

    function handlePageChange(newPage) {
        setPageable({ ...pageable, "page": newPage });
    }

    useEffect(() => {

        ClassService.getLiveClassActivities(pageable).then((resp) => {

            if (resp.status === 200) {

                setData(resp.data);
            }
        })
    }, [pageable])

    return (
        <>
            {
                data.content.length === 0 ?
                    <SearchNotFound content="수업활동 리스트가 없습니다."/>
                    :
                    <>
                        <div className="tablelist g700">
                            {
                                data.content.map((item, index) => {

                                    return (
                                        <TutorActivityItem
                                            key={`TutorActivityItem_${index}`}
                                            source={item}
                                        />
                                    )
                                })
                            }
                        </div>

                        <div className="pagination-wrapper d-flex justify-content-center my-5">
                            <LCPagination
                                pageNumber={pageable.page}
                                totalPage={data.totalPages}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </>
            }
        </>
    )
}
