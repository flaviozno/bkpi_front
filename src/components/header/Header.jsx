import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { supabase } from '../../lib/supabase'

const Header = () => {
  const history = useHistory();

  const user = useSelector(state => state.auth.user?.user)

  const [imageURL, setImageURL] = useState(null)

  useEffect(() => {
    async function getImage() {
      const { data } = await supabase.storage.from('react').download(user?.photo)
      if (data) {
        const url = URL.createObjectURL(data)
        setImageURL(url)
      }
    }
    getImage()
  }, [user])

  const hanldeClick = () => {
    history.push('/profile')
  }
  return (
    <HeaderContainer>
      <Logo>BKPI</Logo>
      <Nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/menu">Menu</NavLink>
      </Nav>
      <Avatar src={imageURL} alt="Profile avatar" onClick={() => hanldeClick()} />
    </HeaderContainer>
  );
};

export default Header;



const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color:#22c55e;
  color: #fff;
  height: 80px;

`;

const Logo = styled.h1`
  font-size: 62px;
  font-weight: 600;
  :hover{
    cursor: pointer;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;

const Nav = styled.nav`
  display: flex;
`;

const NavLink = styled(Link)`
  margin-right: 2rem;
  font-size: 24px;
  color: #fff;
  text-decoration: none;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: #bbf7d0;
    border-bottom: 1px solid #bbf7d0; 
  }

  @media (max-width: 768px) {
    margin-right: 1rem;
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
    text-align: center;
    width: 100%;

    &:hover {
      border-bottom: none;
    }
  }
`;
const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;

  :hover{
    cursor: pointer;
  }
`;
