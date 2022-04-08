import MemberInfoProvider from "./member/MemberInforProvider";
import RefreshProvider from "./refresh/RefreshProvider";
import QuotationProvider from "./quotation/QuotationProvider";
import ConstructionRegisterProvider from "./construction-register/ConstructionRegisterProvider";


// list provider as combineReducer redux
export function StoreProvider(props) {
    const combineProviders = [
        RefreshProvider,
        MemberInfoProvider,
        QuotationProvider,
        ConstructionRegisterProvider
    ]
    return (
        <>
            {
                combineProviders.reduce((ProviderNested, ProviderCurrent) => {
                        return (
                            <ProviderCurrent>
                                {ProviderNested}
                            </ProviderCurrent>
                        )
                }, props.children)}
        </>
    );
}
