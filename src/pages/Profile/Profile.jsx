import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux'
import { supabase } from '../../lib/supabase'
import { useDispatch } from 'react-redux';
import { logout } from '../redux/actions/user';
import { removeStorage } from '../../services/Auth'
import Layout from '../../components/layout/Layout';

const Profile = () => {
  const user = useSelector(state => state.auth.user.user)
  const dispatch = useDispatch();

  const [imageURL, setImageURL] = useState(null)

  useEffect(() => {
    async function getImage() {
      const { data } = await supabase.storage.from('react').download(user.photo)
      if (data) {
        const url = URL.createObjectURL(data)
        setImageURL(url)
      }
    }
    getImage()
  }, [user])

  const handleLogout = () => {
    dispatch(logout());
    removeStorage()
  };


  return (
    <Layout>
      <ProfileContainer>
        <ProfileImage src={imageURL} alt="Profile" />
        <ProfileInfo>
          <ProfileName>{user.name}</ProfileName>
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          <ProfileTitle>{user.email}</ProfileTitle>
          {
            user.foods && (
              <Infos>
                Preferências: {user.foods.map((dt, id) => (
                  <span key={id}>
                    {dt}
                    {id < user.foods.length - 1 && ", "}
                  </span>
                ))}
              </Infos>
            )
          }
        </ProfileInfo>
      </ProfileContainer>
    </Layout>
  );
};

const LogoutButton = styled.button`
  background-color: #22c55e;
  border: none;
  color: #bbf7d0;
  cursor: pointer;
  border-radius: 12px;
  width: 70px;
  height: 35px;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
  }
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    margin-right: 2rem;
    margin-bottom: 0;
  }

  @media (min-width: 1024px) {
    width: 200px;
    height: 200px;
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    align-items: flex-start;
  }
`;

const ProfileName = styled.h1`
  font-size: 2rem;
  margin: 0;

  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

const ProfileTitle = styled.h2`
  font-size: 1.5rem;
  margin: 0;
  font-weight: 400;

  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

const Infos = styled.p`
  font-size: 1.2rem;
  text-align: center;
  margin-top: 15px;

  @media (min-width: 768px) {
    text-align: left;
    font-size: 1.5rem;
  }
`;

export default Profile;
