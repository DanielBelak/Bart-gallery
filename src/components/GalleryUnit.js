import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";

const GalleryUnit = ({
  name,
  image,
  imageName,
  setBackground,
  photos,
  gallery,
}) => {
  const [imageCount, setImageCount] = useState("0");
  const [hover, setHover] = useState(false);

  // Get photos to display a number of photos in a  gallery
  useEffect(() => {
    axios
      .get(`http://api.programator.sk/gallery/${name}`)
      .then((resp) => {
        setImageCount(resp.data.images.length);
      })
      .catch((err) => console.log(err));
  }, [photos, gallery]);

  return (
    <Link
      to={`/${name}`}
      className="gallery-unit"
      onMouseEnter={(e) => {
        setBackground(e.target.closest(".gallery-unit ").firstChild.src);
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <img
        src={
          image
            ? "http://api.programator.sk/images/600x400/" + image
            : undefined
        }
        alt={imageName}
      />
      <CategoryTitle>
        <h3>{name}</h3>
        <h4 className={`  ${hover ? "hover" : ""}`}>{imageCount} fotiek</h4>
      </CategoryTitle>
    </Link>
  );
};
export default GalleryUnit;

const CategoryTitle = styled.div`
  padding: 2em 0;
  width: 100%;
  box-shadow: 0px 0px 5px #c7c7c7;
  text-align: center;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;

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
    margin-top: 0.5em;
    display: none;
    opacity: 0;
  }
  .hover {
    display: block;
    opacity: 1;
  }
`;
