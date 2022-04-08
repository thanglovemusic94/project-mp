import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import { MainService } from 'services/MainService'
import { LiveClassType } from './../../../constants/class.constants'
import { ClassService } from 'services/ClassService'
import { useHistory } from 'react-router-dom'

function SampleNextArrow(props) {
    const { className, onClick } = props
    return (
        <div className={className} onClick={onClick}>
            <i className="lcicon-next"></i>
        </div>
    )
}
function SamplePrevArrow(props) {
    const { className, onClick } = props
    return (
        <div className={className} onClick={onClick}>
            <i className="lcicon-prev"></i>
        </div>
    )
}
const MainTutor = () => {
    const [tutors, setTutors] = useState([])
    const history = useHistory()

    useEffect(() => {
        MainService.getTutorsOfMonth().then(res => {
            if (res.status === 200) {
                setTutors(res.data)
            }

        }).catch(err => console.log(err))

    }, [])

    const onClickImage = (tutorId, classType) => {

        if (classType === "TextBookClass") {
            classType = "LIVE_BOOK"
        } else {
            classType = "LIVE_GOAL"
        }

        const params = {
            classType: classType,
            page: 0,
            size: 1
        }


        ClassService.search(params).then((res) => {
            if (res.status === 200) {
                history.push({
                    pathname: "/liveclass-details", state: {
                        "liveClassInfo": {
                            "tutorId": tutorId,
                            "liveClassId": res.data.content[0].id,
                            "liveClassType": classType
                        }
                    }
                })
            }
        }).catch(err => console.log(err))

        // if (classType === LiveClassType.GoalClass.value) {

        // }
    }

    const settings = {
        dots: false,
        infinite: true,
        arrows: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    }


    return (
        <>
            <section className="main-section main-tutor">
                <div className="main-container">
                    <h3 className="section-title">이달의 지도교사</h3>
                    <Slider {...settings} className="card-slider">
                        {tutors.map((tutor, i) =>
                            <div className="tutor-card" key={i}>
                                <div className="tc-photo">
                                    <img className="w-100" src={tutor.profileImageUrl} alt=""
                                        onClick={() => onClickImage(tutor.id, LiveClassType[tutor.classType].value)}
                                    />
                                </div>
                                <div className="tc-body">
                                    <div className="tc-class">[{LiveClassType[tutor.classType].label}]</div>
                                    <h3 className="tc-name">지도교사 {tutor.name}</h3>
                                </div>
                            </div>
                        )}

                    </Slider>
                </div>
            </section>
        </>
    )
}

export default MainTutor
