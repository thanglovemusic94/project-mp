import React from 'react'
import LCPagination from 'components/LCPagination'
import TutorCard from './TutorCard'

const TutorList = ( { type, source, paging, onPageChange } ) => {

  return (
    <>
      <section className="tutor-list gutter-10">
        <div className="row">
          {
            source.map((item, index) => {

              return (
                <div className="col-md-5ths col-sm-6" key={index}>
                  <TutorCard source={item} type={type} />
                </div>
              )
            })
          }
        </div>
      </section>
      <div className="pagination-wrapper d-flex justify-content-center my-5">
        <LCPagination
          pageNumber={paging.pageNumber}
          totalPage={paging.totalPage}
          onPageChange={onPageChange}
        />
      </div>
    </>
  )
}

export default TutorList
