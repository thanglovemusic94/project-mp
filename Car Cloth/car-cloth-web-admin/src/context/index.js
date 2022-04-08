import {UserProvider} from "./user-context/UserProvider";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

// list provider as combineReducer redux
export function StoreProvider(props) {
    const combineProviders = [
        UserProvider,
        DndProvider, //context for drag and drop
    ]
    return (
        <>
            {
                combineProviders.reduce((ProviderNested, ProviderCurrent) => {
                    if (ProviderCurrent === DndProvider){
                        return (
                            <ProviderCurrent backend={HTML5Backend}>
                                {ProviderNested}
                            </ProviderCurrent>
                        )
                    }else {
                        return (
                            <ProviderCurrent>
                                {ProviderNested}
                            </ProviderCurrent>
                        )
                    }

                }, props.children)}
        </>
    );
}
