import { useHistory } from 'react-router-dom';
import { PRODUCT_INFO_PAGE_ROUTE } from '../../../constants/RouteConstants';

const ItemCategory = ({ source }) => {

    const history = useHistory()
    const handleGoto = () => {
        history.push({
            pathname: PRODUCT_INFO_PAGE_ROUTE.BRAND,
            state: source.id
        })
    }

    return (
        <>
        <div className="wrap-category-item">
            <div className="category-item" onClick={handleGoto}>
                <img src={source.icon?.objectKey} alt={source.icon?.fileName}/>
                <p>{source.title}</p>
            </div>
        </div>
        </>
    )
}

export default ItemCategory
