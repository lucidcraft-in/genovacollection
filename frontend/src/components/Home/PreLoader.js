import React, { useEffect, useState } from 'react';
 

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

 function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}


const PreLoader = () => {
  const { height, width } = useWindowDimensions();
  
 

    
  return (
    <div
      className=" container-video     align-self-center bg-color  "
      style={{ backgroundColor: '#3b283f' }}
    >
      <video
        className="video"
        autoPlay
        playsInline
        muted
        width={width}
        height={height}
        src={`${process.env.PUBLIC_URL}/genova_title.mp4`}
      />
    </div>
  );
}

export default PreLoader;
