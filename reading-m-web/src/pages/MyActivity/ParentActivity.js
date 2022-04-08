import React, {useEffect, useState} from 'react'
import {Tab, Tabs} from 'react-bootstrap'
import MyActivity from './common/MyActivity'
import ParentFavorite from "./common/ParentFavorite";
import CustomDropdown from "../../components/CustomDropdown";
import {getRole} from "../../constants/role.constants";
import useGetChildrenByParent from "../MyClass/common/customHook/useGetChildrenByParent";

export default function ParentActivity() {
    const [classType, setClassType] = useState("myclassactivity" );
    const roleName = getRole().value
    const {children, childId, setChildId, setChildren } = useGetChildrenByParent()
   
    return (
        <>
            <div className="myactivity-body">
                <h2 className="page-title mb-4">자녀 활동</h2>
                <div className="nav-tabs-half g700">
                    <Tabs defaultActiveKey={classType}
                          mountOnEnter
                          unmountOnExit
                          onSelect={eventKey => {
                              setClassType(eventKey)
                          }}
                    >
                        <Tab eventKey="myclassactivity" title="자녀 수업활동">
                            {roleName === 'PARENT' &&
                            <div className="d-flex justify-content-end mb-3">
                                {
                                    children.length > 0 &&
                                    <CustomDropdown
                                        items={children}
                                        className={"form-control-dropdown ipw-184 w-100"}
                                        name="childId"
                                        onChange={(e, k) => {
                                            setChildId(k)
                                        }
                                        }
                                    >
                                    </CustomDropdown>
                                }
                            </div>
                            }
                            <MyActivity childId={childId}/>
                        </Tab>
                        <Tab eventKey="myfavorite" title="찜한 수업">
                            <ParentFavorite childId={childId}/>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </>
    )
}
