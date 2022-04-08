import React, { useEffect, useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import LectureList from './components/LectureList'
import LectureReview from './components/LectureReview'
import MathdavinciPhoto from '../../assets/images/mathdavinci-details.jpg'
import { ClassService } from 'services/ClassService'
import Currency from 'components/common/Currency'
import { UserStorage } from 'storages/UserStorage'
import { UserRole } from 'constants/role.constants'
import { ClassCartService } from 'services/ClassCartService'
import { LiveClassType } from 'constants/class.constants'

const MathdavinciDetails = (props) => {
    const [davinciClass, setDavinciClass] = useState({
        id: props.match.params.id,
        imageUrl: null,
        name: "",
        grade: "",
        materials: "",
        intro: "",
        tuitionFee: "",
        rating: null,
        addedToCart: false,
        videos: [

        ]
    })

    const userRole = UserStorage.getLocalUserRole()
    const MATH_CLASS_TYPE = LiveClassType.Mathematics.value

    useEffect(() => {
        const classId = props.match.params.id
        ClassService.getDavinciClassDetail(classId).then(res => {
            if (res.status === 200) {
                setDavinciClass(res.data)
            }
        }).catch(err => console.log(err))
    }, [props.match.params.id])

    function handleLike(classId) {
        ClassCartService.addToCart(classId).then((resp) => {
            if (resp.status === 201) {
                setDavinciClass({ ...davinciClass, addedToCart: true })
            }
        })
    }

    return (
        <>
            <div className="mathdavinci-details-body">
                <section className="mathdavinci-infro">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="mathdavinci-colleft">
                                <img
                                    className="w-100"
                                    src={davinciClass.imageUrl ?? MathdavinciPhoto}
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="mathdavinci-colright">
                                <h2 className="mathdavinci-name">
                                    [과학수학 다빈치] {davinciClass.name}
                                </h2>
                                <div className="mathdavinci-voting mb-3">
                                    <div className={`star-box voted-${Math.round(davinciClass.rating)}`}
                                        hidden={davinciClass.rating === null}
                                    >
                                        <i className="lcicon-star"></i>
                                        <i className="lcicon-star"></i>
                                        <i className="lcicon-star"></i>
                                        <i className="lcicon-star"></i>
                                        <i className="lcicon-star"></i>
                                    </div>
                                </div>
                                <div className="mathdavinci-intro mb-4 mb-lg-5">
                                    <p>{davinciClass.intro}</p>
                                </div>
                                <div className="mathdavinci-button mb-4">
                                    <span className="mathdavinci-target">
                                        대상학생 : {davinciClass.grade}
                                    </span>
                                    <span className="mathdavinci-material">
                                        수업 준비 : {davinciClass.materials}
                                    </span>
                                </div>
                                <div className="mathdavinci-note mb-3">
                                    <p>
                                        * 강의를 모두 결제 할 경우 결제일로부터
                                        1년동안 수강이 가능합니다.
                                    </p>
                                    <p>
                                        * 강의를 개별로 결제 할 경우
                                        결제일로부터 1개월동안 수강이
                                        가능합니다.
                                    </p>
                                </div>
                                <div className="mathdavinci-price d-md-flex align-items-center justify-content-between">
                                    모든 강의 결제 할 경우 가격
                                    {
                                        davinciClass.tuitionFee &&
                                        <div className="text-right">
                                            <del className="full-price">
                                                <Currency amount={davinciClass.tuitionFee} />
                                            </del>
                                            <span className="sale-price">
                                                <Currency amount={Math.round(0.9 * davinciClass.tuitionFee)} />
                                            </span>
                                        </div>
                                    }
                                </div>

                                {
                                    (userRole === UserRole.STUDENT.value || userRole === UserRole.PARENT.value) &&
                                    <div className="mathdavinci-like">
                                        <span
                                            className={`icon-like ${davinciClass.addedToCart ? 'liked' : ''
                                                }`}
                                            onClick={(e) => handleLike(davinciClass.id)}
                                        >
                                            <i className="lcicon-hear"></i>
                                        </span>
                                    </div>
                                }

                            </div>
                        </div>
                    </div>
                </section>
                <section className="mathdavinci-details-tabs">
                    <div className="nav-tabs-half g700">
                        <Tabs defaultActiveKey="lectureList">
                            <Tab eventKey="lectureList" title="수업리스트">
                                <LectureList classInfo={{ ...davinciClass, type: MATH_CLASS_TYPE }} />
                            </Tab>
                            <Tab eventKey="lectureReview" title="후기">
                                <LectureReview classId={davinciClass.id} />
                                {/* <ClassReviews dataSource={{...davinciClass}} /> */}
                            </Tab>
                        </Tabs>
                    </div>
                </section>
            </div>
        </>
    )
}

export default MathdavinciDetails
