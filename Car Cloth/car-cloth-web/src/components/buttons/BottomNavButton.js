
function BottomNavButton({ active, title, activeState, inactiveState }) {
    const isActiveClassName = active === true ? "color-primary" : "color-secondary";

    return (
        <>
            <div>
                {
                    active === true ? activeState : inactiveState
                }
            </div>
            <span className={`${isActiveClassName} text-nowrap fs-10`}>{title}</span>
        </>
    );
}

export default BottomNavButton;