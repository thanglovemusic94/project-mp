import axios from 'axios'

export const S3Utils = {
    upload,
}

function upload(absoluteUrl, data, type) {
    return axios.put(absoluteUrl, data, {
        headers: { 'Content-Type': type ? type: data.type },
    })
}
