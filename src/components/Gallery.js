import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AddGallery from "./AddGallery";
import AddPhoto from "./AddPhoto";
import GalleryUnit from "./GalleryUnit";
import PhotoUnit from "./PhotoUnit";
import PopUpSlider from "./PopUpSlider";
import axios from "axios";
import { Switch, Route, useLocation } from "react-router-dom";

const Gallery = ({
  popUpState,
  setPopUpState,
  setBackground,
  setTitle,
  gallery,
  setGallery,
  photos,
  setPhotos,
}) => {
  const [photoIndex, setPhotoIndex] = useState("");
  let location = useLocation();

  // When at homepage, getting the galleries and set the first image as a  background//

  useEffect(() => {
    location.pathname === "/" &&
      axios
        .get("http://api.programator.sk/gallery")
        .then((resp) => {
          setGallery(resp.data.galleries);
          setHomepageBackground(resp);
          setTitle("Kategórie");
        })
        .catch((err) => console.log(err));
  }, [location.pathname]);

  // When at subpage, getting the photos and set the first image as a  background//

  useEffect(() => {
    location.pathname !== "/" &&
      axios
        .get(`http://api.programator.sk/gallery${location.pathname}`)
        .then((resp) => {
          setPhotos(resp.data.images);
          setTitle(location.pathname.substring(1));
          setSubpageBackground(resp);
        })
        .catch((err) => console.log(err));
  }, [location.pathname]);

  const setSubpageBackground = (resp) => {
    let firstImage = resp.data.images[0].fullpath;
    setBackground("http://api.programator.sk/images/600x400/" + firstImage);
  };

  const setHomepageBackground = (resp) => {
    let firstImage = resp.data.galleries.map((unit) => unit.image);
    firstImage = firstImage.filter((element) => element !== undefined);
    firstImage = firstImage[0].fullpath;
    setBackground("http://api.programator.sk/images/600x400/" + firstImage);
  };

  return (
    <div className="container">
      <GalleryWrapper>
        <Switch>
          <Route path="/" exact>
            {gallery &&
              gallery.map((value, index) => (
                <GalleryUnit
                  key={index}
                  name={value.name}
                  image={value.image ? value.image.fullpath : undefined}
                  imageName={value.image ? value.image.name : undefined}
                  setBackground={setBackground}
                  photos={photos}
                  gallery={gallery}
                />
              ))}
            <AddGallery setPopUpState={setPopUpState} popUpState={popUpState} />
          </Route>
          <Route path="/:id">
            {photos &&
              photos.map((value, index) => (
                <PhotoUnit
                  source={value.fullpath}
                  alt={value.name}
                  key={index}
                  index={index}
                  setPopUpState={setPopUpState}
                  popUpState={popUpState}
                  setPhotoIndex={setPhotoIndex}
                />
              ))}
            <AddPhoto setPopUpState={setPopUpState} popUpState={popUpState} />
            <PopUpSlider
              popUpState={popUpState}
              setPopUpState={setPopUpState}
              photoIndex={photoIndex}
              setPhotoIndex={setPhotoIndex}
              photos={photos}
            />
          </Route>
        </Switch>
      </GalleryWrapper>
    </div>
  );
};
export default Gallery;

const GalleryWrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  grid-gap: 3em;
  grid-auto-flow: dense;
  @media (max-width: 280px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
`;
