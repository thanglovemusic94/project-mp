import { CButton, CPagination, CPaginationItem } from "@coreui/react";
import { useEffect, useState } from "react";

const PagingItem = ({ text, ...props }) => {

    return (
        <CButton
            className="me-1"
            color="dark"
            variant="ghost"
            {...props}
        >
            {text}
        </CButton>
    );
}

function Pagination({ url, name, selectedPage, onPageChange, totalPages, limited }) {
    const limitedPage = limited ? limited : 10
    const initMax = totalPages < limitedPage ? totalPages : limitedPage

    const [maxPage, setMaxPage] = useState(0)
    const [startPage, setStartPage] = useState(0)

    useEffect(() => {
        setMaxPage(initMax)
        setStartPage(0)
    }, [totalPages, url])

    function handlePrevPage(event) {
        if (selectedPage - 1 >= 0) {
            if(selectedPage === startPage) {
                setMaxPage(limitedPage)
                setStartPage(startPage - limitedPage)
            }
            onPageChange(event, selectedPage - 1);
        }     
    }

    function handleStartPage(event) {
        setMaxPage(initMax)
        setStartPage(0)
        onPageChange(event, 0);
    }

    function handleNextPage(event) {

        if (selectedPage + 1 < totalPages) {
            if(selectedPage === (limitedPage - 1)) {
                let max = totalPages < startPage + 2*limitedPage - 1 ? totalPages - startPage - limitedPage : limitedPage
                setMaxPage(max)
                setStartPage(startPage + limitedPage)
            }
            onPageChange(event, selectedPage + 1);
        }
    }

    function handleEndPage(event) {
        setStartPage(Math.floor(totalPages/limitedPage)*limitedPage)
        let max = totalPages % limitedPage === 0 ? limitedPage : totalPages % limitedPage
        setMaxPage(max)
        onPageChange(event, totalPages - 1);
    }


    return (
        <CPagination align="center">
            <CPaginationItem
                aria-label="Start"
                component={
                    () => <PagingItem
                        name={name}
                        text="&laquo;&laquo;"
                        onClick={handleStartPage}
                        disabled={selectedPage === 0}
                    />
                }
            >
            </CPaginationItem>
            <CPaginationItem
                aria-label="Previous"
                component={
                    () => <PagingItem
                        name={name}
                        text="&laquo;"
                        onClick={handlePrevPage}
                        disabled={selectedPage === 0}
                    />
                }
            >
            </CPaginationItem>
            {
                Array.from({ length: maxPage }, (_, index) => (
                    <CPaginationItem
                        key={index + startPage}
                        component={
                            () => <PagingItem
                                name={name}
                                text={startPage + index + 1}
                                onClick={(e) => onPageChange(e, index + startPage)}
                                active={selectedPage === (index + startPage)}
                            />
                        }
                    >
                    </CPaginationItem>
                ))
            }
            <CPaginationItem
                aria-label="Next"
                component={
                    () => <PagingItem
                        name={name}
                        text="&raquo;"
                        onClick={handleNextPage}
                        disabled={selectedPage === (totalPages - 1)}
                    />
                }
            >
            </CPaginationItem>
            <CPaginationItem
                aria-label="End"
                component={
                    () => <PagingItem
                        name={name}
                        text="&raquo;&raquo;"
                        onClick={handleEndPage}
                        disabled={selectedPage === (totalPages - 1)}
                    />
                }
            >
            </CPaginationItem>
        </CPagination>
    );
}

export default Pagination;