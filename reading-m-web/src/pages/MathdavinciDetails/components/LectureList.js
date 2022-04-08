import React, {useState, useEffect} from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Currency from 'components/common/Currency'
import { UserStorage } from 'storages/UserStorage'
import { UserRole } from 'constants/role.constants'

const LectureList = ({classInfo}) => {
    const userRole = UserStorage.getLocalUserRole()
    const [checkAll, setCheckAll] = useState(false)
    const [checkList, setCheckList] = useState([])
    const [isSelectedLecture, setSelectedLecture] = useState(false)

    useEffect(() => {
        if(classInfo) {
            setCheckList(classInfo.videos.map(v => false))
        }
    }, [classInfo])

    const onSelectAll = e => {
        setCheckAll(e.target.checked)
        setCheckList([...checkList.fill(e.target.checked)])
        setSelectedLecture(e.target.checked)
    }

    const onSelectOne = (e, i) => {
        checkList[i] = e.target.checked
        setCheckList([...checkList])
        if (checkList[i] && !isSelectedLecture) {
            setSelectedLecture(true)
        }
        if (checkList.find(check => check === !e.target.checked) === undefined) {
            setCheckAll(e.target.checked)
            if (!e.target.checked) {
                setSelectedLecture(false)
            }
        }
    }
    return (
        <>
            <section className="lecturelist-body">
                <div className="tablelist g700">
                    <div className="tablelist-header">
                        <div className="tcol-15 tcol-md-10 mt-1 mt-lg-2">
                            <Form.Check
                                className="form-check-custom no-label white"
                                label=""
                                type="checkbox"
                                id={`condition-all`}
                                checked={checkAll}
                                onChange={onSelectAll}
                            />
                        </div>
                        <div className="tcol-10 d-none d-lg-block">강의</div>
                        <div className="tcol-50 d-none d-lg-block">
                            강의 제목
                        </div>
                        <div className="tcol-15 d-none d-lg-block">
                            강의 시간
                        </div>
                        <div className="tcol-md-15 tcol-60 lecture-info d-block d-lg-none">
                            강의 정보
                        </div>
                        <div className="tcol-md-15 tcol-30">강의 가격</div>
                    </div>
                    <div className="tablelist-body">
                        {
                            classInfo && classInfo.videos.map((video, i) => 
                                <div className="tablelist-row" key={i}>
                                    <div className="tcol-15 tcol-md-10 lecture-check">
                                        <Form.Check
                                            className="form-check-custom no-label g700"
                                            label=""
                                            type="checkbox"
                                            id={`condition-${i}`}
                                            checked={checkList[i]}
                                            onChange={e => onSelectOne(e, i)}
                                        />
                                    </div>
                                    <div className="tcol-10 ">{i + 1}강</div>
                                    <div className="tcol-md-50 tcol-70 text-left">
                                        {video.name}
                                    </div>
                                    <div className="tcol-md-15 tcol-50">{video.time}분</div>
                                    <div className="tcol-md-15 tcol-35 text-danger text-500 text-lg-center text-right">
                                         <Currency amount={video.fee} />
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
                {
                    userRole === UserRole.PARENT.value &&
                    <div className="text-right mt-4">
                        { isSelectedLecture ?
                            <Button
                                variant="p500"
                                as={Link}
                                className="btw-290 btn-payment"
                                to={{
                                    pathname: '/payment',
                                    state: {...classInfo, checkList},
                                }}
                            >
                            결제하기
                            </Button>
                            :
                            <Button
                                variant="p500"
                                className="btw-290 btn-payment"
                            >
                                결제하기
                            </Button>
                        }
                        
                    </div>
                }

            </section>
        </>
    )
}

export default LectureList