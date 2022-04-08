import React, {useState} from 'react'
import ClassInfor from './components/ClassInfor'
import ClassMaterial from './components/ClassMaterial '
import CurriculumInfor from './components/CurriculumInfor'
import {Button, Modal} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {TutorService} from 'services/TutorService'
import {SHOW_ERROR_POPUP} from "../../constants/action.type.constants";
import {useDispatch} from "react-redux";
import {TutorType} from "../../constants/tutorType";
import {getUserDetails} from "../../action/user";

const TutorRegisGoal = (props) => {
  const [data, setData] = useState({
    "category": null,
    "curriculumInfo": {
      "curriculum": [],
      "materials": null,
      "minutesPerDay": null,
      "totalDays": null
    },
    "level": null,
    "title": null,
    "topic": null
  })

    const dispatch = useDispatch()
  const [show4, setShow4] = useState(false)
  const handleShow4 = () => setShow4(true)
  const handleClose4 = () => setShow4(false)
  const [step, setStep] = useState(0)
  const nextStep = () => setStep(step + 1)


  function handleChange(val) {

    setData({...data, ...val})
  }
    //console.log(data)
  function handleFinish() {
      const { registrationData } = props.location.state

    let body = {
      ...registrationData,
        goalClassInfo: {
        ...data
      }
    }
     // console.log(body)
      const formData = new FormData();
      if (registrationData.id !==null ){
          if (data.hasOwnProperty('files')){
              data.files.forEach(file => {
                  formData.append("files", file);
              } )
          }
          delete body.goalClassInfo.files
          formData.append("tutorAppDto", JSON.stringify(body));
          TutorService.updateApplyTutor(formData, registrationData.id).then((resp) => {
              if (resp.status === 204) {
                  handleShow4()
                  dispatch(getUserDetails())
              }
          }).catch(e => dispatch({type: SHOW_ERROR_POPUP, contents: "Internal error " + e.message}))
      }
      else {
          formData.append("imagePc", body.imagePC);
          if (data.hasOwnProperty('files')){
              data.files.forEach(file => {
                  formData.append("files", file);
              } )
          }
          delete body.imagePC;
          delete body.goalClassInfo.files
          formData.append("tutorAppDto", JSON.stringify(body));

          TutorService.applyForTutor(formData).then((resp) => {
              if (resp.status === 201) {
                  handleShow4()
              }
          }).catch(e => dispatch({type: SHOW_ERROR_POPUP, contents: "Internal error " + e.message}))
      }

  }

  return (
    <>
      <div className="tutorregisgoal-body">
        {
          step === 0 ? <ClassInfor onDataChange={(result) => handleChange(result)} onFinish={nextStep}/>
          :
          step === 1 ? <CurriculumInfor onDataChange={(result) => handleChange(result)} onFinish={nextStep} />
          :
          step === 2 ? <ClassMaterial onDataChange={(result) => handleChange(result)} onFinish={handleFinish}/>
          :

          <></>
        }
        <Modal
          show={show4}
          onHide={handleClose4}
          dialogClassName="modalw-386 modalh-480 modal-comfirm modal-tutorbook-confirm"
          centered
        >
          <Modal.Body scrollable={true}>
            <div className="modal-body-inner flex-column">
              <p className="text-top">지도교사 지원이 완료되었습니다.</p>
              <i className="lcicon-tutorbook-confirm my-2"></i>
              <p className="text-bottom">
                로그인은 승인 이후에 가능하며, <br /> 승인 여부는 개별적으로
                전달드립니다.
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer className="modal-btn-half">
            <Button variant="p500" as={Link} to="/">
              확인
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  )
}

export default TutorRegisGoal
