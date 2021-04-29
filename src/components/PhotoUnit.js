import React, { useState } from "react";
import LazyLoad from "react-lazy-load";

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
    <div
      className="gallery-unit "
      onClick={() => {
        setPhotoIndex(index);
        setPopUpState({ ...popUpState, lightbox: !popUpState.lightbox });
      }}
    >
      <h1
        className="placeholder"
        style={loaded ? { display: "none" } : { display: "block" }}
      >
        Loading...
      </h1>
      <LazyLoad className="picture">
        <img
          src={`http://api.programator.sk/images/1000x800/${source} `}
          alt={alt}
          style={loaded ? { display: "block" } : { display: "none" }}
          onLoad={loadHandler}
        />
      </LazyLoad>
    </div>
  );
}

export default PhotoUnit;
