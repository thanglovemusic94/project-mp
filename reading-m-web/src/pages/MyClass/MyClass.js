import React, {useState, useEffect} from 'react'
import {Dropdown, Nav, Tab} from 'react-bootstrap'
import MyClassBook from './common/MyClassBook'
import MyClassGoal from './common/MyClassGoal'
import MyMathDavinci from './common/MyMathDavinci'
import {getRole} from "../../constants/role.constants";
import {LiveClassType} from "../../constants/class.constants";
import { UserRole } from '../../constants/role.constants'
import CustomDropdown from 'components/CustomDropdown'
import { ParentService } from 'services/ParentService'

export default function MyClass() {
    const [classType, setClassType] = useState(LiveClassType.TextBookClass.value);
    const roleName = getRole().value
    const [children, setChildren] = useState([])
    const[childId, setChildId] = useState(null)

    useEffect(() => {
        if (roleName === UserRole.PARENT.value) {
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
        }
    }, [])

    return (
        <>
            <div className="myclass-body">
                <h2 className="page-title mb-5">내 수업</h2>
                <Tab.Container
                    mountOnEnter
                    unmountOnExit
                    activeKey={classType}
                    onSelect={eventKey => {
                        setClassType(eventKey)
                    }}
                >
                    <div className="text-center mb-5">
                        <div className="nav-tabs-radius m500">
                            <Nav>
                                <Nav.Item>
                                    <Nav.Link eventKey={LiveClassType.TextBookClass.value}>
                                        LiveClass 책글
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey={LiveClassType.GoalClass.value}>
                                        LiveClass 목적
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey={LiveClassType.DavinciClass.value}>
                                        과학수학 다빈치
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </div>
                    </div>

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
                                    setClassType(classType)
                                }
                                }
                            >
                            </CustomDropdown>
                        }
                        </div>
                    }

                    <div className="tab-content">
                        <Tab.Content>
                            <Tab.Pane eventKey={LiveClassType.TextBookClass.value}>
                                <MyClassBook childId={childId}/>
                            </Tab.Pane>
                            <Tab.Pane eventKey={LiveClassType.GoalClass.value}>
                                <MyClassGoal childId={childId} classType={classType}/>
                            </Tab.Pane>
                            <Tab.Pane eventKey={LiveClassType.DavinciClass.value}>
                                <MyMathDavinci childId={childId}/>
                            </Tab.Pane>
                        </Tab.Content>
                    </div>
                </Tab.Container>
            </div>
        </>
    )
}
