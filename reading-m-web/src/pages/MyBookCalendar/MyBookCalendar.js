import BookList from 'components/BookList'
import React, { useEffect, useState } from 'react'
import { BookService } from 'services/BookService'
import { DateUtils } from 'utils/DateUtils'
import { UserStorage } from 'storages/UserStorage'
import useGetChildrenByParent from "../MyClass/common/customHook/useGetChildrenByParent";
import CustomDropdown from "../../components/CustomDropdown";

export default function MyBookCalendar() {
    const userRole = UserStorage.getLocalUserRole();
    const userId = UserStorage.getLocalUserId();
    const isSudent = userRole === "STUDENT" ? true : false
    const isParent = userRole === "PARENT" ? true : false

    const PA_SEARCH_MONTH = "YYYY.MM"
    const CURRENT_MONTH = DateUtils.toLocalDate(new Date(), PA_SEARCH_MONTH)
    // const [selectedMonth, setSelectedMonth] = useState(
    //     DateUtils.toLocalDate(new Date(), PA_SEARCH_MONTH))

    const [data, setData] = useState(null)

    const { children, childId, setChildId } = useGetChildrenByParent()

    const [params, setParams] = useState({
        userId: userId,
        month: CURRENT_MONTH
    })

    useEffect(() => {
        if (isParent && childId) {
            BookService.getBooksCalendarByUser({ ...params, userId: childId })
                .then((resp) => {
                    setData(resp.data)
                })
                .catch(e => console.log(e))
        } else {
            BookService.getBooksCalendarByUser(params)
                .then((resp) => {
                    setData(resp.data)
                })
                .catch(e => console.log(e))
        }

    }, [params, childId])

    function handleDateChange(value) {
        const changeMonth = DateUtils.toLocalDate(value, PA_SEARCH_MONTH)
        if (changeMonth !== params.month && changeMonth <= CURRENT_MONTH) {
            setParams({ ...params, 'month': changeMonth })
        }
    }

    return (
        <>
            <section className="mybookcalendar-body">
                <div hidden={!isSudent}>
                    <h2 className="page-title mb-4">내 도서 캘린더</h2>
                </div>

                <div hidden={!isParent}>
                    <h2 className="page-title mb-4">자녀 도서 캘린더</h2>
                </div>

                {
                    isParent &&
                    <div className="d-flex justify-content-end mb-3">
                        {children.length > 0 &&
                            <CustomDropdown
                                items={children}
                                className={"form-control-dropdown ipw-184"}
                                classNameToggle={'btn-sm'}
                                name="childId"
                                onChange={(e, k) => {
                                    setChildId(k)
                                    setParams({ ...params, userId: childId })
                                }}
                            />
                        }
                    </div>

                }

                <BookList
                    source={data}
                    selectedDate={new Date(params.month)}
                    onDateChange={handleDateChange}
                    isHiddenBt={false}
                />
            </section>
        </>
    )
}
