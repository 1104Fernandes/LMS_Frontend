import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import "../styles.css";
import Image from 'react-bootstrap/Image'


const Jumbotrons: React.FC = () => {    
  return(
  <Jumbotron bsPrefix="custom-jumbotron" fluid>         
    <Image src={"./hacking1.png"} alt="hacking" fluid />    
  </Jumbotron>);
};

export default Jumbotrons;
