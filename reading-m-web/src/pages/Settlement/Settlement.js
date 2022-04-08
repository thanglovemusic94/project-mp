import FormattedDateTime from 'components/common/FormattedDateTime';
import LCPagination from 'components/LCPagination'
import { ClassType } from 'constants/class.constants';
import { SettlementConstants } from 'constants/settlement.constants';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { SettlementService } from 'services/SettlementService';
import ModalSettlementDetails from './components/ModalSettlementDetails'

const SettlementContext = createContext();

export default function Settlement() {
    const [data, setData] = useState({
        "content": [],
        "totalPages": 0
      });

    const [pageable, setPageable] = useState({
        "page": 0,
        "size": 10
    })

    // State ModalSettlementDetails
    const [detailsPopup, setDetailsPopup] = useState(false)
    const showDetailsPopup = () => setDetailsPopup(true)

    const [selectedItemId, setSelectedItemId] = useState(-1);

    useEffect(() => {

        SettlementService.getTutorSettlement(pageable).then((resp) => {

            if (resp.status === 200) {

                setData(resp.data);
            }
        })
    }, [pageable])

    function handlePageChange(newPage) {

        setPageable({ ...pageable, "page": newPage });
    }

    function handleShowDetailsPopup(id) {

        setSelectedItemId(id);
        showDetailsPopup();
    }

    return (
        <SettlementContext.Provider value={ { handleShowDetailsPopup } }>
            <div className="settlement-body">
                <h2 className="page-title mb-4">수업 정산 내역</h2>
                
                <div className="tablelist g700">
                    <div className="tablelist-header">
                        <div className="tcol-50 d-none d-lg-block">
                            수업 정보
                        </div>
                        <div className="tcol-md-10 d-none d-lg-block">
                            수업개설일
                        </div>
                        <div className="tcol-md-10 d-none d-lg-block">
                            정산금액
                        </div>
                        <div className="tcol-md-10 d-none d-lg-block">
                            정산상태
                        </div>
                        <div className="tcol-md-20 d-none d-lg-block">
                            정산 상세
                        </div>
                        <div className="tcol-100 d-lg-none">정산 정보</div>
                    </div>
                    <div className="tablelist-body">
                        {
                            data.content.map((item, index) => {

                                return (
                                    <SettlementDataItem key={ `SettlementDataItem_${index}` } source={ item } />
                                )
                            })
                        }                           
                    </div>
                </div>
                
                <div className="pagination-wrapper d-flex justify-content-center my-5">
                    <LCPagination
                        defaultPageActive={ pageable.page }
                        totalPage={ data.totalPages }
                        onPageChange={ handlePageChange }
                    />
                </div>
                
                <ModalSettlementDetails 
                    show={detailsPopup} 
                    setShow={setDetailsPopup} 
                    itemId={selectedItemId}
                />
            </div>
        </SettlementContext.Provider>
    )
}

function SettlementDataItem({ source }) {
    const { handleShowDetailsPopup } = useContext(SettlementContext);

    return (
        <div className="tablelist-row">                         
            <div className="tcol-100 tcol-md-50 text-left text-500">
                [{ ClassType[`${ source.liveClass.type }`].label }] { source.liveClass.name }
            </div>
            <div className="tcol-30 tcol-md-10 text-g500">
                <FormattedDateTime source={ source.liveClass.openDate } format="YYYY.MM.DD" />
            </div>
            <div className="tcol-30 tcol-md-10">
                { source.amount } 원
            </div>
            <div className="tcol-30 tcol-md-10 text-g500">
                { SettlementConstants[`${ source.status }`] }
            </div>
            <div className="tcol-10 tcol-md-20">
                <Button
                    size="sm"
                    variant=""
                    className="btw-100 btn-outline-g100 btn-square d-none d-lg-block m-auto"
                    onClick={() => handleShowDetailsPopup(source.id)}
                >
                    상세
                </Button>
                <i
                    className="lcicon-next-settlement d-block d-lg-none icol-next-settlement"
                    onClick={() => handleShowDetailsPopup(source.id)}
                ></i>
            </div>
        </div>
    )
}