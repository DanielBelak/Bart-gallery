import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import closeIcon from "../icons/close_icon.svg";
import nextIcon from "../icons/next_icon.svg";
import prevIcon from "../icons/prev_icon.svg";
import { PopUp } from "./StyledComponents/PopUp.js";
import { Overlay } from "./StyledComponents/Overlay.js";
import { CloseButtonArea } from "./StyledComponents/CloseButtonArea.js";
import { CloseButton } from "./StyledComponents/CloseButton.js";

function PopUpSlider({
  popUpState,
  setPopUpState,
  photos,
  setPhotoIndex,
  photoIndex,
}) {
  let ImageRef = useRef();
  const [imageLoaded, setImageLoaded] = useState(false);
  //setting photo carousel

  const prevPhotoHandler = () => {
    if (photoIndex === 0) {
      ImageRef.current.animate(
        [{ transform: "translateX(+3em)" }, { transform: "translateX(0em)" }],
        {
          duration: 500,
        }
      );
    }
    if (photoIndex > 0) {
      setPhotoIndex((prevPhotoIndex) => prevPhotoIndex - 1);
      setImageLoaded(false);
    }
  };

  const nextPhotoHandler = () => {
    if (photoIndex === photos.length - 1) {
      ImageRef.current.animate(
        [{ transform: "translateX(-3em)" }, { transform: "translateX(0em)" }],
        {
          duration: 500,
        }
      );
    }
    if (photoIndex < photos.length - 1) {
      setPhotoIndex((prevPhotoIndex) => prevPhotoIndex + 1);
      setImageLoaded(false);
    }
  };

  useEffect(() => {
    const changePhoto = (e) => {
      switch (e.key) {
        case "ArrowLeft":
          prevPhotoHandler();
          return;
        case "ArrowRight":
          nextPhotoHandler();
          return;
        default:
      }
    };
    window.addEventListener("keydown", changePhoto);
    return () => {
      window.removeEventListener("keydown", changePhoto);
    };
  }, [photoIndex]);

  //Close pop by pressing escape
  useEffect(() => {
    const close = (e) => {
      if (e.key === "Escape" && popUpState.lightbox === true) {
        closePopUp();
      }
    };
    window.addEventListener("keydown", close);
    return () => {
      window.removeEventListener("keydown", close);
    };
  }, [popUpState.lightbox]);

  const closePopUp = () => {
    setPopUpState({ ...popUpState, lightbox: !popUpState.lightbox });
    setTimeout(() => {
      setImageLoaded(false);
    }, 500);
  };
  const imageLoadedHandler = () => {
    setImageLoaded(true);
    ImageRef.current.animate(
      [{ transform: "scale(1.1)" }, { transform: "scale(1)" }],
      {
        duration: 500,
      }
    );
  };

  return (
    <div>
      <Overlay
        className={` ${popUpState.lightbox ? "active" : ""}`}
        onClick={() => {
          closePopUp();
        }}
      ></Overlay>
      <PopUpGallery className={` ${popUpState.lightbox ? "active" : ""}`}>
        <CloseButtonArea
          onClick={() => {
            closePopUp();
          }}
        >
          <CloseButton>
            <img src={closeIcon} alt="close X" />
            zavrieť
          </CloseButton>
        </CloseButtonArea>

        <Lightbox>
          <Prev onClick={prevPhotoHandler}>
            <img
              src={prevIcon}
              alt="arrow left"
              className={photoIndex === 0 ? "opacity" : ""}
            />
          </Prev>
          <Placeholder
            style={imageLoaded ? { display: "none" } : { display: "flex" }}
          >
            <Loader>
              <div className="first"></div>
              <div className="second"></div>
              <div className="third"></div>
            </Loader>
            <span> Načítavam...</span>
          </Placeholder>
          <LightboxImg>
            <img
              ref={ImageRef}
              src={
                photos[photoIndex]
                  ? `http://api.programator.sk/images/800x600/${photos[photoIndex].fullpath} `
                  : ""
              }
              alt=""
              onLoad={imageLoadedHandler}
              style={imageLoaded ? { display: "block" } : { display: "none" }}
            />
          </LightboxImg>
          <Next onClick={nextPhotoHandler}>
            <img
              src={nextIcon}
              alt="arrow right"
              className={photoIndex === photos.length - 1 ? "opacity" : ""}
            />
          </Next>
        </Lightbox>
      </PopUpGallery>
    </div>
  );
}

export default PopUpSlider;

const Lightbox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  &:before {
    content: "";
    display: block;
    padding-top: 61%;
  }
`;
const PopUpGallery = styled(PopUp)`
  @media (max-width: 620px) {
    max-width: 90%;
  }
`;
const LightboxImg = styled.div`
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  img {
    width: 100%;
    display: block;
  }
`;

const Prev = styled.div`
  cursor: pointer;
  padding: 2em;
  position: absolute;
  left: -6em;
  z-index: 5;
  img.opacity {
    opacity: 0.5;
    color: red;
  }
  @media (max-width: 620px) {
    left: 0em;
    padding-left: 1em;
  }
`;
const Next = styled.div`
  cursor: pointer;
  padding: 2em;
  position: absolute;
  right: -6em;
  img.opacity {
    opacity: 0.5;
  }
  @media (max-width: 620px) {
    right: 0em;
    padding-right: 1em;
  }
`;
const Placeholder = styled.div`
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: black;
  width: 100%;
  background-color: #efefef;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  & > div {
    width: 0.5em;
    height: 0.5em;
    background-color: #000;
    border-radius: 50%;
    margin: 1em;
    animation: bounce 1s 0.5s linear infinite;
  }
  .first {
    animation-delay: 0.1s;
  }
  .second {
    animation-delay: 0.2s;
  }
  .third {
    animation-delay: 0.3s;
  }
  @keyframes bounce {
    0%,
    50%,
    100% {
      transform: scale(1);
    }
    25% {
      transform: scale(0.6);
    }
    75% {
      transform: scale(1.4);
    }
  }
`;
