import React, {useEffect, useState} from "react";


import {ParentService} from "../../../../services/ParentService";

export default function useGetChildrenByParent() {

        const [children, setChildren] = useState([])
        const[childId, setChildId] = useState(null)

        useEffect(() => {
            ParentService.getChildren()
                .then((res) => {
                    setChildren(
                        res.data.map((std) => ({ label: std.name, value: std.id }))
                    )

                    if (res.data.length > 0) {
                        setChildId(res.data[0].id)
                    }
                })
                .catch((err) => console.log(err))
        }, [])

        return {children, childId , setChildId, setChildren};

}
