import { useEffect } from "react";

const timeObject = (time) => {
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    return { days: days, hours: hours, minutes: minutes, seconds: seconds };
}

const CountDown = ({ time, setTime}) => { //secondTime example { days: 0, hours: 0, minutes: 1, seconds: 30 } 


    const dateSecondTime = new Date();
    dateSecondTime.setMinutes(time.minutes + dateSecondTime.getMinutes());
    dateSecondTime.setSeconds(time.seconds + dateSecondTime.getSeconds());

    const getTimeUntil = () => {
        const time = Date.parse(dateSecondTime) - Date.parse(new Date());
        if (time > 0) {
            setTime(timeObject(time));
        }

        if (time === 0) {
            setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        }
    }

    function leading0(num) {
        return num < 10 ? "0" + num : num;
    }
    
    useEffect(() => {
        const interval = setInterval(() => {
            getTimeUntil()
        }, 1000)
        return () => clearTimeout(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [time]);

    return (
        <>
           {leading0(time.minutes)} : {leading0(time.seconds)}
        </>
    )
}

export default CountDown
