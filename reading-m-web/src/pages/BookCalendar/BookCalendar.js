import BookList from 'components/BookList'
import CustomDropdown from 'components/CustomDropdown'
import { GRADE_SELECTION, GRADE_SECONDARY, SCHOOL_STAGE_SELECTION } from 'constants/class.constants'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { BookService } from 'services/BookService'
import { MstConfigSerivce } from 'services/MstConfigService'

const BookCalendar = () => {
    const [data, setData] = useState(null)
    const [filter, setFilter] = useState({
        clazz: 'ALL',
        grade: 'ALL',
    })
    const [selectedDate, setSelectedDate] = useState(new Date())

    const [grade, setGrade] = useState(GRADE_SELECTION);

    const [linkGoToByBook, setLinkGoToByBook] = useState('');
    useEffect(() => MstConfigSerivce.getByKey('BookPurchasingURL')
        .then(res => setLinkGoToByBook(res.data)), [])

    useEffect(() => {
        fetchData(filter, selectedDate)
    }, [])

    function handleSchoolStageSelected(value) {

        setFilter({ ...filter, clazz: value })

        if (value === 'SECONDARY') {
            setGrade(GRADE_SECONDARY)
        } else {
            setGrade(GRADE_SELECTION)
        }
    }

    function handleGradeSelected(value) {

        setFilter({ ...filter, grade: value })
    }

    function handleFilterApply() {
        fetchData(filter, selectedDate)
    }

    function handleDateChange(value) {
        setSelectedDate(value)

        fetchData(filter, value)
    }

    function fetchData(pFilter, pDate) {
        let body = {
            query: '',
            date: '',
            sort: 'title,ASC'
        }

        // Add 'query' to request URL
        let query = ''

        Object.entries(pFilter).map((item, index) => {
            if (item[1] !== 'ALL') {
                query += `${query !== '' ? ' AND ' : ''}`
                query += `${item[0]}:${item[1]}`
            }
        })

        body = { ...body, query }

        // Add 'date' to request URL
        const currentDate = new Date()
        const selectedMonth = pDate.getMonth()
        const selectedYear = pDate.getFullYear()

        if (
            selectedMonth !== currentDate.getMonth() ||
            selectedYear !== currentDate.getFullYear()
        ) {
            const date = `${selectedYear}.${(selectedMonth + 1)
                .toString()
                .padStart(2, '0')}`

            body = { ...body, date }
        }

        BookService.getBooks(body).then((resp) => {
            if (resp.status === 200) {
                setData(resp.data)
            }
        })
    }

    return data !== null ? (
        <>
            <div className="bookcalendar-body">
                <section className="bookcalendar-search">
                    <div className="d-lg-flex justify-content-between">
                        <div className="d-lg-flex d-block">
                            <div className="d-flex mb-2 mb-lg-0 mx-n1">
                                <div className="ipw-285 w-100 px-1">
                                    <CustomDropdown
                                        items={SCHOOL_STAGE_SELECTION}
                                        onChange={(e, k) => handleSchoolStageSelected(k)}
                                    />
                                </div>
                                <div className="ipw-285 w-100 px-1">
                                    <CustomDropdown
                                        items={grade}
                                        onChange={(e, k) => handleGradeSelected(k)}
                                        mapping={['label', 'value']}
                                    />
                                </div>
                            </div>
                            <Button
                                type="button"
                                variant="g700"
                                className="btn-search mb-2 mb-lg-0"
                                onClick={handleFilterApply}
                            >
                                검색
                            </Button>
                        </div>

                        <Button
                            variant="b500"
                            className="btw-290"
                            onClick={() => window.location.assign(linkGoToByBook)}
                        >
                            도서 구매하러 가기
                        </Button>
                    </div>
                </section>

                <BookList
                    source={data}
                    selectedDate={selectedDate}
                    onDateChange={handleDateChange}
                    isHiddenBt={true}
                />
            </div>
        </>
    ) : (
        <></>
    )
}

export default BookCalendar
