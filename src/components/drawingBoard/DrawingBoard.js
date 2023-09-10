import { useEffect, useRef, useState } from "react";
import styles from "./DrawingBoard.module.css";


export default function DrawingBoard(props) {
    const [currentActiveEventListeners, setCurrentActiveEventListeners] = useState([]);

    const canvasContainerRef = useRef();
    const canvasRef = useRef();
    const eraserRef = useRef();

    let context = canvasRef.current?.getContext("2d");

    const createContext = () => {
        try {
            const canvas = canvasRef.current;
            const canvasContainer = canvasContainerRef.current;

            canvas.width = canvasContainer.clientWidth;
            canvas.height = canvasContainer.clientHeight;

            context = canvas.getContext("2d");

            context.fillStyle = "white";
            context.fillRect(0,0,canvasContainer.clientWidth, canvasContainer.clientHeight);
        } catch(error) {
            console.log(error);
        }
    }

    const removeAllEventListeners = () => {
        try {
            for(let i = 0; i < currentActiveEventListeners.length; i++) {
                const eventName = currentActiveEventListeners[i].name;
                const currentEvent = currentActiveEventListeners[i].event;
    
                canvasRef.current.removeEventListener(eventName, currentEvent);
            }
            setCurrentActiveEventListeners([]);
    
            // hider erase
            eraserRef.current.style.display = "none";
        } catch(error) {
            console.log(error);
        }
    }

    const setEventListenersForPencil = () => {
        try {
            let isPencilMouseDown = false;
            const leftDistanceOfDrawingBoard = canvasContainerRef.current.getBoundingClientRect().left + 10;
            const topDistanceOfDrawingBoard = canvasContainerRef.current.getBoundingClientRect().top + 10;

            const startLine = (e) => {
                isPencilMouseDown = true;

                context.beginPath();
                context.moveTo(e.clientX - leftDistanceOfDrawingBoard, e.clientY - topDistanceOfDrawingBoard);
                context.strokeStyle = props.color;
                context.lineWidth = props.pencilWidth;
            }

            const endLine = () => {
                isPencilMouseDown = false;
            }

            const drawLine = (e) => {
                if(isPencilMouseDown) {
                    context.lineTo(e.clientX - leftDistanceOfDrawingBoard, e.clientY - topDistanceOfDrawingBoard);
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
        } catch(error) {
            console.log(error);
        }
    }

    const setShapesEventListeners = () => {
        try {
            // if the shape is rectangle these are the top-left coordinates
            // else these are center of a circle
            let startX = 0;
            let startY = 0;

            const leftDistanceOfDrawingBoard = canvasContainerRef.current.getBoundingClientRect().left + 10;
            const topDistanceOfDrawingBoard = canvasContainerRef.current.getBoundingClientRect().top + 10;

            const handleMouseDown = (e) => {
                startX = e.clientX - leftDistanceOfDrawingBoard;
                startY = e.clientY - topDistanceOfDrawingBoard;
            }

            const handleMouseUp = (e) => {
                context.beginPath();
                context.strokeStyle = props.color;
                context.lineWidth = "4";
                if(props.currentShape === "rectangle") {
                    context.rect(startX, startY, e.clientX - leftDistanceOfDrawingBoard - startX, e.clientY - topDistanceOfDrawingBoard - startY);
                } else {
                    let x2minusx1 = (e.clientX - leftDistanceOfDrawingBoard - startX);
                    let y2minusy1 = (e.clientY - topDistanceOfDrawingBoard - startY);
                    let diameter = Math.sqrt( x2minusx1 * x2minusx1 + y2minusy1 * y2minusy1);
                    context.arc((e.clientX - leftDistanceOfDrawingBoard + startX) / 2 , (e.clientY - topDistanceOfDrawingBoard + startY) / 2, diameter / 2, 0, 2 * Math.PI);
                }
                context.stroke();
            }

            canvasRef.current.addEventListener("mousedown", handleMouseDown);
            canvasRef.current.addEventListener("mouseup", handleMouseUp);

            setCurrentActiveEventListeners([
                { name : "mousedown", event : handleMouseDown},
                { name : "mouseup", event : handleMouseUp}
            ]);
        } catch(error) {
            console.log(error);
        }
    }

    const setEraserEventListener = () => {
        try {
            eraserRef.current.style.display = "block";

            let isMouseDown = false;

            const leftDistanceOfDrawingBoard = canvasContainerRef.current.getBoundingClientRect().left + 10;
            const topDistanceOfDrawingBoard = canvasContainerRef.current.getBoundingClientRect().top + 10;

            const handleMouseDown = () => {
                isMouseDown = true;
            }

            const handleMouseUp = () => {
                isMouseDown = false;
            }

            const moveEraserWithMouse = (e) => {
                eraserRef.current.style.top =  `${e.clientY - topDistanceOfDrawingBoard - props.eraserRadius}px`;
                eraserRef.current.style.left = `${e.clientX - leftDistanceOfDrawingBoard - props.eraserRadius}px`

                if(isMouseDown) {
                    context.beginPath();
                    context.arc(e.clientX - leftDistanceOfDrawingBoard, e.clientY - topDistanceOfDrawingBoard, props.eraserRadius, 0, 2 * Math.PI);
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
        } catch(error) {
            console.log(error);
        }
    }

    const downloadBoard = () => {
        try {
            const url = canvasRef.current?.toDataURL();

            const a = document.createElement("a");
            a.href = url;
            a.download = "board";
            a.click();
        } catch(error) {
            console.log(error);
        }
    }

    const clearBoard = () => {
        try {
            const canvasContainer = canvasContainerRef.current;
            context.fillStyle = "white";
            context.fillRect(0, 0, canvasContainer.clientWidth, canvasContainer.clientHeight);
        } catch(error) {
            console.log(error);
        }
    }

    const uploadImage = () => {
        try {
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
        } catch(error) {
            console.log(error);
        }
    }

    const createContextAndSetEventListeners = () => {
        try {
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
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        createContext();
    }, []);
    
    useEffect(() => {
        createContextAndSetEventListeners();
    }, [props.currentActiveControl, props.color, props.pencilWidth, props.currentShape, props.eraserRadius]);
    
    return (
        <div ref = {canvasContainerRef} className = {styles["drawing-board-container"]}>
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