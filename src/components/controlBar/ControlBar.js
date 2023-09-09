import styles from "./ControlBar.module.css";
import ControlButton from "./controlButton/ControlButton";
import controlsImage, { pencilColors, shapes }  from "./config";


export default function ControlBar(props) {

    const pencilMoreOptionsContainer = (
        <div className = {styles["more-options-container"]}>
            <div className = {styles["pencil-width-selector-container"]}>
                <input 
                    type = "range" 
                    min = "1"
                    max = "10"
                    value = {props.pencilWidth}
                    onChange = {(e) => props.setPencilWidth(e.target.value)}
                />
            </div>
            <div className = {styles["pencil-color-selector-container"]}>
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

    const findChildren = (name) => {
        if(name === "pencil") {
            return pencilMoreOptionsContainer;
        } 
        if(name === "shapes") {
            return shapesMoreOptionsContainer;
        }
        if(name === "eraser") {
            return eraserMoreOptionsContainer;
        }
        return null;
    }

    return(
        <div className = {styles["control-bar-container"]}>
            {
                controlsImage.map((currentControl, index) => {
                    return (
                        <ControlButton 
                            key = {"control_btn" + index}
                            imageUrl = {currentControl.image}
                            moreControls = {findChildren(currentControl.name)}
                            isActive = {props.currentActiveControl === currentControl.name}
                            setActive = {() => props.setCurrentActiveControl(currentControl.name)}
                        />
                    )
                })
            }
        </div>
    )
}


