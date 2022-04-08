import { useContext } from "react"
import { Carousel, Modal } from "react-bootstrap"
import { AppContext } from "../App";

const SliderImage = ({ listImage, show, setShow }) => {
    const { isPlatformIOS } = useContext(AppContext);

    return (
        <>
            <div className="row row-cols-4 gx-6px">
                {
                    listImage.map((value, index) => {
                        return (
                            <div className="" key={index} onClick={() => setShow(true)}>
                                <img className={'img-fluid w-100 h-100 rounded-3px'}
                                    src={value.objectKey}
                                    alt=" " />
                            </div>
                        )
                    })
                }
                <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
                    <Modal.Header closeButton closeVariant={'white'} className={`border-0 bg-black ${isPlatformIOS.current === true ? 'pt-5' : ''}`}>
                    </Modal.Header>
                    <Modal.Body className="bg-black d-flex align-items-center p-0">
                        <Carousel className="slider">
                            {
                                listImage.map((value, index) => {
                                    return (
                                        <Carousel.Item key={index}>
                                            <img
                                                className="d-block w-100"
                                                src={value.objectKey}
                                                alt="First slide"
                                            />
                                        </Carousel.Item>
                                    )
                                })
                            }

                        </Carousel>
                    </Modal.Body>
                </Modal>
            </div>
        </>
    )
}

export default SliderImage