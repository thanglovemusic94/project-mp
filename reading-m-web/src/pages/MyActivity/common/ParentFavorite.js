import LCPagination from 'components/LCPagination'
import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {ClassCartService} from 'services/ClassCartService'
import {ClassType, convertClassType} from 'constants/class.constants'
import SearchNotFound from 'components/SearchNotFound'
import {ParentService} from "../../../services/ParentService";
import CustomDropdown from "../../../components/CustomDropdown";

export default function ParentFavorite() {
    const userId = useSelector((state) => state.user.id)
    const [data, setData] = useState()
    const [params, setParams] = useState({
        page: 0,
        size: 10,
        sort: 'createdOn,DESC',
        studentId: null,
    })

    const [listChildren, setListChildren] = useState([{label: '내가 찜한 수업', value: null}]);
    const onPageChange = (page) => {
        if (page >= 0) setParams({ ...params, page })
    }

    const handleInputChange = (e, k) => {
        setParams({...params, studentId: k})
    }

    function getChildren(){
        ParentService.getChildren().then(res => { 
            setListChildren([{label: '내가 찜한 수업', value: null}, 
                ...res.data.map(v => {return {label: v.name + " 찜한 수업", value: v.id}})]
            )
        })
    }

    function getCarts(){
        ClassCartService.getCarts(params).then((resp) => {
            if (resp.status === 200) {
                setData(resp.data)
            }
        }).catch(e => console.log(e))
    }


    useEffect(() => {
        getChildren()
        getCarts()
    }, [params])

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
console.log(listChildren)
console.log(params)
    return (
        <>
            {data &&
                <div className="d-flex justify-content-end mb-3">
                    <CustomDropdown
                        items={listChildren}
                        onChange={handleInputChange}
                        name={'studentId'}
                        className={"form-control-dropdown ipw-184 w-100"}
                        defaultValue={null}
                    />
                </div>
            }

            {data && data.content.length > 0 ?
                <section className="myfavorite-section">
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
                            pageNumber={data.number}
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
