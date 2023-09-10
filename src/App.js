import { useState } from "react";
import styles from "./App.module.css";
import ControlBar from "./components/controlBar/ControlBar";
import DrawingBoard from "./components/drawingBoard/DrawingBoard";

export default function App() {
  const [color, setColor] = useState("black");
  const [pencilWidth, setPencilWidth] = useState(5);
  const [eraserRadius, setEraserRadius] = useState(20);
  const [currentShape, setCurrentShape] = useState("rectangle");
  const [currentActiveControl, setCurrentActiveControl] = useState("pencil");
  const [previousActiveControl, setPreviousActiveControl] = useState("pencil");

  return (
    <div className = {styles["app-container"]}>
      <DrawingBoard 
        currentActiveControl = {currentActiveControl}
        setCurrentActiveControl = {setCurrentActiveControl}
        color = {color}
        pencilWidth = {pencilWidth}
        currentShape = {currentShape}
        eraserRadius = {eraserRadius}
      />

      <ControlBar 
        color = {color}
        setColor = {setColor}
        previousActiveControl = {previousActiveControl}
        setPreviousActiveControl = {setPreviousActiveControl}
        pencilWidth = {pencilWidth}
        setPencilWidth = {setPencilWidth}
        currentShape = {currentShape}
        setCurrentShape = {setCurrentShape}
        eraserRadius = {eraserRadius}
        setEraserRadius = {setEraserRadius}
        setCurrentActiveControl = {setCurrentActiveControl}
        currentActiveControl = {currentActiveControl}
      />
    </div>
  )
}