import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import closeIcon from "../icons/close_icon.svg";
import nextIcon from "../icons/next_icon.svg";
import prevIcon from "../icons/prev_icon.svg";

function PopUpSlider({
  popUpState,
  setPopUpState,
  photos,
  setPhotoIndex,
  photoIndex,
}) {
  let ImageRef = useRef();

  //setting photo carousel

  const prevPhotoHandler = () => {
    photoIndex === 0 &&
      ImageRef.current.animate(
        [{ transform: "translateX(-3em)" }, { transform: "translateX(0em)" }],
        {
          duration: 500,
        }
      );
    photoIndex > 0 && setPhotoIndex((prevPhotoIndex) => prevPhotoIndex - 1);
  };

  const nextPhotoHandler = () => {
    photoIndex === photos.length - 1 &&
      ImageRef.current.animate(
        [{ transform: "translateX(+3em)" }, { transform: "translateX(0em)" }],
        {
          duration: 500,
        }
      );
    photoIndex < photos.length - 1 &&
      setPhotoIndex((prevPhotoIndex) => prevPhotoIndex + 1);
  };

  return (
    <div>
      <div className={`overlay ${popUpState.lightbox ? "active" : ""}`}></div>
      <section
        className={` pop-up  gallery ${popUpState.lightbox ? "active" : ""}`}
      >
        <div
          className="close-btn"
          onClick={() => {
            setPopUpState({ ...popUpState, lightbox: !popUpState.lightbox });
            setPhotoIndex("");
          }}
        >
          <img src={closeIcon} alt="close X" />
          zavrieť
        </div>

        <div className="lightbox">
          <Prev>
            <img
              src={prevIcon}
              alt="arrow left"
              onClick={prevPhotoHandler}
              className={photoIndex === 0 ? "opacity" : ""}
            />
          </Prev>
          <LightboxImg
            ref={ImageRef}
            src={
              photos[photoIndex]
                ? `http://api.programator.sk/images/1200x800/${photos[photoIndex].fullpath} `
                : ""
            }
            alt="image"
          />
          <Next>
            <img
              src={nextIcon}
              alt="arrow right"
              onClick={nextPhotoHandler}
              className={photoIndex === photos.length - 1 ? "opacity" : ""}
            />
          </Next>
        </div>
      </section>
    </div>
  );
}

export default PopUpSlider;

const LightboxImg = styled.img`
  width: 100%;
  display: block;
`;

const Prev = styled.div`
  cursor: pointer;
  padding: 2em;
`;
const Next = styled.div`
  cursor: pointer;
  padding: 2em;
`;
