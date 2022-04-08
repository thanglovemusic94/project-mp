const InputForm = ({name, className, label, render, onChange, defaultValue, readOnly, as, rows, maxlength, ...props}) => {
    return (

        <>
            <div className={`${className ?? 'mt-3'} py-3 px-12px bg-white border rounded-16px box-shadow`}>
                <label htmlFor="exampleFormControlInput1" className="form-label ">{label}</label>
                {
                    render ??
                    <div>
                        {
                            as === 'textarea' ?
                                <textarea
                                    type="text"
                                    rows={rows}
                                    onChange={onChange}
                                    className="text-black-800 p-12px form-control rounded-8px lh-21 fs-14"
                                    name={name}
                                    defaultValue={defaultValue}
                                    readOnly={readOnly}
                                    maxLength={maxlength}
                                    {...props}
                                />
                                :

                                <input
                                    name={name}
                                    defaultValue={defaultValue}
                                    type="text"
                                    className="text-black-800 p-12px form-control rounded-8px lh-21 fs-14"
                                    onChange={onChange}
                                    readOnly={readOnly}
                                    maxLength={maxlength}
                                    {...props}
                                />
                        }
                    </div>
                }
            </div>
        </>
    )
}

export default InputForm
