import React from 'react'
import PaymentForm from './components/PaymentForm'
import PaymentStatus from './components/PaymentStatus'

const Payment = (props) => {
    return (
        <>
            <div className="payment-body">
                <PaymentStatus />
                <PaymentForm  classInfo = {props.history.location.state}/>
            </div>
        </>
    )
}

export default Payment
