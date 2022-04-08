import { EntryRouteLabel } from '../../../assets/svgs/CheckBoxIcon';
import { EntryRouteConstants } from '../../../constants/EntryRouteConstants';
import CheckBox from '../../base/CheckBox';

const EntryRoute = ({ data, handleChange }) => {
    return (
        <>
            <div className="check-box">
                <div className="check-label">
                    <EntryRouteLabel />
                </div>
                <div className="check-content">
                    {
                        EntryRouteConstants.map((v, i) => {
                            return <CheckBox
                                key={i}
                                label={v.label}
                                prop={v.prop}
                                checked={data[v.prop]}
                                handleChange={handleChange}
                                isDisable={false} />
                        })
                    }
                </div>

            </div>
        </>
    )
}

export default EntryRoute
