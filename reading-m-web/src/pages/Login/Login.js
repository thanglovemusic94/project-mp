import { AppContext } from 'contexts/AppContext'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { NavLink, useHistory } from 'react-router-dom'
import { LoginService } from '../../services/LoginService'
import { UserStorage } from '../../storages/UserStorage'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// Validation Schema
const vldSchema = yup.object().shape({
    email: yup.string().required('ID를 올바르게 입력해주세요.'),
    password: yup.string().required('비밀번호를 올바르게 입력해주세요.'),
})

export default function Login() {
    //get email localStorage
    const saveId = localStorage.getItem("SAVE_ID") || ''
    //react hook form declaration
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm({
        resolver: yupResolver(vldSchema),
        defaultValues: {
            email: saveId
        }
    })

    const { setIsLogined } = useContext(AppContext)
    const history = useHistory()
    const [isSaveId, setIsSaveId] = useState(false);

    const onSubmit = (data) => {

        if (isSaveId) {
            localStorage.setItem("SAVE_ID", data.email)
        }

        LoginService.login({ ...data, grantType: 'CLIENT_CREDENTIALS' }).then(
            (resp) => {
                if (resp.status === 200) {
                    if (!resp.data.code) {
                        // case doesn't have error
                        UserStorage.saveUserLocal(resp.data)
                        setIsLogined(true)

                        history.push('/', resp.data)
                    } else {
                        //error case
                        switch (resp.data.code) {
                            case 12002:
                                setError('password', {
                                    message: '비밀번호를 확인해주세요.',
                                })
                                break
                            case 12005:
                                setError('email', {
                                    message: 'ID를 확인해주세요.',
                                })
                                break
                            default:
                                break
                        }
                    }
                }
            }
        )
    }

    useEffect(() => {
        if (UserStorage.hasUserLocal() === true) {
            LoginService.logout()
        }
    }, [])

    return (
        <>
            <div className="login-body">
                <div className="box-w475">
                    <h2 className="page-title mb-4 ipw-386 ml-lg-auto">
                        로그인
                    </h2>
                    <Form noValidate onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="d-lg-flex">
                            <Form.Label>ID</Form.Label>
                            <div className="ipw-386">
                                <Form.Control
                                    type="text"
                                    placeholder="ID를 입력해주세요."
                                    isInvalid={errors.email}
                                    {...register('email')}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.email?.message}
                                </Form.Control.Feedback>
                            </div>
                        </Form.Group>
                        <Form.Group className="d-lg-flex">
                            <Form.Label>비밀번호</Form.Label>
                            <div className="ipw-386">
                                <Form.Control
                                    type="password"
                                    placeholder="비밀번호를 입력해주세요.."
                                    isInvalid={errors.password}
                                    {...register('password')}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.password?.message}
                                </Form.Control.Feedback>
                            </div>
                        </Form.Group>
                        <div className="d-lg-flex mt-5">
                            <Button
                                type="submit"
                                variant="b500"
                                className="ml-auto btw-386"
                            >
                                로그인
                            </Button>
                        </div>
                        <div className="d-flex span-login ipw-386 ml-lg-auto mt-3">
                            <Form.Check
                                label="아이디 저장"
                                type="checkbox"
                                checked={isSaveId}
                                onChange={() => { setIsSaveId(!isSaveId) }}
                                id={`saveID`}
                            />
                            <div className="ml-auto">
                                <NavLink to="/terms">회원가입 </NavLink> |
                                <NavLink to="/findidpass">
                                    ID/비밀번호 찾기
                                </NavLink>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}
