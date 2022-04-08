import React from "react";

function StorageSize(props) {
    const size = props.size

    return (
        <span>
        {size.width + " x " + size.height + " x " + size.depth + " m "}
        </span>
    )
}

export default StorageSize