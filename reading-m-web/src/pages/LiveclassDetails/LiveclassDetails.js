import { LiveClassType } from 'constants/class.constants'
import React, { useEffect, useState } from 'react'
import { Nav, Tab } from 'react-bootstrap'
import { ClassService } from 'services/ClassService'
import TutorAvatar from '../../assets/images/avatar.png'
import ClassList from '../../components/ClassList'
import ClassQAs from '../../components/ClassQAs'
import ClassReviews from '../../components/ClassReviews'

const LiveclassBookDetails = (props) => {
    // const [liveClassInfo, setLiveClassInfo] = useState(props.location.state)
    const { liveClassInfo } = props.location.state
    const [activeTab, setActiveTab] = useState("classList");
    const wrapperStyle = liveClassInfo.liveClassType === LiveClassType.LiveClassBook.value ? "class-book" : "class-goal"

    const [data, setData] = useState({
        "id": null,
        "name": null,
        "profileImageUrl": null,
        "classIntroduction": null,
        "rating": null
    })

    useEffect(() => {
        props.location.state.activeTab && setActiveTab(props.location.state.activeTab)
        ClassService.getLiveClassTutorOverview(liveClassInfo.liveClassId).then((resp) => {
            if (resp.status === 200) {
                setData({ ...resp.data, rating: Math.round(resp.data.rating) })
            }

        }).catch((err) => {
            console.error(err)
        })
    }, [])

    function handleSelect(activeKey) {
        setActiveTab(activeKey)
    }

    return (
        <>
            <div className={`liveclassdetail-body ${wrapperStyle} tutor-details`}>
                <Tab.Container defaultActiveKey="classList" activeKey={activeTab} mountOnEnter unmountOnExit onSelect={handleSelect}>
                    <section className="td-intro">
                        <div className="td-intro__avatar">
                            {/* <img src={data.profileImageUrl !== null ? data.profileImageUrl : TutorAvatar} alt="Tutor Avatar" /> */}
                            <img src={data.profileImageUrl} alt="Tutor Avatar" />
                        </div>
                        <div className="td-intro__infor">
                            <div className="td-intro__name">
                                <span>지도교사</span>
                                {data.name}
                            </div>
                            <div className={`star-box voted-${data.rating}`} hidden={data.rating === null}>
                                <i className="lcicon-star"></i>
                                <i className="lcicon-star"></i>
                                <i className="lcicon-star"></i>
                                <i className="lcicon-star"></i>
                                <i className="lcicon-star"></i>
                            </div>
                            <p className="td-intro__desc">
                                {data.classIntroduction}
                            </p>
                            <div className="td-intro__tabs">
                                <div className="nav-tabs-radius m500">
                                    <Nav>
                                        <Nav.Item>
                                            <Nav.Link eventKey="classList">
                                                수업리스트
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="classReviews">
                                                후기
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="classQAs">
                                                Q&A
                                            </Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </div>
                            </div>
                        </div>
                    </section>
                    <Tab.Content>
                        <Tab.Pane eventKey="classList">
                            <ClassList dataSource={liveClassInfo} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="classReviews">
                            <ClassReviews dataSource={liveClassInfo} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="classQAs">
                            <ClassQAs dataSource={liveClassInfo} tutorName={data.name} />
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </div>
        </>
    )
}

export default LiveclassBookDetails
