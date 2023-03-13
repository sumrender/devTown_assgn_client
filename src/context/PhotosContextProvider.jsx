import { createContext, useReducer } from "react";

export const PhotosContext = createContext();

export const photosReducer = (state, action) => {
  switch (action.type) {
    case "SET_PHOTOS":
      return {
        photos: action.payload,
      };
    case "CREATE_PHOTO":
      return {
        photos: [action.payload, ...state.photos],
      };
    case "DELETE_PHOTO":
      return {
        photos: state.photos.filter((p) => p._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const PhotosContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(photosReducer, {
    photos: [],
  });
  console.log("PhotosContext state:", state);
  return (
    <PhotosContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PhotosContext.Provider>
  );
};
