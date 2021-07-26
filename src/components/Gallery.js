import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AddGallery from "./AddGallery";
import AddPhoto from "./AddPhoto";
import GalleryUnit from "./GalleryUnit";
import PhotoUnit from "./PhotoUnit";
import PopUpSlider from "./PopUpSlider";
import axios from "axios";
import { Switch, Route, useLocation } from "react-router-dom";
import { Container } from "./StyledComponents/Container.js";

const Gallery = ({
  popUpState,
  setPopUpState,
  setBackground,
  setTitle,
  gallery,
  setGallery,
  photos,
  setPhotos,
  update,
}) => {
  const [photoIndex, setPhotoIndex] = useState("");
  let location = useLocation();
  let address = location.pathname;
  if (address === "/") {
    address = "";
  }

  useEffect(() => {
    axios
      .get(`http://api.programator.sk/gallery${address}`)
      .then((resp) => {
        // When at homepage, getting the galleries and set the first image as a  background//
        if (location.pathname === "/") {
          setGallery(resp.data.galleries);
          setHomepageBackground(resp);
          setTitle("Kategórie");
        } else {
          // When at subpage, getting the photos and set the first image as a  background//
          setPhotos(resp.data.images);
          setTitle(address.substring(1));
          setSubpageBackground(resp);
        }
      })
      .catch((err) => console.log(err));
  }, [location.pathname, update]);

  const setSubpageBackground = (resp) => {
    let firstImage = resp.data.images[0].fullpath;
    setBackground("http://api.programator.sk/images/600x320/" + firstImage);
  };

  const setHomepageBackground = (resp) => {
    let firstImage = resp.data.galleries.map((unit) => unit.image);
    firstImage = firstImage.filter((element) => element !== undefined);
    firstImage = firstImage[0].fullpath;
    setBackground("http://api.programator.sk/images/600x320/" + firstImage);
  };

  return (
    <Container>
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
    </Container>
  );
};
export default Gallery;

const GalleryWrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  grid-gap: 3em;
  grid-auto-flow: dense;
  @media (max-width: 585px) {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    grid-gap: 2em;
  }
`;
