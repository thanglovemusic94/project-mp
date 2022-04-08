//custom base to document https://github.com/awran5/react-simple-star-rating#readme
//https://github.com/awran5/react-simple-star-rating/blob/main/src/Components/RatingView.tsx


import {RatingActiveIcon, RatingUnActiveIcon} from "../assets/svgs/Icons";
import {useState} from "react";

const RatingReview = ({
                          ratingValue,
                          onClick,
                          stars = 5,
                          width = 16,
                          height = 14,
                          transition = false,
                          fillColor = '#FFD233',
                          // emptyColor = '#cccccc',
                          emptyColor = '#FFD233',
                          className = '',
                          style,
                          childrenActive,
                          childrenUnActive,
                          reverse = false,
                          starSpacing ='1.2px'
                      }) => {

    // ratingValue = ratingValue.toFixed()
    ratingValue = Math.floor(ratingValue)

    const [hoverValue, setHoverValue] = useState(ratingValue ? ratingValue :  null)

    return (

        <span className={className} style={style}>
          {[...Array(stars)]
              .map((_, index) => (

                  reverse === false ?
                      <span
                          key={index}
                          onMouseEnter={() => onClick && setHoverValue(index + 1)}
                          onMouseLeave={() => onClick && setHoverValue(null)}
                          onClick={() => {
                              if (onClick){
                                  onClick(index + 1)
                                  setHoverValue(index + 1)
                              }
                          }}
                          aria-hidden='true'
                          style={{
                              color: ((hoverValue || ratingValue) && (hoverValue || ratingValue) > index) ? fillColor : emptyColor,
                              width: width,
                              height: height,
                              cursor: 'pointer',
                              transition: transition ? 'color 0.2s ease-in-out 0s' : '',
                              display: 'inline-flex',
                              marginRight: ((index + 1) === stars) ? "" : starSpacing
                          }}
                      >
                          {
                               ((hoverValue || ratingValue) && (hoverValue || ratingValue) > index) ?
                                   (childrenActive || <RatingActiveIcon />)
                                  :
                                   (childrenUnActive || <RatingUnActiveIcon />)

                          }

                  </span>
                      :
                      <span
                          key={index}
                          onMouseEnter={() => onClick && setHoverValue(index + 1)}
                          onMouseLeave={() => onClick && setHoverValue(null)}
                          onClick={() => {
                              if (onClick){
                                  onClick(index + 1)
                                  setHoverValue(index + 1)
                              }
                          }}
                          aria-hidden='true'
                          style={{
                              color: ((index + 1) > stars - ratingValue) ? fillColor : emptyColor,
                              width: width,
                              height: height,
                              cursor: 'pointer',
                              transition: transition ? 'color 0.2s ease-in-out 0s' : '',
                              display: 'inline-flex',
                              marginRight: ((index + 1) === stars) ? "" : starSpacing
                          }}
                      >
                          {

                              ((index + 1) > stars - ratingValue) ?
                                  (childrenActive || <RatingActiveIcon />)
                                  :
                                  (childrenUnActive || <RatingUnActiveIcon />)
                          }

                  </span>
              ))}
    </span>
    )
}

export default RatingReview
