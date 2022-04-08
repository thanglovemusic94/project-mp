import React, { useEffect, useState } from 'react'
import DatetimeFilter from 'components/DatetimeFilter'
import { ClassService } from 'services/ClassService'
import SearchNotFound from '../../components/SearchNotFound'
import TutorList from '../../components/TutorList'
import RadioFilter from 'components/RadioFilter'
import { LiveClassType, GRADE_RANGE_SELECTIONS } from 'constants/class.constants'
import SearchBar from 'components/SearchBar'
import { TIME_OF_DAY } from 'constants/datetime.constants'

const LiveclassBook = () => {
    const [paging, setPaging] = useState({
        pageNumber: 0,
        pageSize: 10,
    })

    const [data, setData] = useState({
        content: [],
        totalPages: 0,
    })

    const [filter, setFilter] = useState({
        tutorName: '',
        day: null,
        startHour: { hour: null, minute: null },
        gradeRange: null,
        timeOfDay: TIME_OF_DAY[0],
    })

    const gradeRangeSelections = GRADE_RANGE_SELECTIONS.map((item, index) => {
        return item.name
    })

    useEffect(() => {
        getClassData()
    }, [paging, filter])

    function handleChangePage(pageNumber) {
        setPaging({ ...paging, pageNumber })
    }

    function handleDatetimeFilterChange(val) {
        setFilter({
            ...filter,
            day: val.selectedDate,
            startHour: val.selectedTime,
            timeOfDay: val.selectedTimeOfDay,
        })
    }

    function handleRadioChange(val) {
        setFilter({
            ...filter,
            gradeRange: GRADE_RANGE_SELECTIONS[val].value,
        })
    }

    function handleSearchChange(val) {
        setFilter({
            ...filter,
            tutorName: val,
        })
    }

    function handleFilter() {
        getClassData()
    }

    function getClassData() {
        let body = {
            classType: 'LIVE_BOOK',
            page: paging.pageNumber,
            size: paging.pageSize,
        }

        const formatter = (raw) => {
            return raw.toString().padStart(2, '0')
        }

        if (filter.tutorName !== '') body.tutorName = filter.tutorName

        if (
            filter.day !== null &&
            filter.startHour.hour !== null &&
            filter.startHour.minute !== null
        ) {
            const day = [
                filter.day.getFullYear(),
                formatter(filter.day.getMonth() + 1),
                formatter(filter.day.getDate()),
            ].join('-')

            const startHour = `${formatter(filter.startHour.hour)}:${formatter(
                filter.startHour.minute
            )} ${filter.timeOfDay.value}`

            body.startTime = day + " " + startHour
        }

        if (filter.gradeRange !== null && filter.gradeRange != 'ALL')
            body.gradeRange = filter.gradeRange

        ClassService.search(body).then((resp) => {
            if (resp.status === 200) {
                setData(resp.data)
            }
        })
    }

    return (
        <>
            <section className="filter-section">
                <div className="filter-top row mx-n1">
                    <DatetimeFilter
                        selectedDatetime={{
                            selectedDate: filter.day,
                            selectedTime: filter.startHour,
                            selectedTimeOfDay: filter.timeOfDay,
                        }}
                        onChange={(val) => handleDatetimeFilterChange(val)}
                    />
                </div>
                <div className="filter-bottom d-xl-flex justify-content-between">
                    <div className="filter-grade mb-3">
                        <RadioFilter
                            source={gradeRangeSelections}
                            onRadioChange={handleRadioChange}
                        />
                    </div>
                    <div className="mb-3">
                        <SearchBar
                            onChange={handleSearchChange}
                            onFinish={handleFilter}
                        />
                    </div>
                </div>
            </section>
            {/* Tutor list */}
            {data.content.length > 0 ? (
                <TutorList
                    type={LiveClassType.LiveClassBook.value}
                    source={data.content}
                    paging={{
                        pageNumber: paging.pageNumber,
                        totalPage: data.totalPages,
                    }}
                    onPageChange={handleChangePage}
                />
            ) : (
                <SearchNotFound />
            )}
        </>
    )
}

export default LiveclassBook
