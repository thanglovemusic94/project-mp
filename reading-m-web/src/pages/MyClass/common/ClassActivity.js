import ReactPDF from "../../../components/ReactPDF";
import {Button} from "react-bootstrap";
import React from "react";

export default function ClassActivity(props) {
    const url = props.history.location.state.url

    return (
        <>
            <ReactPDF
                file={url}
            />
          
            <section className={'text-center'}>
                <Button
                    // as={Link}
                    className="btw-290 btn-outline"
                    // to="/"
                >
                    취소
                </Button>
            </section>
        </>
    )
}
