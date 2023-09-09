import { useState } from "react";
import styles from "./App.module.css";
import ControlBar from "./components/controlBar/ControlBar";
import DrawingBoard from "./components/drawingBoard/DrawingBoard";

export default function App() {
  const [pencilWidth, setPencilWidth] = useState(5);
  const [pencilColor, setPencilColor] = useState("black");
  const [eraserRadius, setEraserRadius] = useState(20);
  const [currentShape, setCurrentShape] = useState("rectangle");
  const [currentActiveControl, setCurrentActiveControl] = useState("pencil");

  return (
    <div className = {styles["app-container"]}>
      <DrawingBoard 
        currentActiveControl = {currentActiveControl}
        setCurrentActiveControl = {setCurrentActiveControl}
        pencilColor = {pencilColor}
        pencilWidth = {pencilWidth}
        currentShape = {currentShape}
        eraserRadius = {eraserRadius}
      />

      <ControlBar 
        pencilWidth = {pencilWidth}
        setPencilWidth = {setPencilWidth}
        pencilColor = {pencilColor}
        setPencilColor = {setPencilColor}
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