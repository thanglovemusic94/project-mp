import { CircleInformationIcon } from "../../assets/svgs/Icons";
import { Localizations } from "../../texts/Localizations";

function NoResult({ message }) {

    return (
        <>
            <div className="text-center">
                <CircleInformationIcon />
                <p className="fs-14 mt-2 text-black-400">
                    {
                        message ?? Localizations.Common.NoResultFound
                    }
                </p>
            </div>
        </>
    );
}

export default NoResult;