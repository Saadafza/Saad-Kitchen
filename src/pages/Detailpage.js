import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Grid, Card, CardContent, Typography, TextField, Button } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Avatar } from 'antd';
const DetailPage = () => {
  const [product, setProduct] = useState({});
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [user, setUser] = useState("");
  const { id } = useParams();

  const navigator = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("ssid");
    if(token != null){
      const decodedToken = jwt_decode(token);
      if (decodedToken) {
        const userId = decodedToken.id;
        setUser(userId);
      }
    }else{
navigator("/login")
    }
  
  }, []);

  useEffect(() => {
    fetchProduct();
    fetchComments();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`https://backend-self-delta.vercel.app/api/getfoods/${id}`);
      setProduct(response.data.food);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(`https://backend-self-delta.vercel.app/api/getcomment/${id}`);
      setComments(response.data.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("https://backend-self-delta.vercel.app/api/comment", {
        comment: commentInput,
        users: user,
        deals: id
      });

      if (response.data.status === true) {
        fetchComments();
        setCommentInput("");
        console.log(response.data)
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleCommentChange = (event) => {
    setCommentInput(event.target.value);
  };

  console.log("product:", product);
  console.log("price:", product.price);

  return (
    <Container maxWidth="md">
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <img src={product?.url} alt="Product Image" style={{ width: "100%" }} />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h4">{product.title}</Typography>
              <Typography variant="body1">{product.description}</Typography>
              <Typography variant="body2">Price: {product.price ? `$${product.price.toFixed(2)}` : ""}</Typography>
              <Link to="/videoup" className="btn btn-warning">UPLOAD VIDEO</Link>

            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5">Add a Comment</Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Your Comment"
                  variant="outlined"
                  value={commentInput}
                  onChange={handleCommentChange}
                  fullWidth
                  required
                />
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          {comments.map((comment) => (
            <Card key={comment._id} variant="outlined">
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <Avatar src={"https://backend-self-delta.vercel.app/api/" +comment.user[0].url} alt="User" />
    
        <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
                 </Grid>
                  <Grid item>
                    <Typography variant="h6">{comment.user[0].name}</Typography>
                    <Typography variant="body1">{comment.comment}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default DetailPage;
