import {useContext, useEffect, useState} from "react";
import ProductInfoService from "../../services/ProductInfoService";
import ItemCategory from "../../components/pages/product-info/ItemCategory";
import {AppContext} from "../../App";
import ErrorCommon from "../../components/popups/ErrorCommon";
import NavHeaderSpacer from "../../components/NavHeaderSpacer";

function ProductInfoPage() {
    const [data, setData] = useState()
    const { showNoticePopup } = useContext(AppContext);

    useEffect(() => {
        ProductInfoService.getAllCategory()
            .then(res => {
                setData(res.data)
            })
            .catch((error) => {
                if (error.response?.data?.message) {
                    showNoticePopup(error.response.data.message)
                } else {
                    return ErrorCommon(showNoticePopup, error)
                }
            })
        // eslint-disable-next-line
    }, [])

    return (
        <div className="position-absolute top-0 end-0 w-100 h-100">
            <NavHeaderSpacer />
            {data &&
                <div className="product-info">
                    {
                        data.map((v, i) => {
                            return <ItemCategory source={v} key={i} />
                        })
                    }
                </div>
            }
        </div>
    )
}

export default ProductInfoPage;
