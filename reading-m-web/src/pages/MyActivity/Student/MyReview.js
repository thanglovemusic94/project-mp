import React, { useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import CreatedReview from './CreatedReview'
import AvailableReview from './AvailableReview'

export default function MyReview(props) {

    const { activeTab } = { ...props }
    const initTab = activeTab || "available-review"
    const [tabActive, setTabActive] = useState(initTab)

    return (
        <>
            <section className="myreview-section">
                <div className="nav-tabs-half g700">
                    <Tabs defaultActiveKey={tabActive} >
                        <Tab
                            eventKey={ReviewTab.AvailableReview.eventKey}
                            title={ReviewTab.AvailableReview.title}>
                            <AvailableReview />
                        </Tab>
                        <Tab eventKey={ReviewTab.CreatedReview.eventKey}
                            title={ReviewTab.CreatedReview.title}>
                            <CreatedReview />
                        </Tab>
                    </Tabs>
                </div>
            </section>
        </>
    )
}

export const ReviewTab = {
    AvailableReview: {
        eventKey: "available-review",
        title: "작성 가능한 후기"
    },
    CreatedReview: {
        eventKey: "created-review",
        title: "작성한 후기"
    },

}
