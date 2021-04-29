import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import closeIcon from "../icons/close_icon.svg";
import plusIcon from "../icons/plus_icon.svg";
import axios from "axios";

const PopUpCategory = ({ popUpState, setPopUpState, setGallery }) => {
  const [newCategoryInputText, setNewCategoryInputText] = useState("");
  const inputRef = useRef(null);

  //Focus input form
  useEffect(() => {
    inputRef.current.focus();
  }, [popUpState]);

  //Set category name state
  const inputTextHandler = (e) => {
    setNewCategoryInputText(e.target.value);
  };
  //Check if new category name is not empty
  const submitHandler = (e) => {
    e.preventDefault();
    if (newCategoryInputText === "") {
      alert("Zadajte názov kategórie. Pole je prázdne");
      inputRef.current.focus();
    }
    //Check for "/" in the name(forbidden)
    for (let i = 0; i < newCategoryInputText.length; i++) {
      if (newCategoryInputText[i] === "/") {
        alert("Názov nemôže obsahovať znak /");
        inputRef.current.focus();
      } else {
        setCategoryNameHandler();
      }
    }
    setNewCategoryInputText("");
  };

  //Post new category to the server
  const setCategoryNameHandler = () => {
    axios
      .post("http://api.programator.sk/gallery", {
        name: newCategoryInputText,
      })
      .then(() => {
        updateGallery();
        setPopUpState({ ...popUpState, category: !popUpState.category });
      })
      .catch((err) => console.log(err));
  };
  //Update displayed galleries
  const updateGallery = () => {
    axios
      .get("http://api.programator.sk/gallery")
      .then((resp) => {
        setGallery(resp.data.galleries);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className={`overlay ${popUpState.category ? "active" : ""}`}></div>
      <div className={`pop-up  ${popUpState.category ? "active" : ""}`}>
        <div
          className="close-btn"
          onClick={() => {
            setPopUpState({ ...popUpState, category: !popUpState.category });
            setNewCategoryInputText("");
          }}
        >
          <img src={closeIcon} alt="close X" />
          zavrieť
        </div>
        <NewCategory>
          <h2>Pridať kategóriu</h2>
          <CategoryForm
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="zadajte názov kategórie"
              onChange={inputTextHandler}
              value={newCategoryInputText}
              disabled={!popUpState.category}
            />
            <button className="add-btn" type="submit">
              <img src={plusIcon} alt="plus icon " />
              Pridať
            </button>
          </CategoryForm>
        </NewCategory>
      </div>
    </>
  );
};
export default PopUpCategory;

const NewCategory = styled.section`
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
const CategoryForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 3px solid #eee;
  padding-bottom: 1em;
  height: 100%;
  @media (max-width: 550px) {
    flex-direction: column;
  }
  button {
    @media (max-width: 550px) {
      margin-top: 1em;
    }
  }
  input {
    outline: none;
    border: none;
    text-transform: uppercase;
    width: 100%;
    font-size: 1.6rem;
    letter-spacing: 0.5px;
    color: #ababab;

    ::placeholder {
      color: #ababab;
      height: 100%;
      font-weight: 500;
      font-size: 1.6rem;
      letter-spacing: 0.5px;
    }
  }
`;
