import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import moment from 'moment';
import 'moment/locale/pt-br';
import { AiFillCheckCircle, AiOutlineCheckCircle } from 'react-icons/ai';
import api from '../../services/Api'

export default function Card(data) {

    const email = useSelector(state => state.auth.user?.user.email)

    const [isCehck, setIsCheck] = useState(false);


    const handleClick = async () => {
        setIsCheck(!isCehck)
        const response = await api.checkFood(data.data, email)
    }



    return (
        <Conteiner
            onClick={() => {
                handleClick()
            }}
        >
            <Content>
                < FavoriteIcon>
                    {isCehck ? < AiFillCheckCircle /> : < AiOutlineCheckCircle />}
                </FavoriteIcon>

                <Image src={data.data.url_image} />
                <Tilte>
                    <strong>Prato: </strong>{data.data.name}
                </Tilte>
                <Info>
                    <strong>R$: </strong>{data.data.price}
                </Info>
                <Info>
                    <strong>Válido até: </strong>{moment(data.data.created_at).locale('pt-br').format('DD/MM/YYYY')}
                </Info>
            </Content>
        </Conteiner>
    )
}

const Conteiner = styled.main`
    cursor: pointer;
    margin: 10px;
    display: flex;
    flex-direction: column;
    width: 200px;
    height: 260px;
    background-color: #22C55E;
    border-radius: 25px;
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    flex-wrap: nowrap;
    align-items: left;
    justify-content: center;
    text-align: left;

`
const Image = styled.img`
    border-radius: 15px;
    height: 140px;
    width: 180px;
`
const Tilte = styled.h1`
    color: #BBF7B7;
    margin-top: 16px;
`
const Info = styled.span`
    color: #BBF7B7;
`

const FavoriteIcon = styled.span`
    display: flex;
    top: 10px;
    right: 10px;
    cursor: pointer;
    font-size: 16px;
    background-color: transparent;
    border:none;
    color: white;
    margin-bottom: 5px;
`