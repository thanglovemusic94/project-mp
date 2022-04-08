import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { EventBannerService } from 'services/EventBannerService'
import Banner from '../../../assets/images/banner.png'
import MBanner from '../../../assets/images/m-banner.png'

const MainEvent = () => {
  
  return (
    <>
      <section className="main-section main-banner">
        {/* <Link to="/readingm-event"> */}
        <Link to="/notice-details/2">
          <img
            className="d-none d-sm-block w-100"
            src={ Banner }
            alt="Event banner"
          />
          <img
            className="d-block d-sm-none w-100"
            src={ MBanner }
            alt="Event banner"
          />
        </Link>
      </section>
    </>
  )
}

export default MainEvent
