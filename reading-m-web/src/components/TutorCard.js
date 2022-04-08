import { LiveClassType } from 'constants/class.constants'
import React from 'react'
import { Link } from 'react-router-dom'
import TutorPhoto from '../assets/images/tutor-list.jpg'

const TutorCard = ( { source, type } ) => {
  const { id: liveClassId, closed, rating, tutor } = source
  const { id: tutorId, name: tutorName, profileImgUrl: tutorAvatar, bookTextIntroduction } = tutor

  return (
    <>
      <div className="tutor-card">
        <Link to={{
          pathname: "/liveclass-details",
          state: { "liveClassInfo": {  
            "tutorId": tutorId,
            "liveClassId": liveClassId,
            "liveClassType": type 
          }}
        }}>
          <div className="tc-photo">
            <img className="w-100" src={tutorAvatar === null ? TutorPhoto : tutorAvatar} alt="" />
            { closed === true ? <span className="tc-deadline">등록마감</span> : <></> }
          </div>
          <div className="tc-body">
            <div className={`star-box voted-${Math.round(rating)}`} hidden={rating === null}>
              <i className="lcicon-star"></i>
              <i className="lcicon-star"></i>
              <i className="lcicon-star"></i>
              <i className="lcicon-star"></i>
              <i className="lcicon-star"></i>
            </div>
            <h3 className="tc-name">{tutorName}</h3>
            <p className="tc-intro">
              {bookTextIntroduction}
            </p>
          </div>
        </Link>
      </div>
    </>
  )
}

export default TutorCard
