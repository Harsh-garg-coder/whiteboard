import { useEffect, useRef, useState } from "react";
import styles from "./DrawingBoard.module.css";


export default function DrawingBoard(props) {

    const [currentActiveEventListeners, setCurrentActiveEventListeners] = useState([]);

    const canvasContainerRef = useRef();
    const canvasRef = useRef();
    const eraserRef = useRef();

    let context = canvasRef.current?.getContext("2d");

    const createContext = () => {
        const canvas = canvasRef.current;
        const canvasContainer = canvasContainerRef.current;

        canvas.width = canvasContainer.clientWidth;
        canvas.height = canvasContainer.clientHeight;

        context = canvas.getContext("2d");

        context.fillStyle = "white";
        context.fillRect(0,0,canvasContainer.clientWidth, canvasContainer.clientHeight);
    }

    const removeAllEventListeners = () => {
        for(let i = 0; i < currentActiveEventListeners.length; i++) {
            const eventName = currentActiveEventListeners[i].name;
            const currentEvent = currentActiveEventListeners[i].event;

            canvasRef.current.removeEventListener(eventName, currentEvent);
        }
        setCurrentActiveEventListeners([]);

        // hider erase
        eraserRef.current.style.display = "none";
    }

    const setEventListenersForPencil = () => {

        let isPencilMouseDown = false;

        const startLine = (e) => {
            isPencilMouseDown = true;

            context.beginPath();
            context.moveTo(e.clientX - 100, e.clientY);
            context.strokeStyle = props.pencilColor;
            context.lineWidth = props.pencilWidth;
        }

        const endLine = () => {
            isPencilMouseDown = false;
        }

        const drawLine = (e) => {
            if(isPencilMouseDown) {
                context.lineTo(e.clientX - 100, e.clientY);
                context.stroke();
            }
        }

        canvasRef.current.addEventListener("mousedown", startLine);
        canvasRef.current.addEventListener("mouseup", endLine);
        canvasRef.current.addEventListener("mousemove", drawLine);

        setCurrentActiveEventListeners([
            { name : "mousedown", event: startLine},
            { name : "mouseup", event : endLine},
            { name : "mousemove", drawLine}
        ]);
    }

    const setShapesEventListeners = () => {
        // if the shape is rectangle these are the top-left coordinates
        // else these are center of a circle
        let startX = 0;
        let startY = 0;

        const handleMouseDown = (e) => {
            startX = e.clientX - 100;
            startY = e.clientY;
        }

        const handleMouseUp = (e) => {
            context.beginPath();
            if(props.currentShape === "rectangle") {
                context.rect(startX, startY, e.clientX - 100 - startX, e.clientY - startY);
            } else {
                let radius = Math.sqrt((e.clientX - 100 - startX) * (e.clientX - 100 - startX) + (e.clientY - startY) * (e.clientY - startY));
                context.arc(startX, startY, radius, 0, 2 * Math.PI);
            }
            context.stroke();
        }

        canvasRef.current.addEventListener("mousedown", handleMouseDown);
        canvasRef.current.addEventListener("mouseup", handleMouseUp);

        setCurrentActiveEventListeners([
            { name : "mousedown", event : handleMouseDown},
            { name : "mouseup", event : handleMouseUp}
        ]);
    }

    const setEraserEventListener = () => {
        eraserRef.current.style.display = "block";

        let isMouseDown = false;

        const handleMouseDown = () => {
            isMouseDown = true;
        }

        const handleMouseUp = () => {
            isMouseDown = false;
        }

        const moveEraserWithMouse = (e) => {
            eraserRef.current.style.top =  `${e.clientY - props.eraserRadius}px`;
            eraserRef.current.style.left = `${e.clientX - 100 - props.eraserRadius}px`

            if(isMouseDown) {
                context.beginPath();
                context.arc(e.clientX - 100, e.clientY, props.eraserRadius, 0, 2 * Math.PI);
                context.fillStyle = "white";
                context.fill();
            }
        }

        canvasRef.current.addEventListener("mousemove", moveEraserWithMouse);
        canvasRef.current.addEventListener("mousedown", handleMouseDown);
        eraserRef.current.addEventListener("mousedown", handleMouseDown);
        canvasRef.current.addEventListener("mouseup", handleMouseUp);

        setCurrentActiveEventListeners([
            { name : "mousemove", event : moveEraserWithMouse},
            { name : "mousedown", event : handleMouseDown}, 
            { name : "mouseup", event : handleMouseUp}
        ]);
    }

    const downloadBoard = () => {
        const url = canvasRef.current?.toDataURL();

        const a = document.createElement("a");
        a.href = url;
        a.download = "board";
        a.click();
    }

    const clearBoard = () => {
        const canvasContainer = canvasContainerRef.current;
        context.fillStyle = "white";
        context.fillRect(0, 0, canvasContainer.clientWidth, canvasContainer.clientHeight);
    }

    const uploadImage = () => {
        
        const imageInput = document.createElement("input");
        imageInput.setAttribute("type", "file");
        imageInput.click();

        imageInput.addEventListener("change", () => {
            if(imageInput.files.length !== 0) {
                const blobUrl = URL.createObjectURL(imageInput.files[0]);
    
                const image = new Image();
                image.src = blobUrl;
    
                const canvasContainer = canvasContainerRef.current;
                image.onload = () => {
                    context.drawImage(image, 0, 0, canvasContainer.clientWidth, canvasContainer.clientHeight);
                }
            }
            // console.log(URL.createObjectURL(imageInput.files[0]));
        })
    }

    const createContextAndSetEventListeners = () => {

        removeAllEventListeners();

        if(props.currentActiveControl === "pencil") {
            setEventListenersForPencil();
        } else if (props.currentActiveControl === "shapes") {
            setShapesEventListeners();
        } else if(props.currentActiveControl === "eraser") {
            setEraserEventListener()
        } else if(props.currentActiveControl === "download") {
            downloadBoard();
            props.setCurrentActiveControl("pencil");
        } else if(props.currentActiveControl === "delete") {
            clearBoard();
            props.setCurrentActiveControl("pencil");
        } else if(props.currentActiveControl === "upload-image") {
            uploadImage();
            props.setCurrentActiveControl("pencil");
        }
    }

    useEffect(() => {
        createContext();
    }, []);
    
    useEffect(() => {
        createContextAndSetEventListeners();
    }, [props.currentActiveControl, props.pencilColor, props.pencilWidth, props.currentShape, props.eraserRadius]);
    
    return (
        <div id = "canvas-container" ref = {canvasContainerRef} className = {styles["drawingBoard-container"]}>
            <canvas
                id = "canvas"
                ref = {canvasRef}
            ></canvas>
            <div 
                className = {styles["eraser-circle"]} 
                style = {{
                    width:props.eraserRadius * 2,
                    height :props.eraserRadius * 2
                }}
                ref = {eraserRef}
            >
            </div>
        </div>  
    );
}