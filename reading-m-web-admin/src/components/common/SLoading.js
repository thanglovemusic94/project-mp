import { CButton, CSpinner } from "@coreui/react";
import React from "react";
import { usePromiseTracker } from "react-promise-tracker";

export default function SLoading({ load = false, ...props }) {

  const styles = {
    container: {
      position: 'fixed',
      left: '50%',
      top: '35%',
    }
  }

  const { promiseInProgress } = usePromiseTracker()

  if (promiseInProgress) {
    return (
      <div className="d-flex justify-content-between align-items-center" style={styles.container}>
        <CSpinner variant="grow" />
      </div>
    )
  }
  return null
}
