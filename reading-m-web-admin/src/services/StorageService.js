import axios from 'axios'

export const StorageService = {
    upload,
}

function upload(absoluteUrl, data) {
    return axios.put(absoluteUrl, data, {
       // headers: { 'Content-Type': data.type },
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}

