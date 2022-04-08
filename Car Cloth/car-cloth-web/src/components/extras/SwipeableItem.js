import { Capacitor } from "@capacitor/core";
import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { RemoveIcon } from "../../assets/svgs/Icons";


function SwipeableItem({ children, onItemDelete }) {
    const maxSwipe = 40;
    const [prevPos, setPrevPos] = useState(0);
    const [currentSwipe, setCurrentSwipe] = useState(0);

    const overlay = useRef(null);
    const container = useRef(null);

    const isMouseDown = useRef(false);


    useEffect(() => {
        container.current.style.height = `${overlay.current.offsetHeight}px`;
    });


    function resetPosition(target) {
        if (target.className.indexOf("swipe-reset") === -1) {
            target.className += " swipe-reset";
            setPrevPos(0);
            setCurrentSwipe(0);
        }
    }

    function onSwipeStart(startX) {
        setPrevPos(startX);
    }

    function onSwiping(target, curX) {
        let curSwipe = curX - prevPos;

        if (curSwipe > 0) curSwipe = 0;
        else if (maxSwipe <= Math.abs(curSwipe)) curSwipe = -1 * maxSwipe;

        target.style.left = `${curSwipe}px`;

        setCurrentSwipe(curSwipe);

        if (overlay.current.children[0].className.indexOf("just-swiped") === -1) {
            overlay.current.children[0].className += ' just-swiped';
        }
    }

    function onSwipeEnd(target) {

        if (Math.abs(currentSwipe) < maxSwipe)
            resetPosition(target);
    }

    function handleTouchStart(event) {
        onSwipeStart(event.touches[0].clientX)
    }

    function handleTouchMove(event) {
        onSwiping(event.currentTarget, event.touches[0].clientX);
    }

    function handleTouchEnd(event) {
        onSwipeEnd(event.currentTarget);
    }

    function handleTouchCancel(event) {
        onSwipeEnd(event.currentTarget);
    }

    function handleAnimationEnd(event) {
        event.currentTarget.className = event.currentTarget.className.replace(" swipe-reset", "");

        if (event.currentTarget.className === "") {
            event.currentTarget.removeAttribute("class");
        }

        event.currentTarget.removeAttribute("style");
    }

    function handleItemDelete() {

        if (onItemDelete)
            onItemDelete();
    }

    function handleMouseDown(event) {

        if (Capacitor.getPlatform() === 'web') {
            isMouseDown.current = true;

            onSwipeStart(event.clientX);
        }
    }

    function handleMouseMove(event) {

        if (Capacitor.getPlatform() === 'web') {
            if (isMouseDown.current === true) {
                onSwiping(event.currentTarget, event.clientX);
            }
        }
    }

    function handleMouseUp(event) {

        if (Capacitor.getPlatform() === 'web') {
            isMouseDown.current = false;

            onSwipeEnd(event.currentTarget);
        }
    }


    return (
        <>
            <div className="position-relative" ref={container}>
                <Button className="float-end h-100 btn-blue-400 rounded-end shadow-none me-1px" onClick={handleItemDelete}>
                    <RemoveIcon />
                </Button>
                <div
                    className="position-absolute top-0 w-100 h-auto bg-white rounded"
                    ref={overlay}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    onTouchCancel={handleTouchCancel}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onAnimationEnd={handleAnimationEnd}
                >
                    <div className="d-flex">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}

export default SwipeableItem;