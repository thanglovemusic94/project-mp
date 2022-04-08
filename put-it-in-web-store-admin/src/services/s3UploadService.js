import { put } from 'axios';

export function uploadByPresignedUrl(url, file) {
    return put(url, file)
}