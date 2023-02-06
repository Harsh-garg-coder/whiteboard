import PenImage from "../../images/pen-icon.svg";
import ShapesImage from "../../images/shapes-icon.svg"
import EraserImage from "../../images/eraser-icon.svg";
import DownloadImage from "../../images/download-icon.svg"
import RectangleImage from "../../images/rectangle-icon.png";
import CircleImage from "../../images/circle-icon.svg";

const controlsImage = [
    { image : PenImage},
    { image : ShapesImage},
    { image : EraserImage},
    { image : DownloadImage}
];

export const pencilColors = ["black", "red", "blue"];

export const shapes = [
    { image : RectangleImage, alt : "rectangle-icon", name : "rectangle"},
    { image : CircleImage, alt : "circle-icon", name : "circle"}
]

export default controlsImage;
