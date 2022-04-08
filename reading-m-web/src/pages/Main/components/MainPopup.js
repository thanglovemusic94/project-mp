import React, { useState, useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { MainPopupSerivce } from 'services/MainPopupSerivce'
import { UserStorage } from 'storages/UserStorage'
import Magazine1 from '../../../assets/images/magazine-1.jpg'


const MainPopup = () => {
  const [showMainPopup, setShowMainPopup] = useState(true)
  const handleCloseMainPopup = () => setShowMainPopup(false)

  const [popup, setPopup] = useState({
    "imageUrl": null,
    "videoUrl": null
  })

  useEffect(() => {

    MainPopupSerivce.getDetail().then(res => {
        const { videoUrl, imageUrl } = res.data;

        const resData = {
          "imageUrl": imageUrl ?? Magazine1,
          videoUrl
        }

        setPopup(resData);
    })

    const isSkip = UserStorage.hasSkipMainPopup();
    
    if (isSkip === false) UserStorage.delSkipMainPopup();

    setShowMainPopup(!isSkip);
  }, [])

  function handlePopupClicked() {
    window.open(
      popup.videoUrl,
      'pop',
      'width=854,height=480, scrollbars=yes, resizable=yes'
    );
  }

  function handleStopWatchingToday() {

    UserStorage.saveSkipMainPopup();
    
    handleCloseMainPopup();
  }

  return (
    <>
      <Modal
        show={showMainPopup}
        onHide={handleCloseMainPopup}
        dialogClassName="modalw-386 modalh-540 modal-mainpopup"
        centered
      >
        <Modal.Body>
          <div onClick={handlePopupClicked}>
            <img className="w-100" src={popup.imageUrl} alt="" />
          </div>
        </Modal.Body>
        <Modal.Footer className="modal-btn-half">
          <Button variant="white" onClick={handleStopWatchingToday}>
            오늘 하루 그만보기
          </Button>
          <Button variant="white" onClick={handleCloseMainPopup}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default MainPopup
