import React from 'react'

const SearchNotFound = ({ content }) => {
    const propsContent = content ? content : "일치하는 검색 결과가 없습니다.";

    return (
        <>
            {/* Please customize this component to be able to get the flexible <p> description  in different cases */}
            <section className="search-noresult">
                <i className="lcicon-noresult"></i>
                <p>{ propsContent }</p>
            </section>
        </>
    )
}

export default SearchNotFound
