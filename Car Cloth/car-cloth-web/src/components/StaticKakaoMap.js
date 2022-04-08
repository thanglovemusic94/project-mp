import { useEffect, useRef } from "react";

function StaticKakaoMap({ lat, lng, onMarket, ...props }) {
    const mapRef = useRef(null);

    useEffect(() => {
        const staticMapOption = {
            center: new window.kakao.maps.LatLng(lat, lng),
            level: 3,
            marker: onMarket ? new window.kakao.maps.LatLng(lat, lng) : null
        };

        new window.kakao.maps.StaticMap(mapRef.current, staticMapOption);
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <div {...props} ref={mapRef}></div>
        </>
    );
}

export default StaticKakaoMap;
