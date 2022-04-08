import API from '../utils/API'

export const BookService = {
    getBooks,
    getDetail,
    getBooksCalendarByUser
}

const BASE_API_BASE_URL = '/books'

function getBooks(params) {
    const { query, date, sort } = params

    let paramCount = -1
    const delimiter = () => {
        paramCount++

        return paramCount === 0 ? '?' : '&'
    }

    let requestURL = `${BASE_API_BASE_URL}`

    requestURL += query !== '' ? `${delimiter()}query=${query}` : ''
    requestURL += date !== '' ? `${delimiter()}date=${date}` : ''
    requestURL += sort !== '' ? `${delimiter()}sort=${sort}` : ''

    return API.get(requestURL)
}

function getDetail(id) {
    return API.get(BASE_API_BASE_URL + "/" + id)
}

function getBooksCalendarByUser(params) {
    const { userId, month } = params
    return API.get(`${BASE_API_BASE_URL}/${userId}/calendar`, {
        params: {
            month: month
        }
    })
}
