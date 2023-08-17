import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { Form, Input, Select, Button, Typography, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Option } = Select;

const VideoUploadPage = () => {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [description, setDescription] = useState('');
  const [videoLink, setVideoLink] = useState('');
const [selectedItemId ,setSelectedItemId]=useState(null)
const navigate = useNavigate();
  useEffect(() => {
    // Decode JWT token and get user ID
    const token = localStorage.getItem('ssid');
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.id;
    setUser(userId);

    // Fetch food items
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('https://backend-self-delta.vercel.app/api/food');
      setItems(response.data.food);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleFoodSelect = (value, itemId) => {
    setSelectedFood(value);
    setSelectedItemId(itemId); // Assuming you have a state variable for storing the item ID (selectedItemId)
  };
  
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleVideoLinkChange = (e) => {
    setVideoLink(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      if (!selectedFood || !description || !videoLink) {
        notification.error({
          message: 'Error',
          description: 'Please fill in all the fields and provide a video link.',
        });
        return;
      }

      // Send the video link to the backend API
      const response = await axios.post('https://backend-self-delta.vercel.app/api/upload-video', {
        users:user,
        title: selectedFood,
        description:description,
        url: videoLink,
        deals:selectedItemId,
      });

      // Display success notification
      notification.success({
        message: 'Video Uploaded',
        description: 'Your video link has been successfully uploaded!',
      
      });
      navigate("/");
      // Reset form fields and video link state
      setSelectedFood(null);
      setDescription('');
      setVideoLink('');
    } catch (error) {
      console.error(error);
      // Display error notification
      notification.error({
        message: 'Error',
        description: 'Error uploading video link. Please try again later.',
      });
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography.Title level={2}>Video Upload</Typography.Title>
      <marquee>Upload your video in Google Drive and provide the link here</marquee>
      <Form onFinish={handleSubmit}>
        <Form.Item label="Food Item" name="title" rules={[{ required: true, message: 'Please select a food item' }]}>
        <Select onChange={(value, option) => handleFoodSelect(value, option.key)} placeholder="Select a food item">
  {items.map((item) => (
    <Option key={item._id} value={item._id}>
      {item.title}
    </Option>
  ))}
</Select>

        </Form.Item>
        <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please enter a description' }]}>
          <Input.TextArea rows={4} onChange={handleDescriptionChange} value={description} />
        </Form.Item>
        <Form.Item label="Video URL" name="videoLink" rules={[{ required: true, message: 'Please provide the video link' }]}>
          <Input onChange={handleVideoLinkChange} value={videoLink} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Upload Video
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default VideoUploadPage;
