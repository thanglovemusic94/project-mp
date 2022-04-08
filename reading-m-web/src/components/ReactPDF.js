import React from "react";

export default function ReactPDF({file}) {
    return (
        <>
            <section>
                <div className="row" >
                    <div className="col-12">
                        <embed src={`${file}#view=FitH&toolbar=0&navpanes=0&scrollbar=0`} type="application/pdf"  height="1000px" width="100%"/>
                    </div>
                </div>
            </section>
        </>
    )
}
