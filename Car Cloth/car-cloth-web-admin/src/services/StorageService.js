import axios from 'axios'

const StorageService = {
    upload
}

function upload(absoluteUrl, data){
    return  axios.put(absoluteUrl, data, {headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
    }})
}

export default StorageService

