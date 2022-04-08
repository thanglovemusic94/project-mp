//format url query
export function stringify(obj){
    function formatter(key, value) {
        return value === null ? key : [ key,'=',value].join('');
    }

    return obj ? Object.keys(obj).sort().map(function (key) {
        const val = obj[key];

        if (val === undefined || val === null || (typeof val === 'string' && val.trim().length === 0)) {
            return '';
        }

        if (Array.isArray(val)) {
            const result = [];
            val.slice().forEach(function (val2) {
                if (val2 === undefined) {
                    return;
                }
                result.push(formatter(key, val2, result.length));
            });

            return result.join('&');
        }

        return key + '=' + val;
    }).filter((x) => {
        return x.length > 0
    }).join('&') : '';
}
