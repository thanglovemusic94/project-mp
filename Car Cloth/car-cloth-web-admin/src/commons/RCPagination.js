import { CButton, CPagination, CPaginationItem } from "@coreui/react";

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

function RCPagination({ name, selectedPage, onPageChange, totalPages }) {

    function handlePrevPage(event) {

        if (selectedPage - 1 >= 0)
            onPageChange(event, selectedPage - 1);
    }

    function handleNextPage(event) {

        if (selectedPage + 1 < totalPages)
            onPageChange(event, selectedPage + 1);
    }


    return (
        <CPagination align="center">
            <CPaginationItem
                aria-label="Start"
                component={
                    () => <PagingItem
                        name={name}
                        text="&laquo;&laquo;"
                        onClick={(e) => onPageChange(e, 0)}
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
                    />
                }
            >
            </CPaginationItem>
            {
                Array.from({ length: totalPages }, (_, index) => (
                    <CPaginationItem
                        key={index}
                        component={
                            () => <PagingItem
                                name={name}
                                text={index + 1}
                                onClick={(e) => onPageChange(e, index)}
                                active={selectedPage === index}
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
                        onClick={(e) => onPageChange(e, totalPages - 1)}
                    />
                }
            >
            </CPaginationItem>
        </CPagination>
    );
}

export default RCPagination;
