import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { GalleryItem } from "./StyledComponents/GalleryItem.js";

const GalleryUnit = ({
  name,
  image,
  imageName,
  setBackground,
  photos,
  gallery,
}) => {
  const [imageCount, setImageCount] = useState("");
  const [hover, setHover] = useState(false);
  const [imageCountText, setImageCountText] = useState("fotiek");

  // Get photos to display a number of photos in a  gallery
  useEffect(() => {
    axios
      .get(`http://api.programator.sk/gallery/${name}`)
      .then((resp) => {
        setImageCount(resp.data.images.length);
      })
      .catch((err) => console.log(err));
  }, [photos, gallery]);

  useEffect(() => {
    PhotoTextHandler();
  }, [imageCount]);

  const PhotoTextHandler = () => {
    switch (imageCount) {
      case 1:
        setImageCountText("fotka");
        break;
      case 2:
      case 3:
      case 4:
        setImageCountText("fotky");
        break;
      default:
        break;
    }
  };

  return (
    <LinkWrapper>
      <Link
        to={`/${name}`}
        onMouseEnter={(e) => {
          setBackground(e.target.closest(".gallery-block ").firstChild.src);
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
      >
        <GalleryUnitStyle className="gallery-block">
          <img
            src={
              image
                ? "http://api.programator.sk/images/600x320/" + image
                : undefined
            }
            alt={imageName}
          />
          <CategoryTitle className={`${hover ? "hover" : ""}`}>
            <h3>{name}</h3>
            <h4 className={`${hover ? "rollup" : ""}`}>
              {imageCount} {imageCountText}
            </h4>
          </CategoryTitle>
        </GalleryUnitStyle>
      </Link>
    </LinkWrapper>
  );
};
export default GalleryUnit;

const GalleryUnitStyle = styled(GalleryItem)`
  justify-content: flex-start;
  img {
    width: 100%;
    display: block;
    overflow: hidden;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
  }
`;

const LinkWrapper = styled.div`
  position: relative;
  &:before {
    content: "";
    display: block;
    padding-top: 70%;
  }
`;

const CategoryTitle = styled.div`
  background-color: #fff;
  width: 100%;
  box-shadow: 0px 0px 5px #c7c7c7;
  text-align: center;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  position: absolute;
  bottom: 0;
  left: 0;
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: all 0.4s ease-in-out;
  &.hover {
    height: 40%;
  }
  h3 {
    text-decoration: none;
    color: red;
    background-color: #fff;
    color: #555;
    letter-spacing: 2px;
    text-transform: uppercase;
    width: 100%;
    font-size: 1.6rem;
    font-weight: 500;
  }
  h4 {
    color: #555;
    font-size: 1.6rem;
    color: #bababa;
    font-weight: 400;
    height: 0px;
    transition: all 0.4s ease-in;
    opacity: 0;
    box-sizing: border-box;
    &.rollup {
      height: 1.6rem;
      opacity: 1;
      margin: 0.5em 0;
    }
  }
`;
