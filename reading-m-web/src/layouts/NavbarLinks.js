import React from 'react'
import { Nav, NavDropdown } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import Slider from 'react-slick'

const NavbarLinks = () => {
    const settings = {
        dots: false,
        infinite: false,
        arrows: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        variableWidth: true,
        initialSlide: 0,
        className: 'd-flex justify-content-center',
        responsive: [
            {
                breakpoint: 10000,
                settings: 'unslick',
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
        ],
    }
    return (
        <>
            <nav className="lc-navigation">
                <div className="container">
                    <Slider {...settings}>
                        <div className="mr-13">
                            <NavLink to="/liveclass-book">
                                LiveClass 책글
                            </NavLink>
                        </div>
                        <div className="mr-13">
                            <NavLink to="/liveclass-goal">
                                LiveClass 목적
                            </NavLink>
                        </div>
                        <div className="mr-13">
                            <NavLink to="/math-davinci">
                                과학수학 다빈치
                            </NavLink>
                        </div>
                        <div className="mr-13">
                            <NavLink to="/book-calendar">도서</NavLink>
                        </div>
                        <div className="mr-13">
                            <NavLink to="/notice-details/4"> LiveClass 안내</NavLink>
                        </div>
                    </Slider>
                </div>
            </nav>
        </>
    )
}

export default NavbarLinks
