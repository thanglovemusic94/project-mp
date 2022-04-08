import { Checked, UnChecked } from "../../assets/svgs/CheckBoxIcon"

const CheckBox = ({ className, label, prop, checked, handleChange, isDisable }) => {

    const handelChecked = () => {
        if (!isDisable) {
            checked = !checked
            handleChange(prop, checked)
        }
    }

    return (
        <>
            <div className={`${className}`} onClick={handelChecked}>
                <span className={'me-2'}>
                     {checked ? <Checked /> : <UnChecked />}
                </span>
                <span className={`${checked ? `checked text-blue-400 ` : ``}fs-14 align-middle`}>{label}</span>
            </div>
        </>
    )
}

export default CheckBox
