import React, {useState} from 'react'
import {Button, Form} from 'react-bootstrap'

const RegisterSelfIntro = ({onFinish}) => {
    const [data, setData] = useState("")
    const [validated, setValidated] = useState(false);

    function handleFinish(event) {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            // event.preventDefault();
            // event.stopPropagation();
            setValidated(true);
        } else {
            onFinish({introduction: data})
        }
    }

    return (
        <>
            <div className="registerselfintro-section">
                <div className="box-w612">
                    <div className="box-title">
                        <h3>자기소개서</h3>
                        <p className="text-danger">* 자기소개서는 필수 입력사항입니다.</p>
                    </div>
                    <Form
                        noValidate
                        validated={validated}
                        onSubmit={handleFinish}
                        //className="was-validated"
                    >
                        <Form.Group>
                            <Form.Control
                                as="textarea"
                                rows={10}
                                placeholder="자기소개서 입력"
                                onChange={(e) => setData(e.target.value)}
                                maxLength="1000"
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                자기소개서를 입력해주세요.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <p>총 글자수 {data.length} / 최대 1000자</p>

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

export default RegisterSelfIntro
