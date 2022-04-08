const ARRAY_PATTERN = /^(\w+\d*)\[(\d+)]/

export function handleChange(dispatch, ev) {
    const { name, type, files, value: val } = ev.currentTarget

    let value
    switch (type) {
        case 'file':
            ;[value] = files
            break
        case 'text':
            if (name === 'tuitionFee' || name.indexOf('fee') !== -1){
                value = val.replace(/,/g, '')
                break
            }else {
                value = val
                break
            }
        default:
            value = val
            break
    }

    dispatch({ type: 'HANDLE_CHANGE', name, value })
}

export function setValueByNestedPath(obj, nPath, value) {
    const paths = nPath.split('.')

    return setValueByPath(obj, paths, value)
}

function setValueByPath(obj, paths, value) {
    const matched = paths[0].match(ARRAY_PATTERN)

    if (paths.length === 1) {
        if (matched) {
            obj[matched[1]][matched[2]] = value
        } else {
            obj[paths[0]] = value
        }
        return
    }

    if (matched) {
        return setValueByPath(
            obj[matched[1]][matched[2]],
            paths.slice(1),
            value
        )
    } else {
        return setValueByPath(obj[paths[0]], paths.slice(1), value)
    }
}
