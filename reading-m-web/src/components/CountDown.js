import {useEffect, useState} from "react";

const CountDown = ({deadline}) => {
    const [time, setTime] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    })

    function leading0(num) {
        return num < 10 ? "0" + num : num;
    }

    function getTimeUntil(deadline) {
        const time = Date.parse(deadline) - Date.parse(new Date());
        if (time < 0) {
            setTime({days: 0, hours: 0, minutes: 0, seconds: 0});

        } else {
            const seconds = Math.floor((time / 1000) % 60);
            const minutes = Math.floor((time / 1000 / 60) % 60);
            const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
            const days = Math.floor(time / (1000 * 60 * 60 * 24));
            setTime({days, hours, minutes, seconds});
        }
    }

    useEffect(() => {
        setInterval(() => {
            getTimeUntil(deadline, 1000)
        })
    }, []);

    return (
        <>
            {leading0(time.minutes)} : {leading0(time.seconds)}
        </>
    )
}

export default CountDown
