import CustomDropdown from 'components/CustomDropdown'
import { ClassType, GRADE_SELECTION, SCHOOL_GRADE, SCHOOL_STAGE_SELECTION } from 'constants/class.constants'
import React, { useContext, useEffect, useState } from 'react'
import {
    Accordion,
    AccordionContext,
    Button, Modal,
    useAccordionToggle
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ClassService } from 'services/ClassService'

const GRADE_MAP = {
    "GRADE_0": "G1",
    "GRADE_1": "G2",
    "GRADE_2": "G3",
    "GRADE_3": "G4",
    "GRADE_4": "G5",
    "GRADE_5": "G6",
    "GRADE_6": "G7",
    "GRADE_7": "G8",
    "GRADE_8": "G9"
}

export default function ModalCurriculum(props) {
    const [filter, setFilter] = useState({
        "school": "ALL",
        "grade": "ALL"
    })

    const [curriculumData, setCurriculumData] = useState([]);
    const [curriculumBooksData, setCurriculumBooksData] = useState({});

    const [currentDate, ] = useState(new Date());
    const [selectedCurriculum, setSelectedCurriculum] = useState(null);

    // This is to set the curriculum books for the selected curriculums after get it from server.
    useEffect(() => {

        if (selectedCurriculum && !selectedCurriculum.curriculumBooks) {
            
            setSelectedCurriculum({ 
                ...selectedCurriculum,
                "curriculumBooks": curriculumBooksData[`${selectedCurriculum.cidx}`]
            })
        }
    }, [selectedCurriculum])

    useEffect(() => {
        
        if (props.show === true) {
            
            fetchData();
        }
    }, [props.show])

    function getCurriculumTextbook(cIdx) {

        ClassService.getCurriculumBooksRAMS(cIdx).then((resp) => {

            if (resp.status === 200) {
                let newCurriculumBooksData = { ...curriculumBooksData }

                newCurriculumBooksData[`${cIdx}`] = resp.data;

                setCurriculumBooksData(newCurriculumBooksData);
            }
        })
    }

    function fetchData() {
        
        ClassService.getCurriculumListRAMS(filter).then((resp) => {

            if (resp.status === 200) {

                setCurriculumData(resp.data);

                if (resp.data.length > 0) {

                    getCurriculumTextbook(resp.data[0].cidx);

                    const curriculumDateString = `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월`;

                    const schoolGrade = SCHOOL_GRADE[GRADE_MAP[resp.data[0].cgrade]];
                    const targetStudentString = `${ schoolGrade.stage.label } ${ schoolGrade.label }`;

                    setSelectedCurriculum({ ...resp.data[0], curriculumDateString, targetStudentString });
                }
            }
        })
    }

    function handleChange(ev, val) {
        const name = ev.target.name;

        setFilter({ ...filter, [name]: val});
    }

    function handleCurriculumSelect(curriculum) {

        if (!curriculumBooksData[`${curriculum.cidx}`]) {

            getCurriculumTextbook(curriculum.cidx);
            setSelectedCurriculum({ ...curriculum });
        } else {
            const curriculumBooks = curriculumBooksData[`${curriculum.cidx}`];

            setSelectedCurriculum({ ...curriculum, curriculumBooks });
        }
    }

    function handleFilter() {

        fetchData();
    }

    return (
        <>
            <Modal
                show={props.show}
                onHide={() => props.setShow(false)}
                dialogClassName="modalw-590 modalh-800 modal-changepassword"
                centered
            >
                <Modal.Header className="justify-content-center">
                    <Modal.Title>LiveClass 책글 개설하기</Modal.Title>
                </Modal.Header>
                
                <Modal.Body scrollable="true">
                    <div className="modal-body-inner">
                        <div className="d-lg-flex">
                            <div className="d-flex">
                                <CustomDropdown
                                    name="school"
                                    className="ipw-220 tcol-50"
                                    classNameToggle="btn-sm"
                                    items={ SCHOOL_STAGE_SELECTION }
                                    onChange={ handleChange }
                                />
                                <CustomDropdown
                                    name="grade"
                                    className="ipw-220 mx-2 tcol-50"
                                    classNameToggle="btn-sm"
                                    items={ GRADE_SELECTION }
                                    onChange={ handleChange }
                                />
                            </div>
                            <Button
                                variant="g700"
                                className="btn-sm btn-square flex-grow-lg-1 tcol-100 mt-2 mt-lg-0"
                                onClick={handleFilter}
                            >
                                검색
                            </Button>
                        </div>

                        <Accordion defaultActiveKey="0">
                            <div className="tablelist tablelist-curriculum mt-3">
                                <div className="tablelist-header">
                                    <div className="tcol-10"></div>
                                    <div className="tcol-40 tcol-100">
                                        대상 학생
                                    </div>
                                    <div className="tcol-40 tcol-100">
                                        커리큘럼
                                    </div>
                                </div>
                                
                                <div className="tablelist-body">
                                    {
                                        curriculumData.map((item, index) => {
                                            const curriculumDateString = `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월`;

                                            const schoolGrade = SCHOOL_GRADE[GRADE_MAP[item.cgrade]];
                                            const targetStudentString = `${ schoolGrade.stage.label } ${ schoolGrade.label }`;
                                            
                                            return <CurriculumItem 
                                                key={ `CurriculumItem_${index}` } 
                                                source={ 
                                                    { 
                                                        ...item, 
                                                        index, 
                                                        curriculumDateString,
                                                        targetStudentString,
                                                        "curriculumBooks": curriculumBooksData[`${item.cidx}`] 
                                                    } 
                                                } 
                                                itemSelect={ handleCurriculumSelect }
                                            />
                                        })
                                    }
                                </div>
                            </div>
                        </Accordion>
                    </div>
                </Modal.Body>
                
                <Modal.Footer className="modal-btn-half">
                    <Button variant="g200" onClick={() => props.setShow(false)}>
                        취소
                    </Button>
                    <Button 
                        variant="p500" 
                        as={Link} 
                        to={{
                            "pathname": "/tutor/my-class/open",
                            "state": {
                                "type": ClassType.TextBookClass.value,
                                "curriculum": selectedCurriculum
                            }
                        }}
                    >
                        확인
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

function CustomToggle({ children, eventKey, callback }) {
    const currentEventKey = useContext(AccordionContext)
    const isCurrentEventKey = currentEventKey === eventKey
    const toggleOnClick = useAccordionToggle(eventKey, () => callback && callback(eventKey))

    return (
        <div
            className={isCurrentEventKey ? 'selected' : null}
            onClick={toggleOnClick}
        >
            {children}
        </div>
    )
}

function CurriculumItem({ source, itemSelect }) {

    function handleSelect(k) {

        if (itemSelect)
            itemSelect(source)
    }

    return (
        <div className="tablelist-row-group">
            <CustomToggle eventKey={`${ source.index }`} callback={ handleSelect }>
                <div className="tablelist-row pointer">
                    <div className="tcol-10">
                        <span className="curriculum-check"></span>
                    </div>
                    <div className="tcol-md-40 tcol-35 text-center">
                        { source.targetStudentString }
                    </div>
                    <div className="tcol-md-40 tcol-50 text-right">
                        { source.curriculumDateString } 커리큘럼
                    </div>
                    <span className="toggle-action">
                        <i className="lcicon-dropClose"></i>
                    </span>
                </div>
            </CustomToggle>

            {
                source.curriculumBooks && 
                <div className="tablelist-row-group tablelist-row-collapse">
                    <Accordion.Collapse eventKey={`${ source.index }`}>
                        <div>
                        {
                            source.curriculumBooks.map((item, index) => {

                                return (
                                    <div key={`CurriculumBooks_${index}`}>
                                        <div className="tablelist-row d-flex g100">
                                            <div className="tcol-10"></div>
                                            <div className="tcol-35 tcol-md-40">
                                                <span className="mr-2 mr-lg-3">
                                                    { item.week }주차
                                                </span>
                                                { item.title }
                                            </div>
                                            <div className="tcol-md-40 tcol-50 text-right">
                                                <span className="mr-3">
                                                    { item.writer }
                                                </span>
                                                { item.publisher }
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        </div>
                    </Accordion.Collapse>
                </div>
            }
        </div>
    )
}