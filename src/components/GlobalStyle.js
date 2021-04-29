import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}
html {
  font-size: 62.5%;
}
body {
  font-family: "Roboto", sans-serif;
  background-color: white;
}
.container {
  width:1250px;
  max-width:85%;
  margin: 0 auto;
  height:100%;
  position: relative;
  @media (max-width: 600px) {
    width:320px;
    max-width:90%;
  }
  @media (max-width: 350px) {
    max-width:80%;
  }
}
.overlay{
  position: fixed;
  top: 0;
  left: 0;
  right:0;
  bottom:0;
  background-color: black;
  opacity: 0;
  pointer-events: none;
  transition: 400ms ease-in-out;

} 
.overlay.active{
  opacity: 0.75;
  pointer-events: all;
}

.pop-up {
  width:760px;
  max-width: 85%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  transition: 400ms ease-in-out;
  
}
.pop-up.active{
  transform: translate(-50%, -50%) scale(1);
 
}

.opacity{
  opacity:0.5
}

.close-btn{
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
}
.add-btn{
  cursor: pointer;
  border: none;
  outline: none;
  background-color: #43c68c;
  color: white;
  font-size: 1.6rem;
  padding: 1em 2em;
  display: flex;
  align-items: center;
  border-radius: 5px;
  text-transform: uppercase;
  
  img {
    padding-right: 0.5em;
  }
}

.gallery-unit,
.add-gallery,
.add-photo {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 20em;
  border-radius: 5px;
  transition: all 0.3s ease;
  text-decoration: none;
  transform: translateY(-50%);
  @media (max-width: 600px) {
    height:25em;
  }
  @media (max-width: 350px) {
    height:15em;
  }
}
.gallery-unit:hover,
.gallery-unit:focus {
  transform: translateY(-55%);
}
.add-gallery,.add-photo {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid #eee;
  background-color: #fff;
  h3 {
    text-transform: uppercase;
    color: #aaa;
    letter-spacing: 0.5px;
    font-size: 1.6rem;
    font-weight: 500;
    margin-top: 1em;
  }
  &:hover,
  &:focus {
    transform: translateY(-50%) scale(1.1);
  }
}

.gallery-unit img {
  width: 100%;
  flex: 1;
  overflow: hidden;
  border-top-right-radius:5px;
  border-top-left-radius:5px;
  display: block;
  object-fit: cover;
  height:100%;
}
.picture{
  border-radius:5px;
  width: 100%;
  flex: 1;
  overflow: hidden;
  border-top-right-radius:5px;
  border-top-left-radius:5px;
  display: block;
  object-fit: cover;
}
.placeholder{
  position:relative;
  z-index:10;
  top:50%;
}
.lightbox{
  width:100%;
  display:flex;
  justify-content: center;
  align-items: center;
}
.gallery{
  @media (max-width: 620px) {
   max-width:75%; 
  }

}

`;

export default GlobalStyle;
