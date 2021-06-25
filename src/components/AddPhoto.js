import React from "react";
import photoIcon from "../icons/photo_icon.svg";
import styled from "styled-components";
import { GalleryItem } from "./StyledComponents/GalleryItem.js";

function AddPhoto({ popUpState, setPopUpState }) {
  return (
    <AddPhotoWrapper>
      <AddPhotoUnit
        onClick={() =>
          setPopUpState({ ...popUpState, photos: !popUpState.photos })
        }
      >
        <img src={photoIcon} alt="icon plus symbol" />
        <h3>Pridať fotky</h3>
      </AddPhotoUnit>
    </AddPhotoWrapper>
  );
}

export default AddPhoto;

const AddPhotoUnit = styled(GalleryItem)`
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

const AddPhotoWrapper = styled.div`
  position: relative;
  &:before {
    content: "";
    display: block;
    padding-top: 70%;
  }
`;
