import axios from 'axios'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Button, Form, FormControl, Modal } from 'react-bootstrap'

export default function RoadSearchPopup(props) {
    const formRef = useRef(null)

    useEffect(() => {
        formRef.current.submit()
    }, [])

    return (
        <div hidden={true}>
            <Form
                action="https:www.juso.go.kr/addrlink/addrLinkUrl.do"
                method="GET"
                ref={formRef}
            >
                <input
                    type="hidden"
                    name="confmKey"
                    value="devU01TX0FVVEgyMDIxMDcyNzE4MDYxMjExMTQ1OTQ="
                />
                <input
                    type="hidden"
                    name="returnUrl"
                    value={process.env.REACT_APP_API_URL + 'roadApi/callback'}
                />
                <input type="hidden" name="resultType" value="4" />
                <input type="hidden" name="encodingType" value="UTF-8" />
            </Form>
        </div>
    )
}
