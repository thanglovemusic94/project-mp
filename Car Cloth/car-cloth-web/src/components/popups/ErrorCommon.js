import { useNetworkOnline } from "../../utils/useNetworkOnline";

const ErrorCommon = (showNoticePopup, e) => {
    console.log(e.message)
    let status = useNetworkOnline();
    status.then(value => {
        if (value.connected === true && e.message !== 'Network Error'){
            // return showNoticePopup(CommonError)
            return showNoticePopup(e.message)
        }else if (value.connected === true && e.message === 'Network Error'){
            // return showNoticePopup(
            //     <div>
            //         <div className={'fs-17 fw-medium lh-22'}>
            //             네트워크 연결이 끊겼습니다!
            //         </div>
            //         <div className={'fs-13'} style={{color: 'rgba(0, 0, 0, 0.5)'}}>
            //             네트워크 연결 상태를 확인한 후
            //             다시 시도해주세요.
            //         </div>
            //     </div>
            // );
            return showNoticePopup(e.message)
        }
    })
}

export default ErrorCommon
