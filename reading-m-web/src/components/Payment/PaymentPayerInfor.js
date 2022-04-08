
export default function PaymentPayerInfor(props) {
    const payer = props.payer

    return (
        <>{payer.name &&
            <section className="payment__payer">
                <h3 className="payment__title">결제자 정보</h3>
                <div className="payment__box-gray">
                    <table className="table">
                        <tbody>
                            <tr>
                                <th>이름</th>
                                <td>{payer.name}</td>
                            </tr>
                            <tr>
                                <th>휴대폰 번호</th>
                                <td>{payer.phone}</td>
                            </tr>
                            <tr>
                                <th>이메일</th>
                                <td>{payer.email}</td>
                            </tr>
                            <tr>
                                <th>자녀정보</th>
                                <td>{payer.childName}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        }
        </>
    )
}
