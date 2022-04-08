import React, { useState, useEffect } from 'react'
import { NoticeService } from '../../services/NoticeService'
import DateTime from '../../components/common/DateTime'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ModalNotification from 'components/common/ModalNotification'

import { getRole } from '../../constants/role.constants'

export default function NoticeDetails(props) {
    const [notice, setNotice] = useState({
        id: '',
        title: '',
        content: '',
        role: '',
        fileUrl: '',
        createdOn: '',
    })

    const [show, setShow] = useState(false);

    const previousPage = props.location?.state?.previousPage

    useEffect(() => {
        const noticeId = props.match.params.id
        NoticeService.getDetailsById(noticeId).then((resp) => {
            setNotice(resp.data)
        })
    }, [props.match.params.id])

    const onDownload = () => {
        if (notice.fileUrl === null) {
            setShow(true)
        } else {
            const link = document.createElement('a');
            link.href = notice.fileUrl;
            link.setAttribute('download', notice.fileName);
            console.log(link.download)
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

    return (
        <>
            <div className="page-details">
                <article className="article-details">
                    <h3 className="article-title">
                        <span className="notice-label">
                            {getRole(notice.role).label}
                        </span>
                        {notice.title}
                    </h3>
                    <div className="article-date text-right">
                        <DateTime format="YYYY.MM.DD" date={notice.createdOn} />
                    </div>
                    <div className="article-download text-right">
                        <Button
                            variant="outline-g700"
                            className="btw-290 btn-square"
                            onClick={() => onDownload()}
                        >
                            다운로드
                        </Button>
                    </div>
                    <div
                        className="article-content"
                        dangerouslySetInnerHTML={{ __html: notice.content }}
                    />
                    <div className="article-footer text-right">
                        <Button
                            variant="g700"
                            className="btw-290"
                            as={Link}
                            to={previousPage}
                        >
                            뒤로가기
                        </Button>
                    </div>
                </article>
            </div>
            <ModalNotification
                show={show}
                onShow={setShow}
                content={"다운로드 할 파일이 없습니다."}
            />
        </>
    )
}
