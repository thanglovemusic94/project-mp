import { useEffect } from "react";

function useFetchInitialDataMore(data, maxDataLen, content, wrapper, fetchFunc) {

    useEffect(() => {
        if (!content || !wrapper) return;

        if (
            data.length < maxDataLen
            && content.scrollHeight <= wrapper.clientHeight
        ) {
            fetchFunc();
        }

        // eslint-disable-next-line
    }, [data]);
}

export default useFetchInitialDataMore;