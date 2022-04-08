import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import Slider from 'react-slick'
import {MainService} from '../../../services/MainService'

function SampleNextArrow(props) {
    const {className, onClick} = props
    return (
        <div className={className} onClick={onClick}>
            <i className="lcicon-next"></i>
        </div>
    )
}

function SamplePrevArrow(props) {
    const {className, onClick} = props
    return (
        <div className={className} onClick={onClick}>
            <i className="lcicon-prev"></i>
        </div>
    )
}

const MainMagazine = () => {
    const settings = {
        dots: false,
        infinite: true,
        arrows: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow/>,
        prevArrow: <SamplePrevArrow/>,
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

    const [magazine, setMagazine] = useState({
        content: [],
        totalPages: 0,
        number: 0,
        size: 0,
    })

    const [params, setParams] = useState({
        page: 0,
        size: 10,
        sort: 'id,DESC',
    })

    useEffect(() => {
        MainService.getAllMagazine(params).then((resp) => {
            setMagazine(resp.data)
        }).catch(err => console.log(err))
    }, [params])


    return (
        <>
            <section className="main-section main-magazine">
                <div className="main-container">
                    <h3 className="section-title">LiveClass 리딩엠 매거진</h3>
                    <div className="title-link text-right mb-4">
                        <Link to="/magazine-list">+ 매거진 전체보기</Link>
                    </div>

                    <Slider {...settings} className="card-slider">
                        {magazine.content.map((value, index) => (
                            <div key={index}>
                                <Link to={'/magazine-details/' + value.id}>
                                    <div className="magazine-card">
                                        <div className="mc-photo">
                                            <img className="w-100" src={value.imagePc} alt=""/>
                                        </div>
                                        <div className="mc-body">
                                            <div className="mc-title">{value.title}</div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}

                    </Slider>
                </div>
            </section>
        </>
    )
}

export default MainMagazine
