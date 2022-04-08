import Pagination from "react-js-pagination";
import React from "react";

const PaginationSection = (props) => {
    const {page, size, totalPages, onClick} = props;

    return (
        <>
            <div className="pagination-wrapper d-flex justify-content-center my-5">
                <Pagination
                    itemClass="page-item"
                    linkClass="page-link"
                    activeClass="active"
                    prevPageText={"‹"}
                    nextPageText={"›"}
                    activePage={page}
                    itemsCountPerPage={size}
                    totalItemsCount={totalPages * size}
                    pageRangeDisplayed={10}
                    onChange={onClick}
                />
            </div>
        </>
    )
}

export default PaginationSection
