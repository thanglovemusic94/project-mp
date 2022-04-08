import React, {useEffect, useState} from "react";
import {
    CButton,
    CContainer,
    CHeader, CHeaderBrand,
    CTable,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow
} from "@coreui/react";
import PopupCommon from "../../commons/PopupCommon";
import {PopupConstant} from "../../constants/PopupConstant";
import PointService from "../../services/PointService";
import FormattedDateTime from "../../commons/FormattedDateTime";

const PointList = () => {
    const [showSave, setShowSave] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const [showCompanyGroup, setShowCompanyGroup] = useState(false)
    const [id, setId] = useState();
    const [data, setData] = useState()
    const [query, setQuery] = useState({
        sort: null,
    }); // and refresh data

    const [idsChange, setIdsChange] = useState([])
    const [dataForm, setDataForm] = useState()

    const handleDelete = () => {
        PointService.remove(id).then(() => {
            setQuery({...query})
            setShowDelete(false)
        })
    }

    const handleSave = () => {
        const arr = []
        data.map(v => {
            if (idsChange.indexOf(v.id) !== -1){
                delete v.createdOn
                arr.push(v)
            }
            return v
        })

        PointService.edit(arr).then(() => {
            setShowSave(!showSave)
            setIdsChange([])
            setData(null)
            setQuery({...query})
        })

    }

    const handleChangeInput = (e, index, id) => {
        const exit_Id = idsChange.filter(v => v === id)[0]
        if (exit_Id === undefined){
            idsChange.push(id)
            setIdsChange(idsChange)
        }
        setIdsChange(idsChange)

        const {name, value} = e.target;
        data[index][name] = value
        setData([...data])
    }


    const handleSubmitForm = (event) => {
        event.preventDefault()
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.stopPropagation()
        } else {
            PointService.create(dataForm.name).then(()=>{
                setShowCompanyGroup(!showCompanyGroup)
                setQuery({...query})
            })
        }
        form.classList.add('was-validated')
    }

    useEffect(() => {
        PointService.getAll(query).then(res => {
            setData(res.data)
        })
    }, [query])


    return (
        <>
            <CContainer fluid>


                    <CHeader className={'d-flex flex-wrap justify-content-between align-items-center'}>
                        <CHeaderBrand className={'fw-bold'}>포인트 설정</CHeaderBrand>
                        <div>
                            <CButton
                                className="btn btn-dark  me-2"
                                type={'submit'}
                                onClick={() => setShowCompanyGroup(!showCompanyGroup)}
                            >
                                업체 그룹 등록
                            </CButton>
                            <CButton
                                className="btn btn-dark  "
                                onClick={handleSave}
                            >
                                저장
                            </CButton>
                        </div>
                    </CHeader>



                <CTable bordered className="table text-center my-5">
                    <CTableHead color={'secondary'}>
                        <CTableRow>
                            <CTableHeaderCell className={'col-1'}>순서</CTableHeaderCell>
                            <CTableHeaderCell>업체 그룹</CTableHeaderCell>
                            <CTableHeaderCell className={'col-2'}>업체 이용료 (30일)</CTableHeaderCell>
                            <CTableHeaderCell className={'col-2'}>견적서 전달 비용</CTableHeaderCell>
                            <CTableHeaderCell className={'col-2'}>그룹 등록일</CTableHeaderCell>
                            <CTableHeaderCell className={'col-1'}>관리</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <tbody>
                    {
                        data && data
                        .sort((first, second) => {
                            if(first?.name === "기본그룹") return -1
                            if(second?.name === "기본그룹") return 1
                            if(first?.createdOn <= second?.createdOn) return -1
                            return 1})
                        .map((value, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <CTableRow>
                                        <CTableDataCell>
                                            {data.number > 0 ? (data.number * data.size + index + 1) : (index + 1)}
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            {value.name}
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            <input type="text" name={'fee'} className="text-center form-control"
                                                   value={value.fee}
                                                   onChange={e => handleChangeInput(e, index, value.id)}
                                            />

                                        </CTableDataCell>
                                        <CTableDataCell>
                                            <input type="text" name={'deliveryCost'}
                                                   className="text-center form-control"
                                                   value={value.deliveryCost}
                                                   id="basic-url" onChange={e => handleChangeInput(e, index, value.id)}
                                            />

                                        </CTableDataCell>
                                        <CTableDataCell>
                                            {value.name !== "기본그룹"?
                                                <FormattedDateTime source={value.createdOn} format={'YYYY.MM.DD'}/>
                                                :
                                                "-"
                                            }
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            {value.name !== "기본그룹" ?
                                                <CButton
                                                    className="btn btn-dark px-2 py-1 me-2"
                                                    onClick={() => {
                                                        setShowDelete(!showDelete)
                                                        setId(value.id)
                                                    }}
                                                >
                                                    삭제
                                                </CButton>
                                                :
                                                "-"
                                            }

                                        </CTableDataCell>
                                    </CTableRow>
                                </React.Fragment>
                            )
                        })
                    }
                    </tbody>
                </CTable>
            </CContainer>

            <PopupCommon show={showCompanyGroup}
                         setShow={setShowCompanyGroup}
                         type={PopupConstant.INPUT_YES_NO}
                         content={'그룹명'}
                         dataForm={dataForm}
                         errorForm={'그룹명은 최소1글자 최대 20글자 이내로 입력해 주세요'}
                         setDataForm={setDataForm}
                         onClickYes={handleSubmitForm}
            />
            <PopupCommon show={showSave} setShow={setShowSave} type={PopupConstant.YES}
                         onClickYes={() => setShowSave(!setShowSave)}/>
            <PopupCommon show={showDelete} setShow={setShowDelete} type={PopupConstant.YES_NO}
                         onClickYes={handleDelete}/>
        </>
    )
}

export default PointList
