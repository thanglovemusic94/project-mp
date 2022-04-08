import {CButton} from "@coreui/react";
import React from "react";
import {usePromiseTracker} from "react-promise-tracker";

export default function SButton({load = false, disabled = false, ...props}) {

  const {promiseInProgress} = usePromiseTracker()

  return (
    <CButton disabled={promiseInProgress || disabled} {...props}>
      {props.children} &nbsp;
      {promiseInProgress &&
      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>
      }
    </CButton>
  )
}
