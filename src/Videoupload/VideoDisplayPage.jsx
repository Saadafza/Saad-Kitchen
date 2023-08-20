import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Spinner from 'react-bootstrap/Spinner'; // Import Bootstrap Spinner component

const VideoContainer = styled.div`
  position: relative;
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
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  font-size: 14px;
  cursor: pointer;
`;

const LoaderContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const VideoDisplayPage = () => {
  const [videos, setVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [loading, setLoading] = useState(true); // State for loader

  useEffect(() => {
    axios.get('https://backend-self-delta.vercel.app/api/videos').then((response) => {
      setVideos(response.data.videos);
      setLoading(false); // Hide loader once videos are loaded
    });
  }, []);

  const handleNextVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      handleNextVideo();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentVideoIndex]);

  return (
    <div>
      <h1>Video Display Page</h1>
      <VideoContainer>
        {loading && ( // Display loader if loading is true
          <LoaderContainer>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </LoaderContainer>
        )}
        <BackgroundVideo
          src={videos[currentVideoIndex]?.url}
          width="500"
          height="300"
          controls
          autoPlay
          onCanPlay={() => setLoading(false)} // Hide loader when video can play
        ></BackgroundVideo>
        <NextButton onClick={handleNextVideo}>Next Video</NextButton>
      </VideoContainer>
    </div>
  );
};

export default VideoDisplayPage;
