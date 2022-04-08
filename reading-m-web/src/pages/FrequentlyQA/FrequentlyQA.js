import React, { useState, useEffect } from 'react'
import { Collapse } from 'react-bootstrap'
import { FaqService } from './../../services/FaqService';
import { Pagination } from 'react-bootstrap';

export default function FrequentlyQA() {
    const [opens, setOpens] = useState([])

    const[pageable, setPageable] = useState({
        page: 0,
        size: 10
    })

    const [data, setData] = useState({content: []})
    const onPageChange = (page) => {
        if (page >= 0 && page < data.totalPages) {
            setPageable({...pageable, page})
        }    
    }

    useEffect(() => {
        FaqService.findAll(pageable).then((res) => {
            if (res.status === 200) {
                setData(res.data)
                setOpens(res.data.content.map((faq) => false))
            }
        }).catch(err => console.log(err));
    }, [pageable])

    const handleClick = (index) => {
        opens[index] = !opens[index]
        setOpens([...opens])
    }

    return (
        <>
            <div className="frequentlyqa-body">
                <h2 className="page-title mb-4">자주 묻는 질문</h2>
                <div className="tablelist g700">
                    <div className="tablelist-header"></div>
                    <div className="tablelist-body">
                        {data.content.map((faq, index) => 
                            <div className="tablelist-row-group" key={faq.id}>
                                <div
                                    className="tablelist-row pointer"
                                    onClick={() => handleClick(index)}
                                    aria-expanded={opens[index]}
                                >
                                    <div className="tcol-10">
                                        <span className="qa-label">Q</span>
                                    </div>
                                    <div className="tcol-70 text-left">
                                        {faq.question}
                                    </div>
                                    <span className="toggle-action">
                                        <i className="lcicon-dropClose"></i>
                                    </span>
                                </div>
                                <div className="tablelist-row-group tablelist-row-collapse">
                                    <Collapse in={opens[index]}>
                                        <div id={"answer" + faq.id}>
                                            <div className="tablelist-row g100">
                                                <div className="tcol-10">
                                                    <span className="qa-label">
                                                        A
                                                    </span>
                                                </div>
                                                <div className="tcol-70 text-left">
                                                    <p className="mb-1">
                                                       {faq.answer}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Collapse>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="pagination-wrapper d-flex justify-content-center my-5">
                <Pagination>
                    <Pagination.First onClick={() => onPageChange(0)}/>
                    <Pagination.Prev onClick={() => onPageChange(pageable.page - 1)}/>
                    <Pagination>{Array(data.totalPages).fill(0).map((item, index) => 
                        <Pagination.Item key={index} 
                            active={index === data.number}
                            onClick={() => onPageChange(index)}
                        >
                            {index + 1}
                        </Pagination.Item>   
                    )}</Pagination>
                    <Pagination.Next onClick={() => onPageChange(pageable.page + 1)}/>
                    <Pagination.Last onClick={() => onPageChange(data.totalPages - 1)}/>
                </Pagination>
            </div>
            </div>
        </>
    )
}
