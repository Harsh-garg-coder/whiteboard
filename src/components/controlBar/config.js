import PencilImage from "../../images/pencil-icon.svg";
import ShapesImage from "../../images/shapes-icon.svg"
import EraserImage from "../../images/eraser-icon.svg";
import DownloadImage from "../../images/download-icon.svg"
import RectangleImage from "../../images/rectangle-icon.png";
import CircleImage from "../../images/circle-icon.svg";
import DeleteImage from "../../images/delete-icon.svg";
import UploadImage from "../../images/upload-image-icon.svg";
import ColorPicker from "../../images/color.png";

const controlsImage = [
    { image: ColorPicker, name: "color"},
    { image : PencilImage, name : "pencil"},
    { image : ShapesImage, name : "shapes"},
    { image : EraserImage, name : "eraser"},
    { image : DownloadImage, name : "download"},
    { image : DeleteImage, name : "delete"},
    { image : UploadImage, name : "upload-image"}
];

export const shapes = [
    { image : RectangleImage, alt : "rectangle-icon", name : "rectangle"},
    { image : CircleImage, alt : "circle-icon", name : "circle"}
]

export default controlsImage;
