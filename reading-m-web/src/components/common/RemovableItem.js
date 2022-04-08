import React from "react";

const RemovableItem = ( { source, onDelete } ) => {
  
    return (
      <>
        <span>{source}</span>
        <span className="datetime-remove" onClick={onDelete}>
          <i className="lcicon-close-black"></i>
        </span>
      </>
    )
}

export default RemovableItem