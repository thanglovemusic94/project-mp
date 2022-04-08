import ReactPDF from "components/ReactPDF"
import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { Link } from 'react-router-dom'
import { BookService } from "services/BookService"
import { NewspaperService } from "services/NewspaperService"

export default function TutorActivity(props) {
    // used only for test
    const testUrl = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

    const { contentUrl } = props.location.state;

    const [documentUrl, setDocumentUrl] = useState(contentUrl);

    // useEffect(() => {
    //     const { type } = props.location.state;
        
    //     if (type === "ACTIVITY") {
    //         const { number, bookId, role } = props.history.location.state;
            
    //         BookService.getDetail(bookId).then(res => {
    //             const field = "activitypaper" + (role === "STUDENT" ? "S" : "T") + number;
                
    //             setDocumentUrl(res.data[field]);
    //         }).catch(err => console.log(err))
    //     }
    //     else
    //     if (type === "NEWSPAPER") {
    //         const { id } = props.location.state;
            
    //         NewspaperService.getNewspaper(id).then((resp) => {

    //             if (resp.status === 200) {
    //                 const { fileUrl } = resp.data;

    //                 setDocumentUrl(fileUrl);
    //             }
    //         })
    //     }
    // }, [])

    return(
        <>
        <section className={'position-relative'}>
            <div className="row" >
                <div className="col-12">
                    <ReactPDF
                        file={documentUrl}
                    />
                </div>
            </div>
        </section>
        <section className={'text-center'}>
            <Button
                // as={Link}
                className="btw-290 btn-outline"
                // to="/"
                href={documentUrl}
            >
                다운로드
            </Button>
            <Button
                as={Link}
                className="btw-290 btn-outline"
                to="/tutor/my-class/details"
            >
                닫기
            </Button>
        </section>
        </>
    )
}