import { useState } from "react";
import WrapperContent from "../components/layouts/WrapperContent";
import IdentityVerificationNotice from "../components/pages/identity-verification/IdentityVerificationNotice";
import IdentityVerificationResult from "../components/pages/identity-verification/IdentityVerificationResult";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
function IdentityVerificationPage() {
   
    const [isVerified, setIsVerified] = useState(false);
    const isChangePhone = useLocation().state?.isChange ? true : false;
    return (
        <WrapperContent className={'p-3 vh-100'} hasFooter={true} content={

            <>

                <div className="">
                    {
                        isVerified === false ? <IdentityVerificationNotice  setIsVerified={setIsVerified} isChangePhone={isChangePhone}/> : <IdentityVerificationResult  isChangePhone={isChangePhone}/>
                    }
                </div>
            
            </>
        } />
    );

}

export default IdentityVerificationPage;
