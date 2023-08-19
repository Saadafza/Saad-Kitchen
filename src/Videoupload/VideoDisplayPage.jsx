import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const VideoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin: 10px;
`;

const BackgroundVideo = styled.video`
  width: 100%;
  max-width: 500px;
`;

const NextButton = styled.button`
  margin-top: 10px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  font-size: 14px;
  cursor: pointer;
`;

const VideoDisplayPage = () => {
  const [videos, setVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    axios.get('https://backend-self-delta.vercel.app/api/videos').then((response) => {
      setVideos(response.data.videos);
    });
  }, []);

  const handleNextVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  return (
    <div>
      <h1>Video Display Page</h1>
      <VideoContainer>
        <BackgroundVideo
          src={videos[currentVideoIndex]?.url}
          width="500"
          height="300"
          muted
          autoPlay
        ></BackgroundVideo>
        <NextButton onClick={handleNextVideo}>Next Video</NextButton>
      </VideoContainer>
    </div>
  );
};

export default VideoDisplayPage;
