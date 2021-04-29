import React from "react";
import photoIcon from "../icons/photo_icon.svg";

function AddPhoto({ popUpState, setPopUpState }) {
  return (
    <div
      className="add-photo"
      onClick={() =>
        setPopUpState({ ...popUpState, photos: !popUpState.photos })
      }
    >
      <img src={photoIcon} alt="icon plus symbol" />
      <h3>Pridať fotky</h3>
    </div>
  );
}

export default AddPhoto;
