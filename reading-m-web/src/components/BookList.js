import React, { useEffect, useState } from 'react'
import ClassPhoto from '../assets/images/class-photo.png'
import { Button } from "react-bootstrap";
import { checkClassTagRole, getRole } from "../constants/role.constants";
import { colorByRole } from "../constants/colorByRole";
import { MstConfigSerivce } from "../services/MstConfigService";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/all";
import { convertGrade, convertSchool } from 'constants/book.constants';

const BookListTableRow = ({ source }) => {

    return (
        <div className="tablelist-row">
            <span className="tcol-md-40 tcol-60 text-left">
                <img
                    src={source.B_image !== null ? source.B_image : ClassPhoto}
                    alt=""
                    className="booklist__photo"
                />
                {source.B_title}
            </span>
            <span className="tcol-md-20 tcol-70 booklist__author tclear">
                {source.B_writer}
            </span>
            <span className="tcol-md-20 tcol-25 d-none d-lg-block">
                {source.B_publisher}
            </span>
            <span className="tcol-md-20 tcol-30 booklist__grade">
                {convertSchool(source.B_school)} {convertGrade(source.B_grade)}
            </span>
        </div>
    )
}

const BookListTable = ({ source }) => {

    return (
        <div className="tablelist g700">
            <div className="tablelist-header">
                <span className="tcol-md-40 tcol-70">도서명</span>
                <span className="tcol-md-20 d-none d-lg-block">
                    지은이
                </span>
                <span className="tcol-md-20 d-none d-lg-block">
                    출판사
                </span>
                <span className="tcol-md-20 tcol-30">학년</span>
            </div>
            <div className="tablelist-body">
                {
                    source.map((item, index) => {

                        return <BookListTableRow key={index} source={item} />
                    })
                }
            </div>
        </div>
    )
}

export default function BookList({ source, selectedDate, onDateChange, isHiddenBt }) {
    const roleName = getRole().value
    const propsSource = source ? source : [];
    const propsSelectedDate = selectedDate ? selectedDate : new Date();

    const selectedMonth = propsSelectedDate.getMonth() + 1;
    const selectedYear = propsSelectedDate.getFullYear();

    function handleGetBookNext() {

        addMonth(1);
    }

    function handleGetBookPrev() {

        addMonth(-1);
    }

    function addMonth(val) {

        if (onDateChange !== undefined) {
            let nextMonth = new Date(selectedDate);
            nextMonth.setMonth(nextMonth.getMonth() + val);

            onDateChange(nextMonth);
        }
    }

    const [linkGoToByBook, setLinkGoToByBook] = useState('');
    useEffect(() => MstConfigSerivce.getByKey('BookPurchasingURL').then(res => setLinkGoToByBook(res.data)), [])

    return (
        <>
            <div className="booklist">
                <div className="booklist__calendar text-center">
                    <h4>
                        <span className={'text-g300'} style={{ cursor: "pointer" }} onClick={handleGetBookPrev}>
                            <AiFillCaretLeft className={'g300'} />
                        </span>

                        <span>  {`${selectedYear}년 ${selectedMonth}월`} </span>
                        <span className={'text-g300'} style={{ cursor: "pointer" }} onClick={handleGetBookNext}>
                            <AiFillCaretRight className={'g300'} />
                        </span>
                    </h4>
                </div>

                <BookListTable source={propsSource} />
                <div className="d-flex d-lg-block text-right mt-5">
                    <Button
                        variant={`${checkClassTagRole(
                            roleName,
                            ...colorByRole
                        )}`}
                        className={`btw-290 ml-2`}
                        onClick={() => window.location.assign(linkGoToByBook)}
                        hidden={isHiddenBt}
                    >
                        도서 구매하러 가기
                    </Button>
                </div>
            </div>
        </>
    )
}
