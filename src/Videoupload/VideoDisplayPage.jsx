import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const VideoBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1; /* Ensure the video is behind other content */
  overflow: hidden; /* Hide overflow for video element */
`;

const BackgroundVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin: 10px;
`;

const VideoTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;
`;

const VideoDescription = styled.p`
  font-size: 14px;
`;



const VideoDisplayPage = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Fetch video data from your API
    axios.get('https://backend-self-delta.vercel.app/api/videos').then((response) => {
      setVideos(response.data.videos);
    });
  }, []);

  return (
    <div>
   
    
      <h1>Video Display Page</h1>
      <div>
        {videos.map((video) => (
          <CardContainer key={video._id}>
         
            <iframe src={video.url} width="300" height="500" allow="autoplay"></iframe>
            <VideoDescription>{video.description}</VideoDescription>
           
          </CardContainer>
        ))}
      </div>
    </div>
  );
};

export default VideoDisplayPage;
