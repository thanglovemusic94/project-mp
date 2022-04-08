import {useEffect, useState} from "react";
import {UserStorage} from "../../../../storages/UserStorage";
import {UserService} from "../../../../services/UserService";
export default function useClassesByUserId(classType: any, pageable: any, childId: any) {
    const [data, setData] = useState({
        content: [],
        totalPages: 0,
        totalElements: 0,
        number: 0,
        size: 0,
    })

    useEffect(() => {
        //const userId = UserStorage.getLocalUserId()
        UserService.getClassesByUserId(childId, classType, pageable).then((resp) => {
            if (resp.status === 200) {
                setData(resp.data)
            }
        })
    }, [pageable, childId])

    return {data};
}
