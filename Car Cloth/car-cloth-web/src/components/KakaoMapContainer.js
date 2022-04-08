import Button from "@restart/ui/esm/Button";
import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { Localizations } from "../texts/Localizations";
import CButton from "./buttons/CButton";
import NavHeaderSpacer from "./NavHeaderSpacer";

function KakaoMapContainer({ value, onSelect }) {
    const mapRef = useRef(null);

    const [searchAddress, setSearchAddress] = useState(value ? value.address : "");
    const [kakaoMap, setKakaoMap] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [selectedLatLng, setSelectedLatLng] = useState(null);

    useEffect(() => {
        let newKakaoMap = {
            map: null,
            geocoder: null,
            places: null,
            marker: null
        };

        let options = {
            center: value ? new window.kakao.maps.LatLng(value.lat, value.lng) : new window.kakao.maps.LatLng(33.450701, 126.570667),
            level: 3
        };

        newKakaoMap.map = new window.kakao.maps.Map(mapRef.current, options);
        newKakaoMap.geocoder = new window.kakao.maps.services.Geocoder();
        newKakaoMap.places = new window.kakao.maps.services.Places();

        let markerPosition = value ? new window.kakao.maps.LatLng(value.lat, value.lng) : null;
        newKakaoMap.marker = new window.kakao.maps.Marker({ position: markerPosition });
        newKakaoMap.marker.setMap(newKakaoMap.map);

        setKakaoMap(newKakaoMap);

        // eslint-disable-next-line
    }, []);

    useEffect(() => {

        if (kakaoMap !== null) {
            window.kakao.maps.event.addListener(kakaoMap.map, 'click', ev => searchDetailAddrFromCoords(ev.latLng, searchDetailAddrCB));
        }
        // eslint-disable-next-line
    }, [kakaoMap]);

    function searchDetailAddrCB(result, status) {

        if (status === window.kakao.maps.services.Status.OK) {
            let detailAddr = {
                roadAddress: result[0].road_address?.address_name,
                address: result[0].address?.address_name,
                zip_code: result[0].address?.zip_code
            };

            setSelectedAddress(detailAddr);
        }
    }

    function searchDetailAddrFromCoords(coords, callback) {
        const newLatLng = {
            lat: coords.getLat(),
            lng: coords.getLng()
        };

        setSelectedLatLng(newLatLng);

        // 마커를 클릭한 위치에 표시합니다
        kakaoMap.marker.setPosition(coords);
        kakaoMap.marker.setMap(kakaoMap.map);

        kakaoMap.geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }

    function handleSearchAddress(event) {
        event.preventDefault();
        event.stopPropagation();

        if (searchAddress.length > 0)
            kakaoMap.places.keywordSearch(searchAddress, placesSearchCB);
    }

    function placesSearchCB(data, status, pagination) {

        if (status === window.kakao.maps.services.Status.OK) {
            let bounds = new window.kakao.maps.LatLngBounds();

            for (let i = 0; i < data.length; i++) {
                bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
            }

            kakaoMap.map.setBounds(bounds);
        }
    }

    function handleConfirm() {

        if (onSelect)
            onSelect({ ...selectedLatLng, ...selectedAddress });
    }


    return (
        <>
            <div className="vw-100 vh-100" ref={mapRef}></div>
            <Form className="position-absolute top-0 left-0 w-100 z100 mt-3 px-2" onSubmit={handleSearchAddress}>
                <NavHeaderSpacer />
                <div className="d-flex">
                    <Form.Control value={searchAddress} onChange={ev => setSearchAddress(ev.currentTarget.value)}></Form.Control>
                    <Button type="submit" className="btn btn-blue-500 shadow-none text-nowrap px-4 ms-1">{Localizations.Common.Search}</Button>
                </div>
            </Form>
            <div className="position-absolute bottom-0 left-0 w-100 z100 mb-5 px-2">
                <CButton className="w-100" onClick={handleConfirm}>{Localizations.Common.Confirm}</CButton>
            </div>
        </>
    );
}

export default KakaoMapContainer;
