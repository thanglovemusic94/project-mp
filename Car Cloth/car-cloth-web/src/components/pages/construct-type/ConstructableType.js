import { ConstructableTypes } from '../../../constants/ConstructableTypes';
import ComponentType from './ComponentType';

const ConstructableType = ({ data, handleChange }) => {
    return (
        <>
            {
                ConstructableTypes.map((v, i) => {
                    return <ComponentType
                        key={i}
                        name={v.label}
                        prop={v.prop}
                        checked={data[v.prop]}
                        handleChange={handleChange}
                        isDisable={false} />
                })
            }
        </>
    )
}

export default ConstructableType
