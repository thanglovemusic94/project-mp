import React from "react";
import {CPagination} from "@coreui/react";

export default function Pagination({ page, totalPages, handlePageChange}){
    return (
        <CPagination
            doubleArrows={true}
            className="mt-4"
            align="center"
            addListClass="some-class"
            activePage={page + 1}
            pages={totalPages}
            limit={10}
            onActivePageChange={handlePageChange}
        />
    )
}





