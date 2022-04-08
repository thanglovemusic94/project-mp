const ComponentType = ({ name, prop, checked, handleChange, isDisable }) => {

    const handleChecked = () => {
        if (!isDisable) {
            checked = !checked
            handleChange(prop, checked)
        }
    }

    return (
        <>
            <div>
                <div className={` ${checked ? `company__construction--active` : `bg-white text-black-400`} py-7px text-center border border-black-400`}
                     onClick={handleChecked}>
                    {name}
                </div>
            </div>
        </>
    )
}

export default ComponentType
