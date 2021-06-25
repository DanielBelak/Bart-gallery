import React, { useState } from "react";
import LazyLoad from "react-lazy-load";
import styled from "styled-components";
import { GalleryItem } from "./StyledComponents/GalleryItem.js";

function PhotoUnit({
  source,
  alt,
  setPopUpState,
  popUpState,
  index,
  setPhotoIndex,
}) {
  const [loaded, setLoaded] = useState(false);
  const loadHandler = () => {
    setLoaded(true);
  };
  return (
    <PhotoWrapper>
      <PhotoUnitStyle
        onClick={() => {
          setPhotoIndex(index);
          setPopUpState({ ...popUpState, lightbox: !popUpState.lightbox });
        }}
      >
        <Placeholder
          style={loaded ? { display: "none" } : { display: "block" }}
        >
          <Loader></Loader>
          <span> Načítavam...</span>
        </Placeholder>
        <Picture>
          <LazyLoad>
            <img
              src={`http://api.programator.sk/images/1000x800/${source} `}
              alt={alt}
              onLoad={loadHandler}
              style={loaded ? { display: "block" } : { display: "none" }}
            />
          </LazyLoad>
        </Picture>
      </PhotoUnitStyle>
    </PhotoWrapper>
  );
}

export default PhotoUnit;

const PhotoUnitStyle = styled(GalleryItem)`
  img {
    width: 100%;
    display: block;
    overflow: hidden;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
  }
`;

const PhotoWrapper = styled.div`
  position: relative;
  &:before {
    content: "";
    display: block;
    padding-top: 70%;
  }
`;
const Picture = styled.div`
  border-radius: 5px;
  width: 100%;
  flex: 1;
  overflow: hidden;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  object-fit: cover;
`;

const Placeholder = styled.div`
  font-size: 1.4rem;
  position: relative;
  top: 30%;
`;

const Loader = styled.div`
  border: 5px solid white;
  border-radius: 50%;
  border-top: 5px solid black;
  width: 40px;
  height: 40px;
  animation: spin 2s linear infinite;
  margin: 0 auto;
  margin-bottom: 1em;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
