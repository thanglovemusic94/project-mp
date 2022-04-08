import { Capacitor } from '@capacitor/core';
import { useEffect, useRef, useState } from 'react';

const useInfiniteScroll = (callback, target, isWindow) => {
    const lastScrollHeight = useRef(0);

    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        let currentTarget = target;

        if (isWindow && isWindow === true) {
            currentTarget = window;
        }

        currentTarget.addEventListener('scroll', handleScroll);

        return () => currentTarget.removeEventListener('scroll', handleScroll);

        // eslint-disable-next-line
    }, []);

    useEffect(() => {

        if (!isFetching)
            return;

        callback(() => {

        });

        // eslint-disable-next-line
    }, [isFetching]);

    function handleScroll() {

        if (lastScrollHeight.current === target.scrollHeight)
            return;

        let targetScrollTop = Capacitor.getPlatform() === "android" ? Math.round(target.scrollTop) : target.scrollTop;

        if (target.clientHeight + targetScrollTop !== target.scrollHeight || isFetching === true)
            return;

        lastScrollHeight.current = target.scrollHeight;

        setIsFetching(true);
    }

    return [isFetching, setIsFetching];
};

export default useInfiniteScroll;