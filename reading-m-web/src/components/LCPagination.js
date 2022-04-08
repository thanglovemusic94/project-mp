import { Pagination } from 'react-bootstrap'

const LCPagination = ( { pageNumber, totalPage, onPageChange } ) => {
    
    function handlePageChange(newPageNumber) {
        if (newPageNumber === pageNumber || 0 > newPageNumber || newPageNumber >= totalPage) return;

        if (onPageChange !== undefined)
            onPageChange(newPageNumber)
    }

    return (
        <Pagination>
            <Pagination.First onClick={() => handlePageChange(0)} />
            <Pagination.Prev onClick={() => handlePageChange(pageNumber - 1)} />
            {
                Array.from(Array(totalPage)).map((item, index) => {
                    // Indicate where the ellipsis should appear after number of items
                    const ellipsisBoundLeft = 5
                    const ellipsisBoundRight = 6
                    ////

                    // Indicate when the component should start show the ellipsis
                    const lowerBound = ellipsisBoundLeft
                    const upperBound = totalPage - ellipsisBoundRight
                    ////

                    // Define page item's templates
                    let pageItem = <></>
                    let pageItemEllipsis = <Pagination.Ellipsis />
                    let pageItemFull =  <Pagination.Item
                                        key={index}
                                        active={index === pageNumber}
                                        onClick={() => handlePageChange(index)}
                                    >
                                        {index + 1}
                                    </Pagination.Item>
                    ////

                    function setPageItem(lowerPad, upperPad) {

                        if (pageNumber - ellipsisBoundLeft - lowerPad < index && index < pageNumber + ellipsisBoundRight + upperPad) {
                            pageItem = pageItemFull
                        } else 
                        if (pageNumber - ellipsisBoundLeft - lowerPad === index || index === pageNumber + ellipsisBoundRight + upperPad) {
                            pageItem = pageItemEllipsis
                        }
                    }

                    // Handle logic to display the page item
                    if (totalPage > ellipsisBoundLeft + ellipsisBoundRight) {
                        if (pageNumber <= lowerBound) {
                            const upperPad = lowerBound - pageNumber

                            setPageItem(0, upperPad)
                        } else
                        if (pageNumber >= upperBound) {
                            const lowerPad = pageNumber - upperBound + 1

                            setPageItem(lowerPad, 0)                          
                        } else 
                        if (lowerBound < pageNumber && pageNumber < upperBound) {
                            setPageItem(0, 0)
                        }                        
                    } else {
                        pageItem = pageItemFull
                    }
                    ////

                    return pageItem
                })
            }            
            <Pagination.Next onClick={() => handlePageChange(pageNumber + 1)} />
            <Pagination.Last onClick={() => handlePageChange(totalPage - 1)} />
        </Pagination>
    )
}

export default LCPagination
