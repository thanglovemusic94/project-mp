// import { CButton, CForm, CFormInput, CTable, CTableBody, CTableDataCell, CTableRow } from "@coreui/react";
// import { useHistory } from "react-router";
// import React, { useState } from "react";


// import PopupCommon from "../../../commons/PopupCommon";
// import { handleChange } from "../../../utils/StateUtils";
// import { PopupConstant } from "../../../constants/PopupConstant";
// import CategoryService from "../../../services/CategoryService";
// import { CATEGORY_ROUTER } from "../../../constants/RouterConstant";
// import AttachFileCommon from "../../../commons/AttachFileCommon";
// import StorageService from "../../../services/StorageService";
// import { Category, CommonMessage, UploadMessage } from "../../../constants/ErrorMessage";


// const CategoryForm = ({ source, handler }) => {

//     const history = useHistory();

//     const [showDelete, setShowDelete] = useState(false)

//     const [contentNotify, setContentNotify] = useState("")
//     const [showNotify, setShowNotify] = useState(false)

//     const [attachFile, setAttachFile] = useState(null)

//     const onClickYes = () => {
//         CategoryService.remove(source.id).then(() => history.push(CATEGORY_ROUTER.LIST))
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault()
//         //validated form
//         if (!source.title) {
//             setContentNotify(Category.CategoryRequired)
//             setShowNotify(!showNotify)
//             return
//         }

//         if (attachFile) {
//             CategoryService.update({ ...source, icon: { ...source.icon, fileName: attachFile.name } })
//                 .then((res) => {
//                     StorageService.upload(res.data.objectKey, attachFile)
//                         .then((r) => {
//                             history.push(CATEGORY_ROUTER.LIST)
//                         })
//                         .catch((err) => {
//                             console.log(err)
//                             setContentNotify(UploadMessage)
//                             setShowNotify(!showNotify)
//                         })
//                 })
//                 .catch((err) => {
//                     console.log(err)
//                     setContentNotify(CommonMessage)
//                     setShowNotify(!showNotify)
//                 })
//         } else {
//             CategoryService.update({ ...source, icon: null })
//                 .then((res) => {
//                     history.push(CATEGORY_ROUTER.LIST)
//                 })
//                 .catch((err) => {
//                     console.log(err)
//                     setContentNotify(CommonMessage)
//                     setShowNotify(!showNotify)
//                 })
//         }
//     }

//     return (
//         <>
//             <CForm action="" method="post" className="form-horizontal my-5"
//                 noValidate
//                 onSubmit={handleSubmit}
//             >
//                 <CTable bordered>
//                     <CTableBody>
//                         <CTableRow className={'align-middle'}>
//                             <CTableDataCell className={'bg-dark text-white text-center col-2'}>
//                                 카테고리명*
//                             </CTableDataCell>
//                             <CTableDataCell>
//                                 <CFormInput
//                                     style={{ "overflow": "hidden", "textOverflow": "ellipsis" }}
//                                     type="text"
//                                     name="title"
//                                     onChange={e => handleChange(e, source, handler)}
//                                     value={source.title}
//                                     required
//                                 />
//                             </CTableDataCell>
//                         </CTableRow>

//                         <CTableRow className={'align-middle'}>
//                             <CTableDataCell className={'bg-dark text-white text-center col-2'}>
//                                 아이콘*
//                             </CTableDataCell>
//                             <CTableDataCell className={''}>
//                                 <AttachFileCommon file={attachFile} setFile={setAttachFile} data={{attachFile: source.icon}}
//                                     accept=".jpg,.jpeg,.png" />
//                             </CTableDataCell>
//                         </CTableRow>
//                     </CTableBody>
//                 </CTable>
//                 <div className="d-flex flex-wrap justify-content-between">
//                     <CButton
//                         className={"btn btn-dark "}
//                         onClick={() => history.push(CATEGORY_ROUTER.LIST)}
//                     >
//                         목록
//                     </CButton>


//                     <div className={'d-flex flex-wrap'}>
//                         {
//                             <>
//                                 <CButton
//                                     className={'btn btn-dark  me-2'}
//                                     onClick={() => setShowDelete(!showDelete)}
//                                 >
//                                     삭제
//                                 </CButton>
//                                 <PopupCommon type={PopupConstant.YES_NO}
//                                     show={showDelete}
//                                     setShow={setShowDelete}
//                                     content={'삭제하시겠습니까?\n' +
//                                         '\n' +
//                                         '삭제 시 복구할 수 없습니다.'}
//                                     onClickYes={onClickYes}
//                                 />
//                             </>

//                         }

//                         <CButton
//                             className="btn btn-dark "
//                             type={'submit'}
//                         >
//                             저장
//                         </CButton>
//                     </div>
//                 </div>
//             </CForm>

//             <PopupCommon
//                 type={PopupConstant.YES}
//                 show={showNotify}
//                 setShow={setShowNotify}
//                 content={contentNotify}
//                 onClickYes={() => setShowNotify(!showNotify)}
//             />
//         </>
//     )
// }

// export default CategoryForm
