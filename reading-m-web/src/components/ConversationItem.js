import { useState } from "react"
import { Button, Collapse, Form } from "react-bootstrap"
import { UserStorage } from "storages/UserStorage"
import DateTime from "./common/DateTime"

function ConversationItemTopic({ source, collapse, onAction }) {

    const canDelete = UserStorage.getLocalUserId() === `${source.applicant.id}`
    const canReply = UserStorage.getLocalUserRole() === "TUTOR"

    return (
        <div className="tablelist-row-group tablelist-row-collapse">
            <Collapse in={collapse}>
                <div>
                    <div className="tablelist-row g100">
                        <div className="tcol-80 text-left">
                            <p className="mb-1">
                                {source.request}
                            </p>
                        </div>
                        {
                            ((canReply && source.answer === null) || canDelete) ?
                                <div className="tcol-20 text-right">
                                    <Button
                                        variant="white"
                                        onClick={canDelete ? () => onAction(source.id) : onAction}
                                        className="btn-square btw-120 btn-sm"
                                    >
                                        {canDelete ? "삭제" : "답변하기"}
                                    </Button>
                                </div>
                                :
                                <></>
                        }

                    </div>
                </div>
            </Collapse>
        </div>
    )
}

function ConversationItemComment({ source, collapse }) {

    return (
        <div className="tablelist-row-group tablelist-row-collapse">
            <Collapse in={collapse}>
                <div id="answer4">
                    <div className="tablelist-row g100">
                        <div className="tcol-md-60  text-left d-none d-lg-block">
                            <span className="answer-closed-label">
                                답변
                            </span>
                            <div className="answer-closed-content">
                                {source.answer}
                            </div>
                        </div>

                        <div className="tcol-md-20 application-tutorname">
                            {source.respondent.name}
                        </div>
                        <div className="tcol-md-15">
                            <DateTime format="YYYY.MM.DD" date={source.createdOn} />
                        </div>
                    </div>
                </div>
            </Collapse>
        </div>
    )
}

function ConversationItemReply({ source, collapse, onAction }) {
    const [replyContent, setReplyContent] = useState("")

    const [isValid, setisValid] = useState(true);

    const reply = () => {
        if (replyContent && replyContent.trim().length > 0) {
            onAction({ "id": source.id, "message": replyContent })
        } else {
            setisValid(false)
        }
    }

    return (
        <div className="tablelist-row-group tablelist-row-collapse">
            <Collapse in={collapse}>
                <div>
                    <div className="tablelist-row g100">
                        <div className="tcol-80 text-left">
                            <Form.Control
                                className="ipw-488"
                                as="textarea"
                                rows={3}
                                placeholder="내용 입력"
                                onChange={(e) => setReplyContent(e.target.value)}
                            />
                            <div hidden={isValid} className="text-danger">
                                내용을 입력해주세요.
                            </div>
                        </div>
                        <div className="tcol-20 text-right">
                            <Button
                                variant="white"
                                onClick={reply}
                                className="btn-square btw-120 btn-sm"
                            >
                                저장하기
                            </Button>
                        </div>
                    </div>
                </div>
            </Collapse>
        </div>
    )
}

function ConversationItemHeader({ source, collapse, onAction }) {

    return (
        <div
            className="tablelist-row pointer"
            onClick={onAction}
            aria-expanded={collapse}
        >
            <div className="tcol-md-20 tcol-25 application-cate">
                {source.category}
            </div>
            <div className="tcol-md-40 tcol-80 application-title text-left">
                {source.title}
            </div>
            <div className="tcol-md-20 tcol-25">{source.applicant.name}</div>
            <div className="tcol-md-15 tcol-25">
                <DateTime format="YYYY.MM.DD" date={source.createdOn} />
            </div>
            <span className="toggle-action">
                <i className="lcicon-dropClose"></i>
            </span>
        </div>
    )
}

function ConversationItem({ source, isCommentAvailable, onCallback }) {
    const { answer } = source

    const [collapse, setCollapse] = useState(false)
    const toggleContent = () => setCollapse(!collapse)

    const [reply, setReply] = useState(false)
    const toggleReply = () => setReply(!reply)

    return (
        <>
            <ConversationItemHeader source={source} collapse={collapse} onAction={toggleContent} />
            <ConversationItemTopic
                source={source}
                collapse={collapse}
                onAction={isCommentAvailable ? toggleReply : onCallback}
            />
            {
                answer !== null ? <ConversationItemComment source={source} collapse={collapse} /> : <></>
            }
            {
                isCommentAvailable === true ? <ConversationItemReply source={source} collapse={reply && collapse} onAction={onCallback} /> : <></>
            }
        </>
    )
}

export default ConversationItem