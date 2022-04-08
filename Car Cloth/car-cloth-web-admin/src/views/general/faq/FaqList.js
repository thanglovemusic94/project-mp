import {
    CButton,
    CContainer,
    CHeader,
    CHeaderBrand,
    CTable,
    CTableHead,
    CTableHeaderCell,
    CTableRow
} from "@coreui/react";
import PopupCommon from "../../../commons/PopupCommon";
import React, {memo, useCallback, useEffect, useState} from "react";
import {useHistory} from "react-router";
import {FAQ_ROUTER} from "../../../constants/RouterConstant";
import {PopupConstant} from "../../../constants/PopupConstant";
import {FaqService} from "../../../services/FaqService";
import {array_move} from "../../../utils/ArrayUtils";
import update from 'immutability-helper';
import {useDrop} from "react-dnd";
import RowItem from "./RowItem";


const FaqList = () => {
    const history = useHistory();
    const [showSave, setShowSave] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const [refresh, setRefresh] = useState(false);
    const [data, setData] = useState();
    const [checkMove, setCheckMove] = useState(false);

    const [order, setOrder] = useState({
        listOrder: [],
        startOrder: Number.MAX_VALUE,
        endOrder: Number.MIN_VALUE
    });
    const [id, setId] = useState();

    const onClickYes = () => {
        FaqService.remove(id).then(() => {
            setRefresh(!refresh)
        })
        setShowDelete(!showDelete)
    }


    const handlerChangeOrder = () => {
        if (checkMove){
            const newData = data.map(v => {
                delete v.title
                delete v.content
                delete v.createdOn
                delete v.updatedOn
                return v
            })
            FaqService.changeOrder(newData).then(() => {
                setShowSave(!showSave)
                setCheckMove(false)
                setRefresh(!refresh)
            })
        }else {
            const list = order.listOrder
            list.splice(0, order.startOrder)
            list.splice(order.endOrder - order.startOrder + 1)
            console.log(order.listOrder)
            FaqService.changeOrder(order.listOrder).then(() => {
                setShowSave(!showSave)
                setCheckMove(false)
                setRefresh(!refresh)
            })
        }
    }

    const onClickUpAnDown = (id, index, data, order, setOrder, clickName) => {
        let startOrder = 0
        let endOrder = 0

        if (clickName === 'up') {
            startOrder = index - 1
            endOrder = index
        }

        if (clickName === 'down') {
            startOrder = index
            endOrder = index + 1
        }

        const arr = array_move(data, startOrder, endOrder);

        const arrOrder = []
        arr.map((value) => {
            return arrOrder.push({id: value.id, position: value.position})
        })

        if (order.endOrder < endOrder) {
            if (order.startOrder < startOrder) {
                setOrder({...order, listOrder: arrOrder, endOrder: endOrder})
            } else {
                setOrder({listOrder: arrOrder, startOrder: startOrder, endOrder: endOrder})
            }
        } else {
            if (order.startOrder < startOrder) {
                setOrder({...order, listOrder: arrOrder})
            } else {
                setOrder({...order, listOrder: arrOrder, startOrder: startOrder})
            }
        }
        setCheckMove(false)
    };

    useEffect(() => {
        FaqService.findAll().then(r => {
            setData(r.data)
        })
    }, [refresh])


    const findItem = useCallback(
        (id) => {
            const item = data.filter((c) => c.id === id)[0];
            return {
                item: item,
                index: data.indexOf(item)
            };
        },
        [data]
    );
    const moveItem = useCallback(
        (id, atIndex) => {
            const { item, index } = findItem(id);
            setData(
                update(data, {
                    $splice: [
                        [index, 1],
                        [atIndex, 0, item]
                    ]
                })
            );
            setCheckMove(true)
        },
        [findItem, data, setData]
    );
    const [, drop] = useDrop(() => ({ accept: 'ITEM' }));

    return (
        <>

                <CContainer fluid>
                <CHeader>
                    <CHeaderBrand className={'fw-bold'}>FAQ 목록</CHeaderBrand>
                </CHeader>
                <CTable bordered className="table text-center my-5">
                    <CTableHead color={'secondary'}>
                        <CTableRow>
                            <CTableHeaderCell className={'col-1'}>순서</CTableHeaderCell>
                            <CTableHeaderCell>FAQ 제목</CTableHeaderCell>
                            <CTableHeaderCell className={'col-2'}>등록일</CTableHeaderCell>
                            <CTableHeaderCell className={'col-1'}></CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <tbody ref={drop} >
                    {
                        data && data.map((v, index) => {
                            return (
                                <React.Fragment key={v.position}>
                                    <RowItem index={index}
                                             data={data}
                                             id={v.id}
                                             moveItem={moveItem}
                                             findItem={findItem}
                                             v={v}
                                             setShowDelete={setShowDelete}
                                             showDelete={showDelete}
                                             onClickDown={() => onClickUpAnDown(v.id, index, data, order, setOrder, 'down')}
                                             onClickUp={() => onClickUpAnDown(v.id, index, data, order, setOrder, 'up')}
                                             setId={setId}
                                    />
                                </React.Fragment>
                            )
                        })
                    }
                    </tbody>
                </CTable>
                <div className={'d-flex flex-wrap justify-content-between align-items-center'}>
                    <div>* 드래그앤드랍으로 순서를 변경할 수 있습니다</div>
                    <div>
                        <CButton
                            className="btn btn-dark  me-2"
                            type={'submit'}
                            onClick={handlerChangeOrder}
                            disabled={order.listOrder.length === 0 && checkMove === false}
                        >
                            순서 저장
                        </CButton>
                        <CButton
                            className="btn btn-dark  "
                            onClick={() => history.push(FAQ_ROUTER.REGISTER)}
                        >
                            등록
                        </CButton>
                    </div>
                </div>
            </CContainer>

            <PopupCommon show={showSave} setShow={setShowSave} type={PopupConstant.YES}
                         onClickYes={() => setShowSave(!setShowSave)}/>
            <PopupCommon show={showDelete} setShow={setShowDelete} type={PopupConstant.YES_NO}
                          onClickYes={onClickYes}/>
        </>
    )
}

export default memo(FaqList)
