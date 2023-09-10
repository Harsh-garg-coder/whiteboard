import styles from "./ControlBar.module.css";
import ControlButton from "./controlButton/ControlButton";
import controlsImage, { shapes }  from "./config";


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

    const colorMoreOptionsContainer = (
        <div className = {styles["more-options-container"]}>
            <div className = {styles["color-selector-container"]}>
                <input 
                    type = "color" 
                    value = {props.color} 
                    onChange = {(e) => props.setColor(e.target.value)}
                    onBlur={() => props.setCurrentActiveControl(props.previousActiveControl)}
                />
            </div>
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
        if(name === "color") {
            return colorMoreOptionsContainer;
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
                            setActive = {() => {
                                props.setPreviousActiveControl(props.currentActiveControl)
                                props.setCurrentActiveControl(currentControl.name)
                            }}
                        />
                    )
                })
            }
        </div>
    )
}


