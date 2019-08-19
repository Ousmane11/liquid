import React from 'react'

const Video = () => {

  return (
    <div className='video-header'>

      <video loop muted autoPlay poster='./liquid-poster.png' className="vid">
        <source src={require('../slowmotion-liquid.mp4')} type='video/mp4' />
        <source src={require('../slowmotion-liquid.webm')} type='video/webm' />
      </video>
    </div>
  )
}

export default Video