import { RightArrowIcon } from "../../../assets/svgs/Icons"


const MoveToComponent = ({ className, name, iconComponent, to }) => {
    return (
        <div onClick={to} className={`${className ?? ''} fs-14 py-10px pe-5px text-black-900 d-flex justify-content-between`} >
            <span>{name}</span>
            <span>
                {
                    iconComponent ??
                    <RightArrowIcon />

                }
            </span>
        </div>
    )
}

export default MoveToComponent
