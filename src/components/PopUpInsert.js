import React, { useState } from "react";
import styled from "styled-components";
import closeIcon from "../icons/close_icon.svg";
import cameraIcon from "../icons/photo_icon.svg";
import plusIcon from "../icons/plus_icon.svg";
import axios from "axios";

const PopUpInsert = ({
  popUpState,
  setPopUpState,
  title,
  setPhotos,
  setGallery,
  setBackground,
}) => {
  const [uploadedFiles, setUploadedFiles] = useState("");
  const [photoNumber, setPhotoNumber] = useState(0);

  //Prevent from reload after dragging the photos
  const dragHandler = (e) => {
    e.preventDefault();
  };
  //Save dropped photos as a state
  const fileDropHandler = (e) => {
    e.preventDefault();
    setUploadedFiles(e.dataTransfer.files);
    setPhotoNumber(e.dataTransfer.files.length);
  };
  //Save dropped photos as a state
  const fileSelectHandler = () => {
    let imagedata = document.querySelector('input[type="file"]').files;
    setUploadedFiles(imagedata);
    setPhotoNumber(imagedata.length);
  };
  //Create a formData object to store uploaded photos
  const postPhotosHandler = (e) => {
    e.preventDefault();
    let data = new FormData();
    for (let i = 0; i < uploadedFiles.length; i++) {
      data.append(uploadedFiles[i].name, uploadedFiles[i]);
    }
    //Send uploaded photos to a server
    axios
      .post(`http://api.programator.sk/gallery/${title}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        updatePhotos();
      })
      .catch((err) => console.log(err));
  };
  //Display new added photos in a specific gallery
  const updatePhotos = () => {
    axios
      .get(`http://api.programator.sk/gallery/${title}`)
      .then((resp) => {
        setPhotos(resp.data.images);
        let firstImage = resp.data.images[0].fullpath;
        setBackground("http://api.programator.sk/images/600x400/" + firstImage);
      })
      .catch((err) => console.log(err));
    axios
      .get("http://api.programator.sk/gallery")
      .then((resp) => {
        setGallery(resp.data.galleries);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className={`overlay ${popUpState.photos ? "active" : ""}`}></div>
      <div className={`pop-up  ${popUpState.photos ? "active" : ""}`}>
        <CloseBtn
          onClick={() => {
            setPopUpState({ ...popUpState, photos: !popUpState.photos });
            setPhotoNumber(0);
          }}
        >
          <img src={closeIcon} alt="close button" />
          zavrieť
        </CloseBtn>
        <PhotosForm
          onSubmit={(e) => {
            setPopUpState({ ...popUpState, photos: !popUpState.photos });
            postPhotosHandler(e);
            setPhotoNumber(0);
          }}
        >
          <h2>Pridať fotky</h2>
          <DragArea
            onDragOver={dragHandler}
            onDragEnter={dragHandler}
            onDragLeave={dragHandler}
            onDrop={fileDropHandler}
          >
            <img src={cameraIcon} alt="camera icon" />
            <p>sem presunte fotky</p>
            <span>alebo</span>
            <label htmlFor="file">Vyberte súbory</label>
            <input
              type="file"
              id="file"
              name="file"
              accept="image/png, image/jpeg"
              multiple="multiple"
              onChange={fileSelectHandler}
            />
            <UploadInfo
              style={{ display: photoNumber === 0 ? "none" : "block" }}
            >
              {photoNumber} photos have been chosen
            </UploadInfo>
          </DragArea>
          <AddButton type="submit" className="add-btn">
            <img src={plusIcon} alt="plus icon " />
            Pridať
          </AddButton>
        </PhotosForm>
      </div>
    </>
  );
};
export default PopUpInsert;

const CloseBtn = styled.div`
  cursor: pointer;
  font-size: 1.6rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: white;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 1em;
  width: auto;
  img {
    padding-right: 0.5em;
  }
`;
const PhotosForm = styled.form`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 5px;
  width: 100%;
  padding: 2.5em;
  h2 {
    font-size: 2.4rem;
    font-weight: 500;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #555;
    margin-bottom: 1.5em;
  }
`;
const DragArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 3px dashed #eee;
  padding: 3em;
  color: #aaa;
  text-align: center;
  p {
    font-size: 1.6rem;
    font-weight: 500;
    text-transform: uppercase;
    padding: 1em 0 0.5em;
  }
  span {
    font-size: 1.4rem;
    font-weight: 400;
    padding-bottom: 0.5em;
  }
  label {
    cursor: pointer;
    font-size: 1.6rem;
    font-weight: medium;
    text-transform: uppercase;
    border: 3px solid #a9a9a9;
    border-radius: 5px;
    padding: 0.5em 1.5em;
    text-align: center;
  }
  input {
    opacity: 0;
    position: absolute;
    z-index: -1;
  }
`;

const AddButton = styled.button`
  align-self: flex-end;
  margin-top: 2em;
`;
const UploadInfo = styled.h4`
  font-size: 1.6rem;
  margin-top: 1em;
  font-weight: 500;
  color: green;
`;
