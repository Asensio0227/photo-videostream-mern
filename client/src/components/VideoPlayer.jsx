import React,{useRef,useEffect} from 'react'
import styled from 'styled-components';

const VideoPlayer = ({ videoId }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.removeAttribute('src');
      videoRef.current.load();
    }
  })

  return (
    <Wrapper ref={videoRef}
        controls
        autoPlay
      >
        <source src={`http://localhost:5000/videos/${videoId}`} type="video/mp4" />
        Your browser does not support the video tag 
      </Wrapper>
  )
}

const Wrapper = styled.video`
video {
  width:90vw;
  margin: 0 3rem;
}
`;

export default VideoPlayer