import styles from "./App.module.css";
import ControlBar from "./components/controlBar/ControlBar";
import DrawingBoard from "./components/drawingBoard/DrawingBoard";

export default function App() {
  return (
    <div className = {styles["app-container"]}>
      <ControlBar />
      <DrawingBoard />
    </div>
  )
}