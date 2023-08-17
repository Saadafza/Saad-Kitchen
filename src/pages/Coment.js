import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
function ProductDetail({ product, userId }) {
  const [comment, setComment] = useState('');
  const [foods, setFoods] = useState('');

    const params =useParams()
    const id = params.id
useEffect(()=>{
    axios.get("https://backend-self-delta.vercel.app/api/getfoods/"+id).then((res) => {
        console.log(res.data);
        setFoods(res.data.food);
      });
    
},[])



  const handleCommentSubmit = async () => {
    const token = localStorage.getItem('token'); // Retrieve the JWT token from local storage

    try {
      const response = await axios.post(
        '/api/comments',
        {
          comment: comment,
          userId: userId,
          productId: product._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          },
        }
      );
      console.log(response.data); // Handle the response as needed
    } catch (error) {
      console.error(error);
    }
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  return (
    <div>
      <h2>Product Detail</h2>
      {/* Display the product details */}
      <p>{product.name}</p>
      <p>{product.description}</p>

      {/* Comment form */}
      <form onSubmit={handleCommentSubmit}>
        <textarea value={comment} onChange={handleCommentChange} />
        <button type="submit">Submit Comment</button>
      </form>
    </div>
  );
}

export default ProductDetail;
