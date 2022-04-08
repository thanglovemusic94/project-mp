import { SCHOOL_GRADE } from 'constants/class.constants'
import React, { useState } from 'react'
import ClassPhoto from '../assets/images/class-photo.png'
import { BiLeftArrow, BiRightArrow } from "react-icons/bi"

const GRADE_MAP = {
    "GRADE_0": "G1",
    "GRADE_1": "G2",
    "GRADE_2": "G3",
    "GRADE_3": "G4",
    "GRADE_4": "G5",
    "GRADE_5": "G6"
}

const BookListTableRow = ({ source }) => {
    const bookGrade = SCHOOL_GRADE[GRADE_MAP[source.grade]];

    return (
        <div className="tablelist-row">
            <span className="tcol-md-40 tcol-60 text-left">
                <img
                    src={source.image !== null ? source.image : ClassPhoto}
                    alt=""
                    className="booklist__photo"
                />
                {source.title}
            </span>
            <span className="tcol-md-20 tcol-70 booklist__author tclear">
                {source.writer}
            </span>
            <span className="tcol-md-20 tcol-25 d-none d-lg-block">
                {source.publisher}
            </span>
            <span className="tcol-md-20 tcol-30 booklist__grade">
<<<<<<< HEAD
                {`${bookGrade.stage.name} ${bookGrade.value}학년`}
=======
                { `${ bookGrade.stage.label } ${ bookGrade.value }학년` }
>>>>>>> 52ff89b9d4c4906c9608a31fdff84d838f6fc70a
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

export default function BookList({ source, selectedDate, onDateChange }) {
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

    return (
        <>
            <div className="booklist">
                <div className="booklist__calendar text-center">
                    <span onClick={handleGetBookPrev}>
                        <BiLeftArrow />
                    </span>
                    <span>  {`${selectedYear}년 ${selectedMonth}월`} </span>
                    <span onClick={handleGetBookNext}>
                        <BiRightArrow />
                    </span>
                </div>
                <BookListTable source={propsSource} />
            </div>
        </>
    )
}
