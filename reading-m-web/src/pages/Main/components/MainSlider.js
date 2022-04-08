import React, {useEffect, useState} from 'react'
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

const MainSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        arrows: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow/>,
        prevArrow: <SamplePrevArrow/>,
    }
    const [banner, setBanner] = useState({
        content: [],
        totalPages: 0,
        number: 0,
        size: 0,
    })

    useEffect(() => {
        MainService.getAllBanner().then((resp) => {
            setBanner(resp.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    return (
        <>
            <section className="main-section main-slider">
                <div className="d-none d-sm-block">
                    <Slider {...settings}>
                        {banner.content.map((value, index) => (
                            <div key={index}>
                                <img
                                     className="w-100"
                                     src={value.imagePc}
                                     alt=""
                                     style={{height: '500px'}}
                                />
                            </div>
                        ))}
                    </Slider>
                </div>

                <div className="d-block d-sm-none">
                    <Slider {...settings}>
                        {banner.content.map((value, index) => (
                            <div key={index}>
                                <img
                                     className="w-100"
                                     src={value.imageMb}
                                     alt=""
                                     style={{height: '200px'}}
                                />
                            </div>
                        ))}
                    </Slider>
                </div>
            </section>
        </>
    )
}

export default MainSlider
