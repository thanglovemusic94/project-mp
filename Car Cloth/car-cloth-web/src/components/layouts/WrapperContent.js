import NavHeaderSpacer from "../NavHeaderSpacer"

const WrapperContent = ({className, hasHeader, hasFooter, content}) => {
    return (
        <div className={'row'}>
            <div className={`${className ?? ''} d-flex lh-21  flex-column min-vh-100 p-3`}>
                <NavHeaderSpacer />
                {content}
                {hasFooter &&
                <div className="nav-bottom"></div>
                }
            </div>
        </div>
    )
}

export default WrapperContent
