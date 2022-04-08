import {memo} from "react";
import {CButton, CTableDataCell, CTableRow} from "@coreui/react";
import {Link} from "react-router-dom";
import {FAQ_ROUTER} from "../../../constants/RouterConstant";
import FormattedDateTime from "../../../commons/FormattedDateTime";
import {useDrag, useDrop} from "react-dnd";

const styleDrag = {
    cursor: 'move',
    color: 'white',
    background: 'lightgray',
    opacity: 0.5
}
const RowItem = ({ id, data,  v,  index, moveItem, findItem, onClickUp, onClickDown,showDelete, setShowDelete, setId}) => {
    const originalIndex = findItem(id).index;
    // const originalIndex = index;
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'ITEM',
        item: { id, originalIndex },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        end: (item, monitor) => {
            const { id: droppedId, originalIndex } = item;
            const didDrop = monitor.didDrop();
            if (!didDrop) {
                moveItem(droppedId, originalIndex);
            }
        },
    }), [id, originalIndex, moveItem]);
    const [, drop] = useDrop(() => ({
        accept: 'ITEM',
        canDrop: () => false,
        hover({ id: draggedId }) {
            if (draggedId !== id) {
                const { index: overIndex } = findItem(id);
                moveItem(draggedId, overIndex);
            }
        },
    }), [findItem, moveItem]);
    const style = isDragging ? styleDrag : {cursor: 'move'}
    return (
        <>
            <CTableRow ref={(node) => drag(drop(node))} style={{...style }} >
                <CTableDataCell>
                    <CButton
                        className="btn btn-dark px-2 py-1 me-2"
                        type={'submit'}
                        disabled={index === data.length - 1}
                        onClick={onClickDown}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                             fill="currentColor"
                             className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                            <path
                                d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                        </svg>
                    </CButton>
                    <CButton
                        className="btn btn-dark px-2 py-1 me-2"
                        type={'submit'}
                        disabled={index === 0}
                        onClick={onClickUp}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                             fill="currentColor"
                             className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                            <path
                                d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                        </svg>
                    </CButton>
                </CTableDataCell>
                <CTableDataCell className={'text-start'}>
                    <Link to={`${FAQ_ROUTER.EDIT}/${v.id}`}>{v.title}</Link>
                </CTableDataCell>
                <CTableDataCell>
                    <FormattedDateTime source={v.createdOn} format={'YYYY.MM.DD'}/>
                </CTableDataCell>
                <CTableDataCell>
                    <CButton
                        className="btn btn-dark px-2 py-1 me-2"
                        onClick={() => {
                            setShowDelete(!showDelete)
                            setId(v.id)
                        }}
                    >
                        삭제
                    </CButton>
                </CTableDataCell>
            </CTableRow>
        </>
    )
}

export default memo(RowItem)
