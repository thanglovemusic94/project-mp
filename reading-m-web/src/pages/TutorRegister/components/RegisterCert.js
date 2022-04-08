import CustomDropdown from 'components/CustomDropdown'
import React, { useState } from 'react'
import { Button, Dropdown, Form } from 'react-bootstrap'
import formatDate from "../../../utils/DateUtils";

const LicenseFormTemplate = {
  "type": "license",
  "name": "",
  "publisher": "",
  "passType": "",
}

const LanguageTestFormTemplate = {
  "type": "languageTest",
  "language": "",
  "testType": "",
  "score": "",
  "rating": "",
  "isPassed": false,
}

const CompetitionFormTemplate = {
  "type": "competition",
  "name": "",
  "place": "",
}

const CertificateType = [
  {"label": "자격증/면허증", "value": "license"},
  {"label": "어학시험", "value": "languageTest"},
  {"label": "수상내역/공모전", "value": "competition"}
]

const LicenseCertPassCategory = [
  {"label": "합격 구분 선택", "value": ""},
  {"label": "1차 합격", "value": "First"},
  {"label": "2차 합격", "value": "Second"},
  {"label": "필기 합격", "value": "Writing"},
  {"label": "실기 합격", "value": "Practice"},
  {"label": "최종 합격", "value": "Final"}
]

const LanguageTestCertGained = [
  {"label": "취득 여부 선택", "value": false},
  {"label": "취득", "value": true}
]

const LicenseForm = ({source, onDataChange, validated}) => {
  return (
    <>
      <Form.Group className="d-md-flex">
        <Form.Label>
          자격증명 <span className="text-danger">*</span>
        </Form.Label>
        <div>
          <Form.Control
            className="ipw-488"
            type="text"
            placeholder="자격증명 입력"
            value={source.name}
            onChange={(e) => onDataChange({...source, "name": e.target.value})}
            required
          />
          <Form.Control.Feedback type="invalid">
            자격증명을 입력해주세요.
          </Form.Control.Feedback>
        </div>
      </Form.Group>
      <Form.Group className="d-md-flex">
        <Form.Label>
          발행처 <span className="text-danger">*</span>
        </Form.Label>
        <div>
          <Form.Control
            className="ipw-488"
            type="text"
            placeholder="발행처 입력"
            value={source.publisher}
            onChange={(e) => onDataChange({...source, "publisher": e.target.value})}
            required
          />
          <Form.Control.Feedback type="invalid">
            발행처를 입력해주세요.
          </Form.Control.Feedback>
        </div>
      </Form.Group>
      <Form.Group className="d-md-flex">
        <Form.Label>
          합격 구분 선택 <span className="text-danger">*</span>
        </Form.Label>
        <div className="ipw-488">
          <CustomDropdown
            items={LicenseCertPassCategory}
            onChange={(e, k) => onDataChange({...source, "passType": k})}
          />

            <Form.Control.Feedback type={"invalid"}
                                   className={(
                                       validated === false ||
                                       source.passType !== '') ? 'd-none': 'd-block'}>
                합격 구분을 선택해주세요.
            </Form.Control.Feedback>
        </div>
      </Form.Group>
      <Form.Group className="d-md-flex">
        <Form.Label>
          취득일 <span className="text-danger">*</span>
        </Form.Label>
        <div>
          <Form.Control
            className="ipw-488"
            type="text"
            placeholder="YYYYMMDD"
            onChange={(e) => onDataChange({...source, "acquiredOn": formatDate(e.target.value, "YYYYMMDD", "YYYY-MM-DD")})}
            maxLength="8"
            pattern="[0-9]{4}(0[1-9]|1[012])(0[1-9]|1[0-9]|2[0-9]|3[01])"
            required
          />
          <Form.Control.Feedback type="invalid">
            취득일을 입력해주세요.
          </Form.Control.Feedback>
        </div>
      </Form.Group>
    </>
  )
}

const LanguageTestForm = ({source, onDataChange, validated}) => {

  return (
    <>
      <Form.Group className="d-md-flex">
        <Form.Label>
          언어 <span className="text-danger">*</span>
        </Form.Label>
        <div>
          <Form.Control
            className="ipw-488"
            type="text"
            placeholder="언어입력 "
            value={source.language}
            onChange={(e) => onDataChange({...source, "language": e.target.value})}
            required
          />
          <Form.Control.Feedback type="invalid">
            언어를 입력해주세요.
          </Form.Control.Feedback>
        </div>
      </Form.Group>
      <Form.Group className="d-md-flex">
        <Form.Label>
          시험종류 <span className="text-danger">*</span>
        </Form.Label>
        <div>
          <Form.Control
            className="ipw-488"
            type="text"
            placeholder="언어입력 "
            value={source.testType}
            onChange={(e) => onDataChange({...source, "testType": e.target.value})}
            required
          />
          <Form.Control.Feedback type="invalid">
            시험 종류를 입력해주세요.
          </Form.Control.Feedback>
        </div>
      </Form.Group>
      <Form.Group className="d-md-flex">
        <Form.Label>
          점수 <span className="text-danger">*</span>
        </Form.Label>
        <div>
          <Form.Control
            className="ipw-488"
            type="number"
            placeholder="점수입력"
            value={source.score}
            onChange={(e) => onDataChange({...source, "score": e.target.value})}
            required
          />
          <Form.Control.Feedback type="invalid">
            점수를 입력해주세요.
          </Form.Control.Feedback>
        </div>
      </Form.Group>
      <Form.Group className="d-md-flex">
        <Form.Label>
          급수 <span className="text-danger">*</span>
        </Form.Label>
        <div>
          <Form.Control
            className="ipw-488"
            type="number"
            placeholder="급수입력"
            value={source.rating}
            onChange={(e) => onDataChange({...source, "rating": e.target.value})}
            required
          />
          <Form.Control.Feedback type="invalid">
            급수를 입력해주세요.
          </Form.Control.Feedback>
        </div>
      </Form.Group>
      <Form.Group className="d-md-flex">
        <Form.Label>
          취득 여부 선택 <span className="text-danger">*</span>
        </Form.Label>
        <div className="ipw-488">
          <CustomDropdown
            items={LanguageTestCertGained}
            onChange={(e, k) => onDataChange({...source, "isPassed": k})}
          />

            <Form.Control.Feedback type={"invalid"}
                                   className={(
                                       validated === false ||
                                       source.isPassed !== false) ? 'd-none': 'd-block'}>
                취득 여부를 선택해주세요.
            </Form.Control.Feedback>

        </div>
      </Form.Group>
      <Form.Group className="d-md-flex">
        <Form.Label>
          취득일 <span className="text-danger">*</span>
        </Form.Label>
        <div>
          <Form.Control
            className="ipw-488"
            type="text"
            placeholder="YYYYMMDD"
            onChange={(e) => onDataChange({...source, "acquiredOn": formatDate(e.target.value, "YYYYMMDD", "YYYY-MM-DD")})}
            maxLength="8"
            pattern="[0-9]{4}(0[1-9]|1[012])(0[1-9]|1[0-9]|2[0-9]|3[01])"
            required
          />
          <Form.Control.Feedback type="invalid">
            취득일을 입력해주세요.
          </Form.Control.Feedback>
        </div>
      </Form.Group>
    </>
  )
}

const CompetitionForm = ({source, onDataChange, validated}) => {

  return (
    <>
      <Form.Group className="d-md-flex">
        <Form.Label>
          수상명 <span className="text-danger">*</span>
        </Form.Label>
        <div>
          <Form.Control
            className="ipw-488"
            type="text"
            placeholder="수상명 입력"
            value={source.name}
            onChange={(e) => onDataChange({...source, "name": e.target.value})}
            required
          />
          <Form.Control.Feedback type="invalid">
              수상명을 입력해주세요.
          </Form.Control.Feedback>
        </div>
      </Form.Group>
      <Form.Group className="d-md-flex">
        <Form.Label>
          수여기관 <span className="text-danger">*</span>
        </Form.Label>
        <div>
          <Form.Control
            className="ipw-488"
            type="text"
            placeholder="수여기관 입력"
            value={source.place}
            onChange={(e) => onDataChange({...source, "place": e.target.value})}
            required
          />
          <Form.Control.Feedback type="invalid">
            수여기관을 입력해주세요.
          </Form.Control.Feedback>
        </div>
      </Form.Group>
      <Form.Group className="d-md-flex">
        <Form.Label>
          수상/공모일 <span className="text-danger">*</span>
        </Form.Label>
        <div>
          <Form.Control
            className="ipw-488"
            type="text"
            placeholder="YYYYMMDD"
            onChange={(e) => onDataChange({...source, "acquiredOn": formatDate(e.target.value, "YYYYMMDD", "YYYY-MM-DD")})}
            maxLength="8"
            pattern="[0-9]{4}(0[1-9]|1[012])(0[1-9]|1[0-9]|2[0-9]|3[01])"
            required
          />
          <Form.Control.Feedback type="invalid">
            수상/공모일을 입력해주세요.
          </Form.Control.Feedback>
        </div>
      </Form.Group>
    </>
  )
}

const RegisterCert = ({onFinish}) => {
  const [certs, setCerts] = useState([
    {
      ...LicenseFormTemplate
    }
  ])

  const [validated, setValidated] = useState(false);

  function handleCertTypeSelected(selectedType, index) {
    let items = [...certs]

    if (selectedType === "license") items[index] = { ...LicenseFormTemplate }
    else if (selectedType === "languageTest") items[index] = { ...LanguageTestFormTemplate }
    else if (selectedType === "competition") items[index] = { ...CompetitionFormTemplate }

    setCerts([...items])
  }

  function handleDataChange(data, index) {
    let items = [...certs]

    items[index] = data

    setCerts([...items])
  }

  function handleAddCertForm() {
    let newCert = {
      ...LicenseFormTemplate
    }

    setCerts([...certs, newCert])
  }

  function handleRemoveCertForm(index) {
    let items = [...certs]

    items.splice(index, 1)

    setCerts([...items])
  }

    /**
     * Credential entry must be optional
     * #issue 188
     * @returns {{count: number, countType: number}}
     */
  const getCountFieldChange = () => {
      let count = 0;
      let countType = 0;
      certs.forEach(obj => {
          for (let [key, value] of Object.entries(obj)) {
              if (obj.hasOwnProperty(key)) {
                  if ((typeof value === 'string' && value.trim().length > 0) || value === true){
                      count++;
                  }
              }
          }
          if (obj.hasOwnProperty('type')){
              countType++
          }
      })
      return {count, countType};
  }

  function handleFinish(event) {
      event.preventDefault();
      event.stopPropagation();
      const form = event.currentTarget;

      const {count, countType} = getCountFieldChange();
      if (count > countType){
          if (form.checkValidity() === false || certs.filter(value => {
              if (value.passType === '' || value.isPassed === false) return true
          })[0]
          ) {
            setValidated(true);
          } else {
            onFinish({certs})
          }
      }else {
          onFinish({certs})
      }

  }

  return (
    <>
      <div className="registerselfintro-section">
        <div className="box-w612">
          <div className="box-title">
            <h3>자격증</h3>
            <p className="text-danger">*자격증은 선택사항입니다.</p>
          </div>
          <Form
          //className="was-validated"
          noValidate
          validated={validated}
          onSubmit={handleFinish}
          >
            {
              certs.map((item, index) => {

                return (
                  <div key={index}>
                    <div className="my-5" hidden={index == 0}>
                      <Button variant="g700" className="btn-delete" onClick={() => handleRemoveCertForm(index)}>
                        삭제
                      </Button>
                    </div>
                    <Form.Group className="d-md-flex">
                      <Form.Label>
                        항목 선택 <span className="text-danger">*</span>
                      </Form.Label>
                      <div className="ipw-488">
                        <CustomDropdown
                          items={CertificateType}
                          onChange={(e, k) => handleCertTypeSelected(k, index)}
                        />
                      </div>
                    </Form.Group>
                    {
                      item.type === "license" ? <LicenseForm validated={validated} source={item} onDataChange={(data) => handleDataChange(data, index)}/>
                      :
                      item.type === "languageTest" ? <LanguageTestForm validated={validated} source={item} onDataChange={(data) => handleDataChange(data, index)}/>
                      :
                      item.type === "competition" ? <CompetitionForm validated={validated} source={item} onDataChange={(data) => handleDataChange(data, index)}/>
                      :
                      <></>
                    }
                  </div>
                )
              })
            }
            <div className="text-center my-5">
              <Button variant="g700" className="btn-add btw-184" onClick={handleAddCertForm}>
                <i className="lcicon-plus-alt"></i>
                자격증 추가
              </Button>
            </div>
            <div className="text-center">
              <Button type="submit" variant="p500" className="btw-386 mr-1">
                다음
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  )
}

export default RegisterCert
