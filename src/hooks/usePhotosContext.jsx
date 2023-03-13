import { PhotosContext } from "../context/PhotosContextProvider";
import { useContext } from "react";

export function usePhotosContext() {
  const context = useContext(PhotosContext);

  if (!context) {
    throw Error(
      "usePhotosContext must be used inside an PhotosContextProvider"
    );
  }

  return context;
}
