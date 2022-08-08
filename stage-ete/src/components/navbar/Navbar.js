import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  Title,
  InfoContainer,
  NavBtn,
  NavBtnLink,

} from './NavbarElement';

const Navbar = () => {
  return (
    <>
      <Nav>
        <InfoContainer>
           <Title> CLIENTS</Title>

        </InfoContainer>
        <Bars />
        <NavMenu>
          <NavLink to='/producteur' >
           Producteur
          </NavLink>
          <NavLink to='/moulin' >
             Moulin
          </NavLink>
          <NavLink to='/labo' >
             Laboratoire_controle
          </NavLink>
          <NavLink to='/stockage' >
            Unité_Stockage
          </NavLink>
          <NavLink to='/mise_bouteille' >
            Unité_Mise_Bouteille
          </NavLink>
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        <NavBtn>
          <NavBtnLink to='/login'>Logout</NavBtnLink>
        </NavBtn>
      
      </Nav>
    </>
  );
};

export default Navbar;