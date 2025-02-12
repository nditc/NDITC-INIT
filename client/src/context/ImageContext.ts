import { ImageAction, ImageState } from "@/types/Image";
import { createContext, Dispatch } from "react";

const ImageContext = createContext<[ImageState, Dispatch<ImageAction>] | null>(
  null,
);

export default ImageContext;
