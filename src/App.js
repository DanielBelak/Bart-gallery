import React, { useState } from "react";
import GlobalStyle from "./components/GlobalStyle";
import HeroSection from "../src/components/HeroSection";
import Gallery from "../src/components/Gallery";
import PopUpInsert from "../src/components/PopUpInsert";
import PopUpCategory from "../src/components/PopUpCategory";

function App() {
  const [popUpState, setPopUpState] = useState({
    category: false,
    photos: false,
    lightbox: false,
  });
  const [gallery, setGallery] = useState("");
  const [photos, setPhotos] = useState("");
  const [background, setBackground] = useState(undefined);
  const [title, setTitle] = useState("Kategórie");

  return (
    <div className="App">
      <GlobalStyle />
      <HeroSection
        background={background}
        title={title}
        setPhotos={setPhotos}
      />
      <Gallery
        setBackground={setBackground}
        popUpState={popUpState}
        setPopUpState={setPopUpState}
        setTitle={setTitle}
        gallery={gallery}
        setGallery={setGallery}
        photos={photos}
        setPhotos={setPhotos}
      />
      <PopUpCategory
        popUpState={popUpState}
        setPopUpState={setPopUpState}
        setGallery={setGallery}
      />
      <PopUpInsert
        popUpState={popUpState}
        setPopUpState={setPopUpState}
        title={title}
        setPhotos={setPhotos}
        setGallery={setGallery}
        setBackground={setBackground}
      />
    </div>
  );
}

export default App;
