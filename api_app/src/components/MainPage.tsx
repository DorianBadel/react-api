import React from 'react'

function MainPage({
  name
}:{name:string}) {
  return (
    <>
      <h1>Welcome </h1>
      <h1>{name}</h1>
    </>
  )
}

export default MainPage
