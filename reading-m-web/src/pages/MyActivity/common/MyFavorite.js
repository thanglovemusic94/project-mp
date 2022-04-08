import LCPagination from 'components/LCPagination'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ClassCartService } from 'services/ClassCartService'
import { MdCancel } from 'react-icons/md'
import { convertClassType } from 'constants/class.constants'
import { ClassType } from 'constants/class.constants'
import SearchNotFound from 'components/SearchNotFound'
import MenuItem, { Dropdown } from "react-bootstrap";

export default function MyFavorite() {
    const userId = useSelector((state) => state.user.id)

    const [data, setData] = useState({
        content: [],
        totalPages: 0,
        totalElements: 0,
        number: 0,
        size: 0,
    })

    const [params, setParams] = useState({
        page: 0,
        size: 10,
        sort: 'createdOn,DESC',
        studentId: userId,
    })

    const [selected, setSelected] = useState('내가 찜한 수업');

    useEffect(() => {
        ClassCartService.getCarts(params).then((resp) => {
            if (resp.status === 200) {
                setData(resp.data)
            }
        })
    }, [params])

    const onPageChange = (page) => {
        if (page >= 0) setParams({ ...params, page })
    }

    const onFilterChange = (e) => {
        if (e) {
            setSelected('내가 찜한 수업')
        } else {
            setSelected('학부모가 찜한 수업')
        }

        setParams({ ...params, studentId: e })
    }

    const cancelCart = (id) => {
        ClassCartService.cancelCart(id).then((resp) => {
            if (resp.status === 200) {
                let carts = data.content;
                carts = carts.filter(function (obj) {
                    return obj.id != id;
                });

                setData({ ...data, content: carts })
            }
        })
    }

    return (
        <>
            {data.content.length > 0 ?
                <section className="myfavorite-section">
                    <div className="d-flex justify-content-end mb-3">
                        <Dropdown className="form-control-dropdown ipw-240 w-100"
                            onSelect={onFilterChange}>
                            <Dropdown.Toggle
                                id="dropdown"
                                variant=""
                                className="btn-sm"
                            >
                                {selected}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item eventKey={userId}>
                                    내가 찜한 수업
                                </Dropdown.Item>
                                <Dropdown.Item eventKey=''>
                                    학부모가 찜한 수업
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="tablelist g700">
                        <div className="tablelist-header">
                            <div className="tcol-md-80 tcol-100 font-weight-bold">
                                수업 정보
                            </div>
                            <div className="tcol-10 font-weight-bold d-none d-lg-block">
                                지도교사
                            </div>
                        </div>
                        <div className="tablelist-body">
                            {data.content.map((value, index) => (
                                <div key={index} className="tablelist-row">
                                    <div className="tcol-100 tcol-md-80 text-left text-500">
                                        <Link
                                            to={{
                                                pathname: value.type === ClassType.DavinciClass.value ?
                                                    `/mathdavinci-details/${value.classInfo.id}` :
                                                    `/liveclass-details`,
                                                state: {
                                                    'liveClassInfo': {
                                                        'tutorId': value.classInfo.tutor?.id,
                                                        'liveClassId': value.classInfo.id,
                                                        'liveClassType': value.classInfo.type
                                                    }
                                                }
                                            }}
                                        >
                                            [{convertClassType(value.classInfo.type)}] {value.classInfo.name}
                                        </Link>
                                    </div>
                                    <div className="tcol-md-10 tcol-20 tclear">
                                        {value.classInfo.tutor?.name}
                                    </div>
                                    {/* <div className="tcol-md-10" hidden={value.id.userId != userId}>
                                        <span >
                                            <MdCancel onClick={() => cancelCart(value.id)} />
                                        </span>
                                    </div> */}
                                    <div className="tcol-md-10" hidden={value.id.userId != userId}
                                        onClick={() => cancelCart(value.id)}>
                                        <button className="icon-like liked border-0">
                                            <i className="lcicon-hear"></i>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="pagination-wrapper d-flex justify-content-center my-5">
                        <LCPagination
                            pageNumber={params.page}
                            totalPage={data.totalPages}
                            onPageChange={page => onPageChange(page)}
                        />
                    </div>
                </section>
                :
                <SearchNotFound content="찜한 수업이 없습니다." />
            }
        </>
    )
}
