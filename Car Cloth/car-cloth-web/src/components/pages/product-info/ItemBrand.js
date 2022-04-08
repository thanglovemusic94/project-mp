import { useHistory } from 'react-router-dom';
import { PRODUCT_INFO_PAGE_ROUTE } from "../../../constants/RouteConstants";

const ItemBrand = ({ source }) => {

    const history = useHistory()
    const handleGoto = () => {
        history.push({
            pathname: PRODUCT_INFO_PAGE_ROUTE.BRAND_DETAIL,
            state: source.id
        })
    }

    return (
        <>
            <div className="brand-item" onClick={handleGoto}>
                <img src={source.attachFile?.objectKey}
                    alt={source.attachFile?.fileName}></img>
                {/* <img src="https://picsum.photos/383/110"
                    alt={source.attachFile?.fileName}></img> */}
                    
                <p >{source.brandName}</p>
            </div>
        </>
    )
}

export default ItemBrand
