import React from 'react'
import "./client.css";
import Navbar from "../../../components/navbar/Navbar";
import styled from "styled-components";





const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
 
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;

`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;

`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;







const Client = () => {
  return (
    <Container>
      <Navbar />
      
      <Wrapper>
        <ImgContainer>
          <Image src="https://www.cosmetiquesnaturels.ch/1000-large_default/olive-vierge-extra-huile-cosmetique.jpg" />
        </ImgContainer>
        <InfoContainer>
          <Title>Huile d'olive</Title>
          <Desc>
             Notre huile d'olive tunisienne est fameuse pour son parfum unique, son gout inimitable
             sa belle robe dorée et un savoir-faire ancestral.Elle est 100 % extra vierge 
             est extraite des olives de Tunisie est sans cholestérol.
          </Desc>
       
        </InfoContainer>
      
      </Wrapper>
      
    </Container>
  );
};

export default Client;
