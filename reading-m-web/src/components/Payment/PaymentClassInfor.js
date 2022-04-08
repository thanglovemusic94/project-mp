import { schoolgrade } from 'constants/schoolgrade.constants'
import DateTime from 'components/common/DateTime'
import { classDateFormat } from "../../constants/datetime.constants";

export default function PaymentClassInfor({ classInfo }) {
    function checkGradeTextBookClass(type) {
        if (type === "TextBookClass" || type === "DavinciClass") {
            if (type === "TextBookClass") {
                return 1;
            }
            return 2
        }
    }

    return (
        <>
            {classInfo.type &&
                <section className="payment__class">
                    <h3 className="payment__title">결제 수업 정보</h3>
                    <div className="payment__box-gray">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <th>수업 정보</th>
                                    <td>
                                        [LiveClass{' '}
                                        {classInfo.type === "TextBookClass" ? "책글" : ""}
                                        {classInfo.type === "GoalClass" ? "목적" : ""}
                                        {classInfo.type === "DavinciClass" ? "과학수학 다빈치" : ""}
                                        ]{' '} {classInfo.name}

                                    </td>
                                </tr>

                                {
                                    (classInfo.hasOwnProperty('videoInPays') && classInfo.type === "DavinciClass") &&
                                    classInfo.videoInPays.map((video, i) =>
                                        <tr key={i}>
                                            <th>{`${i}강`}</th>
                                            <td>{video.videoName}</td>
                                        </tr>
                                    )
                                }

                                <tr>
                                    <th>대상학생</th>
                                    <td>
                                        {checkGradeTextBookClass(classInfo.type) === 1 && schoolgrade[classInfo.targetStudentGrade]}
                                        {checkGradeTextBookClass(classInfo.type) === 2 && classInfo.grade}
                                    </td>
                                </tr>

                                <tr>
                                    <th>수업 준비</th>
                                    <td>{classInfo.materials}</td>
                                </tr>

                                {
                                    classInfo.type !== "DavinciClass" &&
                                    (<tr>
                                        <th className="align-top">수업일시</th>
                                        <td>
                                            {classInfo.curriculum && classInfo.curriculum.map((item) => (
                                                <>
                                                    {/*<DateTime date={item.start} format="YYYY.MM.DD ddd h:mm a"/>*/}
                                                    {/*~ <DateTime date={item.end} format="h:mm a"/>*/}
                                                    {classDateFormat(new Date(item.start), new Date(item.end))}
                                                    <br />
                                                </>
                                            ))}
                                        </td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                </section>
            }
        </>
    )
}
