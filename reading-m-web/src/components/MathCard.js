import React from 'react'
import { Link } from 'react-router-dom'
import TutorPhoto from '../assets/images/tutor-list.jpg'

const MathCard = ({classData}) => {
  return (
    <>
      <div className="tutor-card">
        <Link to={`/mathdavinci-details/${classData.id}`}>
          <div className="tc-photo">
            <img className="w-100" src={classData.imageUrl ?? TutorPhoto} alt="" />
          </div>
          <div className="tc-body">
            <div className={`star-box voted-${Math.round(classData.rating)}`} hidden={classData.rating === null}>
              <i className="lcicon-star"></i>
              <i className="lcicon-star"></i>
              <i className="lcicon-star"></i>
              <i className="lcicon-star"></i>
              <i className="lcicon-star"></i>
            </div>
            <h3 className="tc-name">{classData.name}</h3>
          </div>
        </Link>
      </div>
    </>
  )
}

export default MathCard
