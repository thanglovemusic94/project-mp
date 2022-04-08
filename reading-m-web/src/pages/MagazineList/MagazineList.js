import React, {useEffect, useState} from 'react'
import {Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {MainService} from '../../services/MainService'
import {DateUtils} from '../../utils/DateUtils'
import PaggingUtils from '../../utils/PagingUtils'

const MagazineList = () => {
    const [magazine, setMagazine] = useState({
        content: [],
        totalPages: 0,
        number: 0,
        size: 0,
    })

    const [params, setParams] = useState({
        page: 0,
        size: 10,
        sort: 'id,DESC',
    })

    function handlePageChange(e) {
        setParams({...params, page: e - 1})
    }

    useEffect(() => {
        MainService.getAllMagazine(params).then((resp) => {
            setMagazine(resp.data)
        }).catch(err => console.log(err))
    }, [params])


    return (
        <>
            <h2 className="page-title mb-4">매거진 리스트</h2>
            <section className="magazine-list gutter-10">
                <div className="row">
                    {magazine.content.map((value, index) => (

                            <div key={index} className="col-md-5ths col-sm-6">
                                <div className="magazine-card">
                                    <div className="mc-photo">
                                        <img
                                            className="w-100"
                                            src={value.imagePc}
                                            alt=""
                                        />
                                    </div>
                                    <div className="mc-body">
                                        <div className="mc-title">
                                            {value.title}
                                        </div>
                                        <div className="mc-date">
                                            {DateUtils.toLocalDate(
                                                value.createdAt
                                            )}
                                        </div>
                                        <Button
                                            variant="g700"
                                            as={Link}
                                            className=""
                                            to={'/magazine-details/' + value.id}
                                        >
                                            자세히보기
                                        </Button>
                                    </div>
                                </div>
                            </div>

                    ))}
                </div>
            </section>
            <PaggingUtils
                page={params.page + 1}
                size={params.size}
                totalPages={magazine.totalPages}
                onClick={handlePageChange}
            />
        </>
    )
}

export default MagazineList
