import React from "react";
import styled from "styled-components";
import addIcon from "../icons/add_category.svg";
import { GalleryItem } from "./StyledComponents/GalleryItem.js";

const AddGallery = ({ setPopUpState, popUpState }) => {
  return (
    <AddGalleryWrapper>
      <AddGalleryUnit
        onClick={() =>
          setPopUpState({ ...popUpState, category: !popUpState.category })
        }
      >
        <img src={addIcon} alt="plus icon" />
        <h3>Pridať kategóriu</h3>
      </AddGalleryUnit>
    </AddGalleryWrapper>
  );
};
export default AddGallery;
const AddGalleryUnit = styled(GalleryItem)`
  border: 3px solid #eee;
  h3 {
    text-transform: uppercase;
    color: #aaa;
    letter-spacing: 0.5px;
    font-size: 1.6rem;
    font-weight: 500;
    margin-top: 1em;
  }
`;
const AddGalleryWrapper = styled.div`
  position: relative;
  &:before {
    content: "";
    display: block;
    padding-top: 70%;
  }
`;
