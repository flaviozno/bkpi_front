import React from 'react'
import Header from '../header/Header'
import styled from 'styled-components'

export default function Layout(props) {
    const { children, ...rest } = props;
    return (
        <BaseLayoutContainer>
            < Header />
            <ContentContainer>
                <ContentSection {...rest}>
                    {children}
                </ContentSection>
            </ContentContainer>
        </BaseLayoutContainer>
    )
}

const ContentContainer = styled.main`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #bbf7d0;
  padding: 30px;
  @media (max-width: 768px) {
    padding: 50px 30px;
  }
`

const BaseLayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`

const ContentSection = styled.section`
  display: flex;
  flex-flow: column nowrap;
`