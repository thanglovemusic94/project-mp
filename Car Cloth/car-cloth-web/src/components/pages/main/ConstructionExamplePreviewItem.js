import { Image } from "react-bootstrap";

function ConstructionExamplePreviewItem({ source }) {

    return (
        <>
            <div className="pe-3">
                <div className="mb-1 text-center">
                    <Image className="cons-example-preview-img" src={source.objectKey} />
                </div>
                <p className="fs-14">
                    <span className="text-black">{source.modelName}{` `}</span>
                    <span className="text-black-400">{source.detailModelName}</span>
                </p>
            </div>
        </>
    );
}

export default ConstructionExamplePreviewItem;