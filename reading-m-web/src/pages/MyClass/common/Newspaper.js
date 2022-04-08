import ReactPDF from "../../../components/ReactPDF";
import { useEffect, useState } from 'react';
import { NewspaperService } from "services/NewspaperService";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Newspaper(props) {
    const [data, setData] = useState(null)
    const { classId, curriculumIndex, studentId } = props.history.location.state

    useEffect(() => {
        NewspaperService.getByCurriculum(classId, studentId, curriculumIndex)
        .then((res) => {
            if (res.status === 200) {
                setData(res.data)
            }
        }).catch(err => console.log(err))
    }, [])

    return (
        <>
        {
            data && 
            <>
                <ReactPDF
                    file={data.newspaper.fileUrl}
                />
            
                <section className={'text-center'}>
                    <Button
                        as={Link}
                        className="btw-290 btn-outline"
                        to={{
                            pathname: "/my-class/book-detail",
                            state: {
                                classId: classId,
                                curriculumIndex: curriculumIndex,
                                studentId: studentId
                            }
                        }}
                    >
                        닫기
                    </Button>
                </section>
            </>
        }
        </>
    )
}