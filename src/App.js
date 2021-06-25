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
  const [update, setUpdate] = useState("");

  return (
    <div className="App">
      <GlobalStyle />
      <HeroSection
        background={background}
        title={title}
        setPhotos={setPhotos}
        setTitle={setTitle}
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
        update={update}
      />
      <PopUpCategory
        popUpState={popUpState}
        setPopUpState={setPopUpState}
        gallery={gallery}
        setUpdate={setUpdate}
      />
      <PopUpInsert
        popUpState={popUpState}
        setPopUpState={setPopUpState}
        title={title}
        setUpdate={setUpdate}
      />
    </div>
  );
}

export default App;
