import axios from 'axios'

const RESULT_TYPE = {
    ROADNAME: 1,
    ROADNAME_LOTNUMBER_DETAILVIEW_LOCALCOMMUNITYCENTER: 2,
    ROADNAME_DETAILVIEW_DETAILBUILDINGNAME: 3,
    ROADNAME_LOTNUMBER_DETAILVIEW_LOCALCOMMUNITYCENTER_DETAILEDBUILDINGNAME: 4,
}

export const RoadAPIService = {
    search,
}

function search(term) {
    fetch('https://www.juso.go.kr/addrlink/addrLinkApiJsonp.do', {
        method: 'POST',
        crossDomain: true,
        dataType: 'jsonp',
        body: JSON.stringify({
            confmKey: 'devU01TX0FVVEgyMDIxMDcyNzE4MDYxMjExMTQ1OTQ=',
            currentPage: 1,
            countPerPage: 10,
            resultType: 'json',
            useDetailAddr: 'Y',
            keyword: term,
        }),
        headers: {},
    })
}
