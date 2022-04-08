// import { CContainer, CHeader, CHeaderBrand } from "@coreui/react";
// import { useState } from "react";
// import { useLocation } from "react-router";
// import CategoryForm from "./CategoryForm";

// const CategoryEdit = () =>{
//     const {state} = useLocation();

//     const [data, setData] = useState({
//         "id": state.id,
//         "icon": {
//             "fileName": state.icon?.fileName,
//             "objectKey": state.icon?.objectKey
//         },
//         "title": state.title
//     })

//     return (
//         <CContainer fluid>

//             <CHeader>
//                 <CHeaderBrand className={'fw-bold'}>카테고리 상세 및 수정</CHeaderBrand>
//             </CHeader>
//             <CategoryForm source={data} handler={setData}/>
//         </CContainer>
//     )
// }

// export default CategoryEdit
