import React, { useState } from 'react'
import ReactPlayer from 'react-player'
import styled from 'styled-components'
import Popup from './Popup'

const Seperator = styled.div`
   border: 1px solid;
   
`

const Episode = ({data}) => {
  const {title, number, desc, originalAirDate, writers}=data
  const [show, setShow]= useState(false)
  const [buttonPopup, setButtonPopup]=useState(false);
    return (
      <Seperator>
    <div className='data'>
        <h2 >{title}</h2>
        <h3>Original Air Date: {originalAirDate}</h3>
        <h4>{desc}</h4>
        <button onClick={() => setButtonPopup(true)} >
        Trailer
          </button>
        
        <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <ReactPlayer url="https://youtu.be/ScMzIvxBSi4" controls={true}/>
          
        </Popup>
        </div>
        </Seperator>
  )
}

export default Episode