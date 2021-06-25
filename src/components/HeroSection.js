import React from "react";
import styled from "styled-components";
import arrow_back from "../icons/back_icon.svg";
import { Container } from "./StyledComponents/Container.js";

const HeroSection = ({ background, title, setTitle, setPhotos }) => {
  //handle the arrow-back functionality
  const goBackHandler = () => {
    setTitle("Kategórie");
    window.history.back();
    setPhotos("");
  };

  return (
    <div>
      <Background style={{ backgroundImage: `url(${background})` }}>
        <Filter>
          <Container>
            <Title>
              <MainTitle>Fotogaléria</MainTitle>
              <SubTitle>
                {title !== "Kategórie" ? (
                  <ArrowBack
                    src={arrow_back}
                    alt="arrow back"
                    onClick={goBackHandler}
                  />
                ) : null}

                {title}
              </SubTitle>
            </Title>
          </Container>
        </Filter>
      </Background>
    </div>
  );
};
export default HeroSection;

const Background = styled.div`
  height: 35em;
  width: 100%;
  background-position: 50% 60%;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  transition: all 0.4s ease-in-out;
  animation: fadein 2s;
`;
const Filter = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(40, 40, 40, 0.4);
  backdrop-filter: blur(9px);
`;
const Title = styled.div`
  width: 100%;
  position: absolute;
  top: 35%;
`;

const MainTitle = styled.h1`
  font-size: 2.4rem;
  color: #fff;
  font-weight: 400;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 1.2em;
`;
const SubTitle = styled.h2`
  font-size: 1.6rem;
  font-weight: 400;
  letter-spacing: 1px;
  color: #fff;
  text-transform: uppercase;
  width: 100%;
  border-bottom: 2.5px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 1em;
`;
const ArrowBack = styled.img`
  margin-right: 1em;
  cursor: pointer;
`;
