import React from 'react';
import './whatsApp.css';

const PreLoader = () => {
     
    
  return (
    <div
      className=" container-video embed-responsive embed-responsive-16by9 align-self-center bg-color"
      style={{ backgroundColor: '#3b283f' }}
    >
          <video
              className='video'
        autoPlay
        playsInline
        muted
        src={`${process.env.PUBLIC_URL}/genova_title.mp4`}
      />
    </div>
  );
}

export default PreLoader;
