// import { useContext, useState } from 'react';
// import { useRef } from 'react';
// import { useHistory } from 'react-router-dom';
// import Webcam from 'react-webcam';
// import { AppContext } from '../../App';
// import { CircleCloseIcon } from '../../assets/svgs/Icons';
// import { CHATTING } from '../../constants/RouteConstants';
// import { Localizations } from '../../texts/Localizations';
// import CButton from '../buttons/CButton';

// const videoConstraints = {
//     facingMode: "user"
// };

// const Camera = (props) => {
//     const channelId = props.location.state
//     const webcamRef = useRef();
//     const history = useHistory()
//     const [imageSrc, setImageSrc] = useState(false)
//     const [isCapture, setCapture] = useState(false)
//     const { setCustomHeaderName } = useContext(AppContext)

//     setCustomHeaderName("")

//     const capture = () => {
//         const imgSrc = webcamRef.current.getScreenshot();
//         setImageSrc(imgSrc)
//         setCapture(true)
//     }

//     const submit = () => {
//         history.push({
//             pathname: CHATTING, state: {
//                 channelId: channelId, imageSrc: imageSrc
//             }
//         })
//     }

//     const cancel = () => {
//         if (isCapture) {
//             setCapture(false)
//         } else {
//             history.push({
//                 pathname: CHATTING, state: {
//                     channelId: channelId, imageSrc: ""
//                 }
//             })
//         }
//     }

//     return (
//         <>
//             {!isCapture ?
//                 <div>
//                     <div className="nav-header"></div>
//                     <div className='position-relative h-full' style={{ left: "-1rem" }}>
//                         <Webcam
//                             audio={false}
//                             ref={webcamRef}
//                             screenshotFormat="image/jpeg"
//                             videoConstraints={videoConstraints}
//                         />
//                         <CircleCloseIcon
//                             className="position-absolute bg-white rounded-circle ove"
//                             style={{ right: "-2rem", top: "0" }}
//                             onClick={cancel}
//                         />
//                     </div>

//                     <CButton className="w-100 shadow-none" onClick={capture}>
//                         <span className="fw-bold">{Localizations.Camera.Capture}</span>
//                     </CButton>
//                 </div>
//                 :
//                 <div>
//                     <div className="nav-header"></div>
//                     <div className='position-relative mb-2' style={{ left: "-1rem" }}>
//                         {imageSrc && (<img src={imageSrc} alt='image_chat.jpg' />)}
//                         <CircleCloseIcon
//                             className="position-absolute bg-white rounded-circle ove"
//                             style={{ right: "-2rem", top: "0" }}
//                             onClick={cancel}
//                         />
//                     </div>

//                     <CButton className="w-100 shadow-none" onClick={submit}>
//                         <span className="fw-bold">{Localizations.Camera.Submit}</span>
//                     </CButton>
//                 </div>
//             }
//         </>
//     );
// };

// export default Camera;
