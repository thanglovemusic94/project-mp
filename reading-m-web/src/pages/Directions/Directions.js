import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/logo/logo.png'
import { Image } from 'react-bootstrap'

export default function Directions() {
    return (
        <>
            <div className="direction-body">
                <h2 className="page-title mb-4">찾아 오시는 길</h2>
                <div className="embed-responsive embed-responsive-21by9">
                    <iframe
                        title="This is direction"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d202404.21946191095!2d126.84946704870129!3d37.565289396880246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca28b61c565cd%3A0x858aedb4e4ea83eb!2sSeoul%2C%20South%20Korea!5e0!3m2!1sen!2s!4v1623740194408!5m2!1sen!2s"
                        allowfullscreen=""
                        loading="lazy"
                        className="embed-responsive-item"
                    ></iframe>
                </div>
                <div className="d-lg-flex align-items-center justify-content-between mt-4">
                    <div className="address-infor d-lg-flex text-center">
                        <Link to="/" className="address-logo">
                            <Image src={Logo} alt="LiveClass Logo" />
                        </Link>
                        <p className="ml-lg-3 mb-0 mb-0 mt-3 mb-4 mb-lg-0 mt-lg-0">
                            <i className="lcicon-maker"> </i>
                            서울특별시 서초구 고무래로 10길 27. 주호빌딩 402호
                        </p>
                    </div>
                    <div className="address-phone">
                        <span className="tel">
                            <span>TEL: </span>02-537-2248
                        </span>
                        <span className="mx-2">|</span>
                        <span className="fax">
                            <span>FAX: </span>02-2646-8825
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}
