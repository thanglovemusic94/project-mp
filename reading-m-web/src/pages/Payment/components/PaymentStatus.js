import React from 'react'

const PaymentStatus = () => {
  return (
    <>
      <section className="payment__status">
        <div className="text-center">
          <span className="current">결제하기</span>
          <span className="ps-done">결제완료</span>
        </div>
      </section>
      {/* <section className="payment__status">
        <div className="text-center">
          <span className="">결제하기</span>
          <span className="ps-done current">결제완료</span>
        </div>
      </section> */}
    </>
  )
}

export default PaymentStatus
