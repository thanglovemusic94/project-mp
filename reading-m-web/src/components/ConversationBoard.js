import { UserStorage } from "storages/UserStorage"
import ConversationItem from "./ConversationItem"
import LCPagination from './LCPagination'
import { SUBJECT_SELECTIONS } from 'constants/class.constants'

function ConversationBoard({ source, paging, onPageChange, onDelete, onReply }) {
    const { content } = source
    const userRole = UserStorage.getLocalUserRole()


    function handleDelete(val) {

        if (onDelete !== undefined)
            onDelete(val)
    }

    function handleReply(val) {

        if (onReply !== undefined)
            onReply(val)
    }

    return (
        <>
            <section className="applicationlist-section">
                <div className="tablelist g700">
                    <div className="tablelist-header d-flex">
                        <div className="tcol-20 d-none d-lg-block">
                            카테고리
                        </div>
                        <div className="tcol-40 d-none d-lg-block">제목</div>
                        <div className="tcol-20 d-none d-lg-block">신청자</div>
                        <div className="tcol-15 d-none d-lg-block">신청일</div>
                        <div className="tcol-100 d-block d-lg-none">
                            신청내용
                        </div>
                    </div>
                    <div className="tablelist-body">
                        {
                            content.map((item, index) => {
                                const category = SUBJECT_SELECTIONS.find(c => c.value === item.category).name
                                const isCommentAvailable = userRole === "TUTOR" && item.answer === null
                                const onCallback = isCommentAvailable === true ? handleReply : item.answer === null ? handleDelete : null

                                return (
                                    <div key={index} className="tablelist-row-group">
                                        <ConversationItem 
                                            source={{...item, category}}  
                                            isCommentAvailable={ isCommentAvailable } 
                                            onCallback={ onCallback }
                                        />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
            <div className="pagination-wrapper d-flex justify-content-center my-5">
                <LCPagination
                    pageNumber={paging.pageNumber}
                    totalPage={paging.totalPage}
                    onPageChange={onPageChange}
                />
            </div>
        </>
    )
}

export default ConversationBoard