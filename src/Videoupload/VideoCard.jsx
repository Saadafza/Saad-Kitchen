import React from 'react';
import styled from 'styled-components';

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

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const UserImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const UserName = styled.span`
  font-size: 14px;
`;

const VideoCard = ({ video }) => {
  return (
    <CardContainer>
      <video src={video.url} controls width="320" height="240" />

      <VideoDescription>{video.description}</VideoDescription>

      
    </CardContainer>
  );
};

export default VideoCard;
