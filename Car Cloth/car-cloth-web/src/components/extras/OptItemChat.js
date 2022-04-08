import { TurnedOffNotice, TurnedOnNotice } from "../../assets/svgs/ChattingIcons";


const OptItemChat = (props) => {
    const { turnedOn, handleClick } = props

    return (
            <div onClick={handleClick}>
                {turnedOn ? <TurnedOnNotice /> : <TurnedOffNotice />}
            </div>
    );
}

export default OptItemChat
