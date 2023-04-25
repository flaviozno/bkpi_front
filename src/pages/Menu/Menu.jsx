import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Card from '../../components/Card/Card'
import styled from 'styled-components';
import Layout from '../../components/layout/Layout';
import { useSelector } from 'react-redux';


export default function Menu() {

    const data = useSelector(state =>  state.foods.food)

    return (
        <Layout>
            <Container>
                <Content>
                    {
                        data && data.map((dt, id) =>
                            <Card data={dt} key={id} />
                        )
                    }
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
  align-items:center;
  flex-wrap: wrap;
  justify-content: center;
  @media (min-width: 768px) {
    flex-direction: row;
    max-width: 1000px;
  }
`;
