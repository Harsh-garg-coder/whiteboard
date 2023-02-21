import { useEffect, useState, useRef } from "react";
import styles from "./ControlButton.module.css";

export default function ControlButton(props) {
    const moreDetailsRef = useRef();
    const mainControlRef = useRef();

    const [showMoreOptions, setShowMoreOptions] = useState(false);

    const handleOnClick = () => {
        setShowMoreOptions((prev) => !prev);
        props.setActive();
    }

    useEffect(() => {
        if(props.moreControls && showMoreOptions) {
            const handleClickOutside = (e) => {
                if(moreDetailsRef.current && !moreDetailsRef.current.contains(e.target) && !mainControlRef.current.contains(e.target)) {
                    setShowMoreOptions(false);
                }
            }

            window.addEventListener("click", handleClickOutside)

            return () => {
                window.removeEventListener("click", handleClickOutside)
            }
        }
    }, [showMoreOptions, moreDetailsRef, props.moreControls]);

    return (
        <div className = {styles["control-button-container"]}>
            <div 
                className = {[styles["control-button-icon"], props.isActive && styles["active"]].join(" ")}
                onClick = {handleOnClick}
                ref = {mainControlRef}
            >
                <img src = {props.imageUrl} />
            </div>
            {
                props.moreControls && showMoreOptions &&
                <div 
                    className = {styles["more-controls-container"]}
                    ref = {moreDetailsRef}
                >
                    {props.moreControls}
                </div>
            }
        </div>
    );
}