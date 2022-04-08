import { UserRole } from 'constants/role.constants'
import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { UserStorage } from 'storages/UserStorage'

const TutorApply = () => {
    const history = useHistory()

    const [show1, setShow1] = useState(false)
    const handleShow1 = () => setShow1(true)
    const handleClose1 = () => setShow1(false)

    function handleApply() {
        const user = UserStorage.getUserLocal()

        if (user !== null) {
            handleShow1()
        } else {
            history.push('/tutor-terms')
        }
    }

    return (
        <>
            <div className="tutorapply-body">
                <h2 className="page-title mb-4">지도교사 지원하기</h2>
                <div className="tutorapply-content">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quos, sint voluptates dicta mollitia quia molestiae
                        consequatur cum voluptatibus exercitationem nisi numquam
                        illum quisquam facere non tempora. Facilis asperiores
                        perspiciatis officia.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quos, sint voluptates dicta mollitia quia molestiae
                        consequatur cum voluptatibus exercitationem nisi numquam
                        illum quisquam facere non tempora. Facilis asperiores
                        perspiciatis officia.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quos, sint voluptates dicta mollitia quia molestiae
                        consequatur cum voluptatibus exercitationem nisi numquam
                        illum quisquam facere non tempora. Facilis asperiores
                        perspiciatis officia.
                    </p>
                </div>
                <div className="text-center">
                    <Button
                        variant="p500"
                        className="btw-386 mt-4"
                        onClick={handleApply}
                    >
                        지도교사 지원하기
                    </Button>
                </div>
            </div>
            <Modal
                show={show1}
                onHide={handleClose1}
                dialogClassName="modalw-386 modal-comfirm"
                centered
            >
                <Modal.Body scrollable={true}>
                    <div className="modal-body-inner flex-column">
                        {UserStorage.getLocalUserRole() ===
                            UserRole.PARENT.value ||
                        UserStorage.getLocalUserRole() ===
                            UserRole.STUDENT.value ? (
                            <>
                                <p className="mb-0">
                                    학생 및 학부모는 지도교사
                                </p>
                                <p className="mb-0">
                                    지원하기가 불가능 합니다.
                                </p>
                            </>
                        ) : (
                            <p className="mb-0">
                                지도교사는 지원이 불가능합니다.
                            </p>
                        )}
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal-btn-half">
                    <Button variant="g700" onClick={handleClose1}>
                        확인
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default TutorApply
