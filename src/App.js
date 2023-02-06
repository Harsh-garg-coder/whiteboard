import { useState } from "react";
import styles from "./App.module.css";
import ControlBar from "./components/controlBar/ControlBar";
import DrawingBoard from "./components/drawingBoard/DrawingBoard";

export default function App() {
  const [pencilWidth, setPencilWidth] = useState(5);
  const [pencilColor, setPencilColor] = useState("black");
  const [eraserRadius, setEraserRadius] = useState(20);
  const [currentShape, setCurrentShape] = useState("rectangle");
  const [currentActiveControlIndex, setCurrentActiveControlIndex] = useState(0);

  console.log("pencilColor", pencilColor, "pencilWidth", pencilWidth, "eraserRadius", eraserRadius, "currentShape", currentShape, "currentActiveIndex", currentActiveControlIndex);
  return (
    <div className = {styles["app-container"]}>
      <ControlBar 
        penWidth = {pencilWidth}
        setPencilWidth = {setPencilWidth}
        pencilColor = {pencilColor}
        setPencilColor = {setPencilColor}
        currentShape = {currentShape}
        setCurrentShape = {setCurrentShape}
        eraserRadius = {eraserRadius}
        setEraserRadius = {setEraserRadius}
        setCurrentActiveControlIndex = {setCurrentActiveControlIndex}
        currentActiveControlIndex = {currentActiveControlIndex}
      />
      <DrawingBoard 
        currentActiveControlIndex = {currentActiveControlIndex}
        pencilColor = {pencilColor}
        pencilWidth = {pencilWidth}
        currentShape = {currentShape}
        eraserRadius = {eraserRadius}
      />
    </div>
  )
}