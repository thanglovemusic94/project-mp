
export function handleChange(event, source, handler) {
    const { name, value } = event.target;

    if (!name) {
        handler(value);
    } else {
        handler({ ...source, [name]: value });
    }
}

export function handlePageChange(event, value, source, handler) {
    const { name } = event.target;

    handler({ ...source, [name]: value });
}