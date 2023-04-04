import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import VideoPlayer from '../../components/VideoPlayer';

const VideosStream = () => {
  const [videoId, setVideoId] = useState('sasha')
  
  function playVideo(e,videoId) {
    e.preventDefault();
    setVideoId(videoId);
  }

  return (
    <Wrapper>
    <article className="container">
        {videoId && <VideoPlayer videoId={videoId} />}
        <div className="btn-container">
          <p>play video</p>
          <button onClick={(e) => { playVideo(e, 'lukas') }}> 1</button>
          <button onClick={(e) => { playVideo(e, 'nf') }}> 2</button>
          <button onClick={(e) => { playVideo(e, 'sasha') }}> 3</button>
          <button onClick={(e) => { playVideo(e, 'james') }}> 4</button>
          <button onClick={(e) => { playVideo(e, 'shady45') }}> 5</button>
        </div>
      </article>
    </Wrapper>
  );
};

const Wrapper = styled.section`
min-height: 100vh;
  place-items: center;
  display: grid;
  margin:3rem auto;
.btn-container {
  display: flex;
  margin: 0 auto;
}
button {
  padding: .375rem .75rem;
  cursor: pointer;
  background: transparent;
  border: none;
  text-transform: capitalize;
  font-size: 1.3rem;
  transition: .3s all linear;
  letter-spacing: 1px;
  color: #28cab2;
  border-radius: 1rem;
}
button:hover {
  background: #28cab2;
  color: #fff;
}
`;


export default VideosStream