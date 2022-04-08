import React, {useEffect, useState} from 'react'
import {Button} from 'react-bootstrap'
import {Link, useParams} from 'react-router-dom'
import {MainService} from '../../services/MainService'
import {DateUtils} from '../../utils/DateUtils'

const MagazineDetails = () => {
    let { id } = useParams()
    const [magazine, setMagazine] = useState({})

    useEffect(() => {
        MainService.getMagazineDetail(id)
            .then((res) => {
                setMagazine(res.data)
            })
            .catch((e) => {
                console.log(e)
            })
    }, [id])

    return (
        <>
            <div className="page-details">
                <h2 className="page-title mb-4">매거진 리스트</h2>
                <article className="article-details">
                    <h3 className="article-title">{magazine.title}</h3>
                    <div className="article-date text-right">
                        {DateUtils.toLocalDate(magazine.createdAt)}
                    </div>
                    <div className="article-download text-right">
                        <Button
                            variant="outline-g700"
                            className="btw-290 btn-square"
                            href={magazine.file}
                        >
                            다운로드
                        </Button>
                    </div>
                    <div className="article-content">
                        <div className="text-center">
                            <img src={magazine.imagePc} alt="" />
                        </div>
                    </div>
                    <div className="article-footer text-right">
                        <Button
                            variant="g700"
                            className="btw-290"
                            as={Link}
                            to="/magazine-list"
                        >
                            매거진 리스트로 가기
                        </Button>
                    </div>
                </article>
            </div>
        </>
    )
}

export default MagazineDetails
