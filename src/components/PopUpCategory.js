import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import closeIcon from "../icons/close_icon.svg";
import plusIcon from "../icons/plus_icon.svg";
import axios from "axios";
import { PopUp } from "./StyledComponents/PopUp.js";
import { Overlay } from "./StyledComponents/Overlay.js";
import { CloseButtonArea } from "./StyledComponents/CloseButtonArea.js";
import { CloseButton } from "./StyledComponents/CloseButton.js";
import { AddButton } from "./StyledComponents/AddButton.js";

const PopUpCategory = ({ popUpState, setPopUpState, gallery, setUpdate }) => {
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
    //Check for duplicate name
    for (let i = 0; i < gallery.length; i++) {
      if (gallery[i].name === newCategoryInputText) {
        alert(
          "Galéria s týmto názvom je už vytvorená, prosím zvoľte iný názov."
        );
        inputRef.current.focus();
      } else {
        setCategoryNameHandler();
      }
    }
  };

  //Post new category to the server
  const setCategoryNameHandler = () => {
    axios
      .post("http://api.programator.sk/gallery", {
        name: newCategoryInputText,
      })
      .then(() => {
        //Update displayed galleries
        setUpdate(Math.random);
        setPopUpState({ ...popUpState, category: !popUpState.category });
      })
      .catch((err) => console.log(err));
  };

  //Close pop by pressing escape
  useEffect(() => {
    const close = (e) => {
      if (e.key === "Escape" && popUpState.category === true) {
        closePopUp();
      }
    };
    window.addEventListener("keydown", close);
    return () => {
      window.removeEventListener("keydown", close);
    };
  }, [popUpState.category]);

  const closePopUp = () => {
    setPopUpState({ ...popUpState, category: !popUpState.category });
    setNewCategoryInputText("");
  };

  return (
    <>
      <Overlay
        className={` ${popUpState.category ? "active" : ""}`}
        onClick={() => {
          closePopUp();
        }}
      ></Overlay>
      <PopUp className={`${popUpState.category ? "active" : ""}`}>
        <CloseButtonArea
          onClick={() => {
            closePopUp();
          }}
        >
          <CloseButton>
            <img src={closeIcon} alt="close X" />
            zavrieť
          </CloseButton>
        </CloseButtonArea>
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
            <AddButton type="submit">
              <img src={plusIcon} alt="plus icon " />
              Pridať
            </AddButton>
          </CategoryForm>
        </NewCategory>
      </PopUp>
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
