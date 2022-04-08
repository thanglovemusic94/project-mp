import React, { useContext, useState } from "react";

import { AppContext } from "../../../App";
import SmsService from "../../../services/SmsService";
import CButtonPosition from "../../buttons/CButtonPosition";
import CountDown from "../../CountDown";
import ErrorCommon from "../../popups/ErrorCommon";


function IdentityVerificationNotice({setIsVerified, isChangePhone }) {

  const [showCountDown, setShowCountDown] = useState(false)
  const [phone, setPhone] = useState("")
  const [code, setCode] = useState("")
  const { showNoticePopup } = useContext(AppContext);
  const [resOtp, setResOtp] = useState();

  const [errors, setErrors] = useState({ code_incorect: false, code_exprie_time: false })

  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 1, seconds: 30 });


  const handleInputChnage = (e, setData) => {
    const value = e.target.value;
    setData(value)
  }

  const sendMessageOtp = (e) => {
    e.preventDefault()
    const form = e.currentTarget
    
    if (form.checkValidity() === false) {
      e.stopPropagation()
      form.classList.add('was-validated')
      setPhone('')
    } else {
      SmsService.reqVerifyPhoneCode(phone).then(res => {
        if (res.status === 200) {
          setResOtp({sig: res.data, date: new Date()})
          setShowCountDown(true)
          setTime({...time})
        }

      }).catch(e => {
        if (e.response.data.code === 1007) {
          showNoticePopup(
            <div className={'fs-17 fw-medium lh-22'}>
              해당 번호로 이미 본인인증 된 계정이 있습니다.
              고객센터로 문의해주시기바랍니다.
              차옷@차옷.com
            </div>
          );
        } else {
          ErrorCommon(showNoticePopup, e)
        }
      });
      setErrors({...errors, code_incorect: false, code_exprie_time: false})
    }
  }

  const verifyOtp = (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.stopPropagation()
      form.classList.add('was-validated')
      setCode('')
    } else {
      const expDate =  Math.floor((new Date() - resOtp.date) / 1000) > 90;
      const data = { phoneNo: phone, verifyNo: code, sig: resOtp.sig, expTime: expDate}
      SmsService.verifyPhoneCode(data).then(res => {
        setIsVerified(true)
      }).catch(e => {
        if (e.response.data.code === 1008) {
          setErrors({ code_incorect: false, code_exprie_time: true })
          setShowCountDown(false)
          resetState();

        }
        else if (e.response.data.code === 1009) {
          setErrors({ code_incorect: true, code_exprie_time: false })
          setShowCountDown(false)
          resetState();
        } else {
          ErrorCommon(showNoticePopup, e)
        }
      });
    }
  }

  const resetState = () => {
    setPhone('')
    setTime({...time, days: 0, hours: 0, minutes: 1, seconds: 30 })
    setCode('')
  }

  return (
    <div>
      {/* <p className="fs-22 lh-31 text-center">휴대폰 인증</p> */}
      <form noValidate onSubmit={sendMessageOtp} className="needs-validation  mt-1">
        <label className="form-label">휴대폰 번호</label>
        <div className="d-flex justify-content-center align-items-center mb-1">
          <span className="text-black-800 p-12px  lh-21 fs-14 text-center border border-black-800 me-1">+82</span>
          <input onChange={(e) => handleInputChnage(e, setPhone)} value={phone} placeholder="휴대폰 번호를 입력하세요." className="text-black-800 p-12px form-control lh-21 fs-14 text-center d-inline-block rounded-0" type="text" pattern="[0-9]{11}" maxLength={11} required />
        </div>

        <CButtonPosition
          className={`mt-3`}
          disabledPosition={true}
          text={showCountDown === true ? <CountDown time={time} setTime={setTime} /> : '인증 요청'}
          type="submit"
          variant={showCountDown ? 'outline-blue-500' : null}
          disabled={showCountDown === true}
        />
      </form>

      <form noValidate onSubmit={verifyOtp} className="needs-validation mt-5">
        <label className="form-label">인증 번호 입력</label>
        <input disabled={showCountDown === false} value={code} onChange={(e) => handleInputChnage(e, setCode)} placeholder="문자로 전송 받은 인증번호를 입력하세요." className="text-black-800 p-12px form-control  lh-21  fs-14 text-center rounded-0" type={'text'} pattern="[0-9]{4}" maxLength={4} minLength={4} required />
        
        {
          errors.code_incorect && <div className="text-red text-center lh-21 fs-12 ">인증번호가 올바르지 않습니다. 다시 확인해주세요.</div>
        }

        {
          errors.code_exprie_time && <div className="text-red text-center lh-21 fs-12 ">인증 시간이 초과되었습니다.</div>
        }
        
        <CButtonPosition
          variant={showCountDown === false ? 'blue-50' : null}
          className={'mt-3'}
          disabledPosition={true}
          text={'인증'}
          type="submit"
          disabled={showCountDown === false}
        />
      </form>
    </div>
  );
}

export default IdentityVerificationNotice;
