import Format from "../../../utils/Format"

function ItemSaleInfo({ data }) {

    const { requestedName, model, completeDate, carType, brand, paymentAmount } = data

    return <>
        <div className="mb-12px px-3">
            <div className="py-3 px-12px cc-shadow rounded-4px">
                <div className="itemSaleInfo">
                    <div className="fs-17 fw-bold border-bottom border-black-100 pb-1 mb-2">{requestedName}</div>
                    <div className="d-flex justify-content-between align-items-start">
                        <div>
                            <div className="fs-14">{brand} {model}  <span className="text-black-400">{carType}</span></div>
                            <div className="fs-13 text-black-600">{Format.datetime(completeDate, "YYYY.MM.DD HH:MM", true)}</div>
                        </div>
                        <div>
                            <span className="amount text-blue-500 fw-bold">{Format.money(paymentAmount)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>
}

export default ItemSaleInfo