import { Col, Image, Row } from "react-bootstrap"
import React from "react";

const style = {
    imgCard: { paddingRight: '0px', marginRight: '.5rem' },
    rowImgs: { marginRight: '0px', marginLeft: '0px' }
}

export function ListImage(props) {
    let lst = (props.data) &&
        props.data.map((item, index) => {
            return  <div key={index} className="" style={style.imgCard}>
                        <ImageItem style={(props.style) ? props.style : {}} src={item} />
                    </div>
        })
    return (<Row style={style.rowImgs}>{lst}</Row>)
}

export function ImageItem(props) {
    const styleImg = (props.style) ? props.style : {};
    return (
        <Image src={(props.src) ? props.src : "https://www.tibs.org.tw/images/default.jpg"} alt="title" style={styleImg} />
    )
}