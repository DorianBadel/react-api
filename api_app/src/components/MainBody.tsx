import React from 'react'
import Navigation from '../components/navigation/Navigation';

function MainBody(props:any) {
  return (
    <>
      <Navigation/>
      {props.children}
    </>
      
  )
}

export default MainBody