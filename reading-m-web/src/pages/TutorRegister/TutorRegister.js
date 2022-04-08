import React, { useState } from 'react'
import RegisterInfor from './components/RegisterInfor'
import RegisterEdu from './components/RegisterEdu'
import RegisterSteps from './components/RegisterSteps'
import RegisterCert from './components/RegisterCert'
import RegisterCareer from './components/RegisterCareer'
import RegisterSelfIntro from './components/RegisterSelfIntro'
import RegisterTutorType from './components/RegisterTutorType'
import { useHistory } from 'react-router'

const TutorRegister = () => {
  const history = useHistory()

  const [registrationData, setRegistrationData] = useState({})
  const [step, setStep] = useState(0)

  const totalStep = 6;
    //console.log(registrationData)
  function handleGoToNextStep(newData) {

    if (step + 1 < totalStep) {
      setRegistrationData({...registrationData, ...newData})
      setStep(step + 1)
    }
    else {
      if (newData.bookClassInfo === true && newData.goalClassInfo === true) {
        history.push({
          pathname: "/tutor-register-book",
          state: {
            "registrationData": {...registrationData, tutor: { ...registrationData.tutor, tutorType: newData.type}},
            "bothTutorType": true
          }
        })
      } else
      if (newData.bookClassInfo === true) {
        history.push({
          pathname: "/tutor-register-book",
          state: {
              "registrationData": {...registrationData, tutor: { ...registrationData.tutor, tutorType: newData.type}},
            "bothTutorType": false
          }
        })
      } else
      if (newData.goalClassInfo === true) {
        history.push({
          pathname: "/tutor-register-goal",
          state: {
              "registrationData": {...registrationData, tutor: { ...registrationData.tutor, tutorType: newData.type}},
          }
        })
      }
    }
  }

  console.log(registrationData)

  return (
    <>
      <div className="tutorregister-body">
        <RegisterSteps step={step}/>
        {
          step === 0 ? <RegisterInfor onFinish={(data) => handleGoToNextStep(data)}/>
          :
          step === 1 ? <RegisterEdu onFinish={(data) => handleGoToNextStep(data)}/>
          :
          step === 2 ? <RegisterCert onFinish={(data) => handleGoToNextStep(data)}/>
          :
          step === 3 ? <RegisterCareer onFinish={(data) => handleGoToNextStep(data)}/>
          :
          step === 4 ? <RegisterSelfIntro onFinish={(data) => handleGoToNextStep(data)}/>
          :
          step === 5 ? <RegisterTutorType onFinish={(data) => handleGoToNextStep(data)}/>
          :
          <></>
        }
      </div>
    </>
  )
}

export default TutorRegister
