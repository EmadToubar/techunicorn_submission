import React, { useState } from 'react'
import Axios from 'axios'
import Episode from './Episode'
import { v4 as uuidv4 } from 'uuid'
import styled from 'styled-components'

const MainContainer = styled.div`
    width: 80vw;
    height: 100vh;
    min-width: 1000px;
    min-height: 600px;
    position: relative;
    margin: 100px auto;
    padding: 50px;
`

const UpperContainer = styled.div`
    text-align: center;
`

const Header = styled.h2`
    font-size: 90px;
    font-weight: 600;
    color: #fff;
    margin: 0;
`

const GetDataButton = styled.button`
    width: 200px;
    height: 50px;
    border: none;
    color: rgb(17, 17, 17);
    background-color: #fff;
    border-radius: 4px;
    box-shadow: inset 0 0 0 0 rgb(223, 221, 221);
    transition: ease-out 0.3s;
    outline: none;
    margin-top: 20px;

    &:hover {
        box-shadow: inset 300px 0 0 0 rgb(223, 221, 221);
        cursor: pointer;
        color: black;
    }
`


const MainPage = () => {

    const url = "https://api.sampleapis.com/futurama/episodes";
    const [episodesList, setepisodesList] = useState([])

    const getData = async () => {
        const result = await Axios.get(url);
        setepisodesList(result.data)
        console.log(result)
    }

    return(
        <MainContainer>
            <UpperContainer>
                <Header>Futurama</Header>
                <GetDataButton onClick={getData}>Load Episodes List</GetDataButton>
            </UpperContainer>
            
            <div className='episodesList'>
                {episodesList !== [] && episodesList.map(data => <Episode key={uuidv4()} data={data} />)}
            </div>
        </MainContainer>
    )
}

export default MainPage;