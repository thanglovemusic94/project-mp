import {CertificateType} from "../../../constants/certificate.constaint";
import {DateUtils} from "../../../utils/DateUtils";
import {convertByType, LicenseCertPassCategory} from "../../../constants/tutorApplication.constants";

export const Certificate = ({data, type}) => {
    switch (type) {
        case CertificateType.license:
            return (
                <>
                    <tr>
                        <td className="tdfull" colSpan="4">
                            자격증(자격증/면허증)
                        </td>
                    </tr>
                    <tr>
                        <td className="td203">자격증명</td>
                        <td>{data.name}</td>
                        <td className="td203">발행처</td>
                        <td>{data.publisher}</td>
                    </tr>
                    <tr>
                        <td className="td203">합격 구분 선택</td>
                        <td>{convertByType(LicenseCertPassCategory,data.passType)}</td>
                        <td className="td203">취득일</td>
                        <td>{DateUtils.toLocalDate(data.acquiredOn)}</td>
                    </tr>
                </>
            )
        case CertificateType.languageTest:
            return (
                <>
                    <tr>
                        <td className="tdfull" colSpan="4">
                            자격증(어학시험)
                        </td>
                    </tr>
                    <tr>
                        <td className="td203">언어</td>
                        <td>{data.language}</td>
                        <td className="td203">시험종류</td>
                        <td>{data.testType}</td>
                    </tr>
                    <tr>
                        <td className="td203">점수</td>
                        <td>{data.score}</td>
                        <td className="td203">급수</td>
                        <td>{data.rating}</td>
                    </tr>
                    <tr>
                        <td className="td203">취득 여부</td>
                        <td>{data.passed && '취득'}</td>
                        <td className="td203">취득일</td>
                        <td>{DateUtils.toLocalDate(data.acquiredOn)}</td>
                    </tr>
                </>
            )
        case CertificateType.competition:
            return (
                <>
                    <tr>
                        <td className="tdfull" colSpan="4">
                            자격증(수상내역/공모전)
                        </td>
                    </tr>
                    <tr>
                        <td className="td203">수상명</td>
                        <td>{data.name}</td>
                        <td className="td203">수여기관</td>
                        <td>{data.place}</td>
                    </tr>
                    <tr>
                        <td className="td203">수상/공모일</td>
                        <td colSpan="3">{DateUtils.toLocalDate(data.acquiredOn)}</td>
                    </tr>
                </>
            )
        default:
            return <></>
    }
}
