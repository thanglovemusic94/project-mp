import React, { useEffect, useState } from "react";
import {
    CButton,
    CContainer, CHeader,
    CHeaderBrand,
    CTable,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow
} from "@coreui/react";
import PopupCommon from "../../../commons/PopupCommon";
import CategoryService from "../../../services/CategoryService";
import FormattedDateTime from "../../../commons/FormattedDateTime";
import { array_move } from "../../../utils/ArrayUtils";
import { PopupConstant } from "../../../constants/PopupConstant";
import CategoryRegister from "./CategoryRegister";
import CategoryUpdate from "./CategoryUpdate";

const CategoryList = () => {
    const [showSave, setShowSave] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const [showRegister, setShowRegister] = useState(false)
    const [data, setData] = useState()
    const [showUpdate, setShowUpdate] = useState(false)
    const [categoryEdit, setCategoryEdit] = useState({
        title: null,
        icon: null
    })

    const [order, setOrder] = useState([]);
    const [removeId, setRemoveId] = useState()

    const onClickYes = () => {
        setShowSave(!showSave)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => {
        CategoryService.getAll().then(res => {
            setData(res.data)
        })
    }

    const checkIdExit = (arr, id) => {
        const arrFilter = arr.filter(value => value.id === id)
        return arrFilter
    }

    const onClickUp = (id, index) => {
        array_move(data, index, index - 1)

        if (checkIdExit(order, id).length === 1) {
            const arrNew = order.filter(value => value.id !== id)
            arrNew.push({ id: id, orderCategory: (index - 1) + 1 })
            arrNew.push({ id: data[index].id, orderCategory: (index) + 1 })
            setOrder(arrNew)
        } else {
            order.push({ id: id, orderCategory: (index - 1) + 1 })
            order.push({ id: data[index].id, orderCategory: (index) + 1 })
            setOrder([...order])
        }

    }

    const onClickDown = (id, index) => {
        array_move(data, index, index + 1)
        if (checkIdExit(order, id).length === 1) {
            const arrNew = order.filter(value => value.id !== id)
            arrNew.push({ id: id, orderCategory: (index + 1) + 1 })
            arrNew.push({ id: data[index].id, orderCategory: (index) + 1 })
            setOrder(arrNew)
        } else {
            order.push({ id: id, orderCategory: (index + 1) + 1 })
            order.push({ id: data[index].id, orderCategory: (index) + 1 })
            setOrder([...order])
        }
    }

    const handlerChangeOrder = () => {
        CategoryService.changeOrder(order)
        setShowSave(!showSave)
    }

    function remove(id) {
        setRemoveId(id)
        setShowDelete(!showDelete)
    }

    const handleRemove = () => {
        CategoryService.remove(removeId).then(() => {
            setShowDelete(!showDelete)
            fetchData()
        })
    }

    const editCategory = (v) => {
        setCategoryEdit(v)
        setShowUpdate(!showUpdate)
    }
    return (
        <>
            <CContainer fluid>

                <CHeader className={'d-flex flex-wrap justify-content-lg-between align-items-center'}>
                    <CHeaderBrand className={'fw-bold'}>카테고리 관리</CHeaderBrand>
                    <div>
                        <CButton
                            className="btn btn-dark  me-2"
                            type={'submit'}
                            onClick={handlerChangeOrder}
                            disabled={order.length === 0}
                        >
                            순서 저장
                        </CButton>
                        <CButton
                            className="btn btn-dark  "
                            type={'submit'}
                            onClick={() => setShowRegister(!showRegister)}
                        >
                            카테고리 등록
                        </CButton>
                    </div>
                </CHeader>

                <CTable bordered className="table text-center my-5">
                    <CTableHead color={'secondary'}>
                        <CTableRow>
                            <CTableHeaderCell style={{ width: '15%' }}>순서</CTableHeaderCell>
                            <CTableHeaderCell>카테고리 제목</CTableHeaderCell>
                            <CTableHeaderCell style={{ width: '15%' }}>등록일</CTableHeaderCell>
                            <CTableHeaderCell style={{ width: '10%' }}>삭제​</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <tbody>
                        {
                            data && data.map((v, i) => {
                                return (
                                    <React.Fragment key={i}>
                                        <CTableRow>
                                            <CTableDataCell>
                                                <CButton
                                                    className="btn btn-dark px-2 py-1 me-2"
                                                    type={'submit'}
                                                    disabled={i === data.length - 1}
                                                    onClick={() => onClickDown(v.id, i)}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                        fill="currentColor"
                                                        className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                                        <path
                                                            d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                                                    </svg>
                                                </CButton>
                                                <CButton
                                                    className="btn btn-dark px-2 py-1 me-2"
                                                    type={'submit'}
                                                    disabled={i === 0}
                                                    onClick={() => onClickUp(v.id, i)}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                        fill="currentColor"
                                                        className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                                                        <path
                                                            d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                                                    </svg>
                                                </CButton>
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <span onClick={() => editCategory(v)}>
                                                    {v.title}
                                                </span>
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <FormattedDateTime source={v.createdOn} format={'YYYY.MM.DD'} />
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <CButton
                                                    className="btn btn-dark px-2 py-1 me-2"
                                                    onClick={() => remove(v.id)}
                                                >
                                                    삭제
                                                </CButton>
                                            </CTableDataCell>
                                        </CTableRow>
                                    </React.Fragment>
                                )
                            })
                        }
                    </tbody>
                </CTable>
            </CContainer>

            <PopupCommon show={showSave} setShow={setShowSave} type={PopupConstant.YES} content={'저장되었습니다'}
                onClickYes={onClickYes} />

            <PopupCommon type={PopupConstant.YES_NO} show={showDelete} setShow={setShowDelete}
                onClickYes={handleRemove} content={'카테고리를 삭제하시겠습니까?​'} />

            <CategoryUpdate source={categoryEdit} handler={setCategoryEdit} show={showUpdate} setShow={setShowUpdate} callback={fetchData} />

            <CategoryRegister show={showRegister} setShow={setShowRegister} callback={fetchData} />
        </>
    )
}

export default CategoryList
