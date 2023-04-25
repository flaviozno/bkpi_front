import React from 'react'
import Ellipse from '../../assets/Ellipse.png'
import styled from 'styled-components';
import Layout from '../../components/layout/Layout';

export default function Home() {
  return (
    <Layout>
      <Container >
        <Content >
          <Text>
            <h1 >
              BKPI agorá é delivety? Comida gostosa e saudável!
            </h1>
            <p>
              Apenas uma pagina teste com um conteudo bem genérico! It is a long established fact that a reader will
              be distracted by the readable content of
              a page when looking at..
            </p>
            <Button>Learn More</Button>
          </Text>
          <Image src={Ellipse} alt="Comida boa e barata!" />
        </Content>
      </Container>
    </Layout>

  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #bbf7d0;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
    max-width: 1000px;
  }
`;

const Text = styled.div`
  padding: 20px;
  text-align: center;
  h1{
    font-weight: bold;
    color: #2A770F;
    font-size: 42px;
    text-align: left;
  }
  p{
    text-align: justify;
    margin-top: 10px;
    color: #3A3A3A;
  }
  @media (min-width: 768px) {
    text-align: left;
    flex: 1;
  }
`;

const Image = styled.img`
  max-width: 100%;
  
  @media (min-width: 768px) {
    flex: 1;
  }

`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #22c55e;
  color: #FFFFFF;
  font-size: 1.2rem;
  border-radius: 5px;
  border: none;
  margin-top: 40px;
  transition: linear;
  cursor: pointer;

  :hover{
    background-color: #26d667
  }
`;
