import React from 'react'

function MagazineCard(props) {
  const { img, title, date, showDate } = props

  return (
    <>
      <div className="magazine-card" style={{ width: '300px' }}>
        <img className="w-100" src={img} alt="First slide" />
        <h3 className="title">{title}</h3>
        <div className="date" style={{ display: showDate ? 'block' : 'none' }}>
          {date}
        </div>
      </div>
    </>
  )
}

export default MagazineCard
