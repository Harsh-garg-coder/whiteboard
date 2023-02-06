import { useState } from "react";
import styles from "./ControlBar.module.css";
import ControlButton from "./controlButton/ControlButton";
import controlsImage, { pencilColors, shapes }  from "./config";


export default function ControlBar(props) {

    const penMoreOptionsContainer = (
        <div className = {styles["more-options-container"]}>
            <div className = {styles["pen-width-selector-container"]}>
                <input 
                    type = "range" 
                    min = "1"
                    max = "10"
                    value = {props.pencilWidth}
                    onChange = {(e) => props.setPencilWidth(e.target.value)}
                />
            </div>
            <div className = {styles["pen-color-selector-container"]}>
                {
                    pencilColors.map((currentColor, index) => {
                        return (
                            <div 
                                key = {index}
                                className = {[styles["color-selector"], styles[currentColor], props.pencilColor === currentColor && styles["active-color"]].join(" ")}
                                onClick = {() => (props.setPencilColor(currentColor))}
                            >
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );

    const shapesMoreOptionsContainer = (
        <div className = {styles["more-options-container"]}>
            <div className = {styles["shapes-container"]}>
                {
                    shapes.map((currentShape, index) => {
                        return (
                            <div 
                                className = {[
                                    styles["shapes-image-container"],
                                    props.currentShape === currentShape.name ? styles["active-shape-container"] : ""
                                ].join(" ")}
                                key = {"shape_" + index}
                            >
                                <img 
                                    src = {currentShape.image} 
                                    alt = {currentShape.alt}
                                    width = {30} 
                                    height = {30}
                                    onClick = {() => {props.setCurrentShape(currentShape.name)}}
                                />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );

    const eraserMoreOptionsContainer = (
        <div className = {styles["more-options-container"]}>
            <input 
                type = "range" 
                min = "1"
                max = "10"
                value = {props.eraserRadius}
                onChange = {(e) => props.setEraserRadius(e.target.value)}
            />
        </div>
    )

    const findChildren = (index) => {
        if(index === 0) {
            return penMoreOptionsContainer;
        } 
        if(index === 1) {
            return shapesMoreOptionsContainer;
        }
        if(index === 2) {
            return eraserMoreOptionsContainer;
        }
        return null;
    }

    return(
        <div className = {styles["controlBar-container"]}>
            {
                controlsImage.map((currentControl, index) => {
                    return (
                        <ControlButton 
                            key = {index}
                            imageUrl = {currentControl.image}
                            children = {findChildren(index)}
                            isActive = {props.currentActiveControlIndex === index}
                            setActive = {() => props.setCurrentActiveControlIndex(index)}
                        />
                    )
                })
            }
        </div>
    )
}


