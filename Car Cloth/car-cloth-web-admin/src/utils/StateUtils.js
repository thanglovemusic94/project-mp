
export function handleChange(event, source, handler) {
    const { name, value } = event.target;
    handler({ ...source, [name]: value });
}

export function handlePageChange(event, value, source, handler) {
    const { name } = event.target;

    handler({ ...source, [name]: value });
}

export function handleChangeDataArray(event, index,  source, handler) {
    const {name, value} = event.target
    source[index][name] = value
    handler([...source])
}
