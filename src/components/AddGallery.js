import React from "react";
//import styled from "styled-components";
import addIcon from "../icons/add_category.svg";

const AddGallery = ({ setPopUpState, popUpState }) => {
  return (
    <div
      className="add-gallery"
      onClick={() =>
        setPopUpState({ ...popUpState, category: !popUpState.category })
      }
    >
      <img src={addIcon} alt="plus icon" />
      <h3>Pridať kategóriu</h3>
    </div>
  );
};
export default AddGallery;
