import React, {useState, useEffect} from 'react'
import MathCard from '../../components/MathCard'
import LCPagination from 'components/LCPagination'
import { ClassService } from 'services/ClassService'

const MathDavinci = (props) => {
       
    const [pageable, setPageable] = useState({
        page: 0,
        size: 10
    })

    const [data, setData] = useState({
        content: [],
        totalPages: 0,
    })

    useEffect(() => {
        ClassService.getDavinciClass(pageable).then((res) => {
            if (res.status === 200) {
                setData(res.data)
            }
        }).catch(err => {
            console.log(err)
        })
    }, [pageable])

    const onPageChange = (page) => {
        setPageable({...pageable, page})
    }

    return (
        <>
            <div className="mathdavinci-body">
                <h2 className="page-title mb-4">과학수학 다빈치</h2>
                <section className="tutor-list gutter-10">
                    <div className="row">
                    {
                        data.content.map((e, i) => {
                            return (
                                <div className="col-md-5ths col-sm-6" key={data.content[i].id}>
                                       <MathCard classData={data.content[i]}/>              
                                </div>
                            )
                        })
                    } 
                        
                    </div>
                </section>
                <div className="pagination-wrapper d-flex justify-content-center my-5">
                    <LCPagination
                        pageNumber={pageable.page}
                        totalPage={data.totalPages}
                        onPageChange={page => onPageChange(page)}
                    />
                </div>
            </div>
        </>
    )
}

export default MathDavinci
