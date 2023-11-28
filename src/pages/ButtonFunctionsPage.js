import image1 from "../picture/turkey.png"
import image2 from "../picture/soft-drink.png"
import image3 from "../picture/ice-cream.png"
import image4 from "../picture/cake.png"
import image5 from "../picture/fish.png"
import image6 from "../picture/wheat.png"
import image7 from "../picture/harvest.png"
import image8 from "../picture/curry.png"
import image9 from "../picture/cutlery.png"
import image10 from "../picture/not fond.png"
import image11 from "../picture/add-to-cart.png"
import dislikeimg from "../picture/heart.png"
import likeimg from "../picture/heart (1).png"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom"
import jwt_decode from 'jwt-decode';
import { getToken } from "./Functions";
import { Rate } from "antd"

const ButtonFunctionsPage = (props) => {
  const [activeButton, setActiveButton] = useState(0);
  const [foods, setFoods] = useState([]);
  const [likes, setLikes] = useState([]);

  const [users, setUsers] = useState("");
  const token = getToken();

 
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    // Fetch food data
    axios.get("https://backend-self-delta.vercel.app/api/food")
      .then((res) => {
        setFoods(res.data.food);
      })
      .catch((error) => {
        console.error("Error fetching food data:", error);
      });
  }, []);
  console.log(foods)
  useEffect(() => {
    // Check for token and decode it
    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        if (decodedToken) {
          setUsers(decodedToken.id);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [token]);
  
  useEffect(() => {
    fetchLikeCounts();
  }, [foods]);
  
  const fetchLikeCounts = async () => {
    try {
      const promises = foods.map((food) => {
        return axios.get(`https://backend-self-delta.vercel.app/api/likelength/${food._id}`);
      });
  
      const responses = await Promise.all(promises);
  
      const updatedLikes = responses.map((response, index) => ({
        _id: foods[index]._id,
        likeCount: response.data.likeCount,
      }));
  
      setLikes(updatedLikes);
    } catch (error) {
      console.error("Error fetching like data:", error);
    }
  };
  
  


  const handleButtonClick = async (buttonIndex) => {
    setActiveButton(buttonIndex);
    buttonFunctions[buttonIndex]();
  };

  const buttonFunctions = [
    () => {
      console.log("Button 1 clicked");
      axios.get("https://backend-self-delta.vercel.app/api/food").then((res) => {
        console.log(res.data);
        setFoods(res.data.food);
      });
    },
    () => {
      console.log("Button 2 clicked");
      axios.get("https://backend-self-delta.vercel.app/api/all/Chicken").then((res) => {
        console.log(res.data);
        setFoods(res.data.food);
      });
    },
    () => {
      console.log("Button 3 clicked");
      axios.get("https://backend-self-delta.vercel.app/api/all/Drinks").then((res) => {
        console.log(res.data);
        setFoods(res.data.food);
      });
    },
    () => {
      console.log("Button 4  clicked");
      axios.get("https://backend-self-delta.vercel.app/api/all/Ice-Cream").then((res) => {
        console.log(res.data);
        setFoods(res.data.food);
      });
    },
    () => {
      console.log("Button 5 clicked");
      axios.get("https://backend-self-delta.vercel.app/api/all/Deserts").then((res) => {
        console.log(res.data);
        setFoods(res.data.food);
      });
    },
    () => {
      console.log("Button 6 clicked");
      axios.get("https://backend-self-delta.vercel.app/api/all/Fish").then((res) => {
        console.log(res.data);
        setFoods(res.data.food);
      });
    },
    () => {
      console.log("Button 7 clicked");
      axios.get("https://backend-self-delta.vercel.app/api/all/Rice").then((res) => {
        console.log(res.data);
        setFoods(res.data.food);
      });
    },
    () => {
      console.log("Button 8 clicked");
      axios.get("https://backend-self-delta.vercel.app/api/all/Curry").then((res) => {
        console.log(res.data);
        setFoods(res.data.food);
      });
    },
    () => {
      console.log("Button 9 clicked");
      axios.get("https://backend-self-delta.vercel.app/api/all/Fruits").then((res) => {
        console.log(res.data);
        setFoods(res.data.food);
      });
    }
   
  ];

  const buttonData = [
    { id: 1, label: 'Menu', image: image9 },
    { id: 2, label: 'Chicken', image: image1 },
    { id: 3, label: 'Drinks', image: image2 },
    { id: 4, label: 'Ice-cream', image: image3 },
    { id: 5, label: 'Deserts', image: image4 },
    { id: 6, label: 'Fish', image: image5 },
    { id: 7, label: 'Rice', image: image6 },
    { id: 8, label: 'curry', image: image8 },
    { id: 9, label: 'Fruits', image: image7 },
  ];

 
  const handleLikeDislike = async (productId) => {
    // Check if a request is already in progress
    if (isUpdating) {
      return;
    }
  
    setIsUpdating(true); // Set a flag to indicate that an update is in progress
  
    try {
      const config = {
        headers: {
          Authorization: token,
        },
      };
  
      // Toggle liked status immediately in the UI
      const updatedFoods = foods.map((food) =>
        food._id === productId
          ? {
              ...food,
              liked: !food.liked,
            }
          : food
      );
      setFoods(updatedFoods);
  
      // Send request to the server
      await axios.post(`https://backend-self-delta.vercel.app/api/like/${productId}`, { users: users }, config);
  
      // Update the likes count
      const updatedLikes = likes.map((like) =>
        like._id === productId
          ? {
              ...like,
              liked: !like.liked,
            }
          : like
      );
      setLikes(updatedLikes);
    } catch (error) {
      console.error("Error liking/disliking:", error);
      // Revert UI state if request fails
      setFoods(foods.map((food) => (food._id === productId ? { ...food, liked: !food.liked } : food)));
    } finally {
      setIsUpdating(false); // Reset the flag after the update process
    }
  };
  
  
  
  

  const handleRatingChange = async (productId, ratingValue) => {
    try {
      const config = {
        headers: {
          Authorization: token,
        },
      };
  
      const response = await axios.post(
        `https://backend-self-delta.vercel.app/api/rate/${productId}`,
        { users: users, ratingValue: ratingValue },
        config
      );
  
      if (response.status === 200) {
        const updatedFoods = foods.map((food) =>
          food._id === productId ? { ...food, averageRating: ratingValue } : food
        );
        setFoods(updatedFoods);
      } else {
        console.log("Failed to rate:", response.data);
      }
    } catch (error) {
      console.error("Error rating:", error);
    }
  };
  
  
  let card;

  if (foods.length < 0) {
    card = (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    )
  } else if (foods.length === 0) {
    card = (
      <div className=" container">
        <div className="row">
          <div className="col-md-4">
          </div>
          <div className="col-md-4">
            <img className="not-found" alt="button-function" src={image10} />
            <p className="justify-content-center">No Food Items Available</p>
          </div>

        </div>
      </div>
    )
  } else {
    card = (

<div className="row my-5" style={{ backgroundColor: "#D3CFD5" ,marginLeft:"40px",marginRight:"40px" ,borderRadius:"10px" }}>
{foods.map((food) => (
  <div className="col-md-3 my-4" key={food.id}>
    <div className="card h-100 shadow-sm" style={{ borderRadius: "10px" }}>
    <div className="img-container position-relative">
            <img src={food.url} className="card-img-top img-fluid" alt="food" />
            <div className="btn-add-to-cart position-absolute top-0 end-0">
              <img src={image11} alt="cart" className="img-fluid" onClick={() => props.addtocart(food)} />
            </div>
          </div>
          <div className="card-body"><button
  style={{ border: "none", backgroundColor: "inherit", float: "right" }}
  className={`like-button ${food.liked ? 'liked' : ''}`}
  onClick={() => handleLikeDislike(food._id)}
>
  <img
    src={food.liked ? likeimg : dislikeimg}
    alt={food.liked ? "Liked" : "Disliked"}
  />{" "}
  ({likes.find((like) => like._id === food._id)?.likeCount || 0})
</button>

            <h5 className="card-title">{food.title}</h5>
            <p className="card-subtitle mb-2">{food.description}</p>
            <p className="card-price mb-0">$ {food.price}   </p>
            <Rate
          className="rating"
          allowHalf
          defaultValue={food.averageRating}
          onChange={(ratingValue) => handleRatingChange(food._id, ratingValue)}
        />{food.averageRating}
          </div>
      <div className="card-footer bg-white border-0">
     
        
        <Link
          type="button"
          to={`/detailpage/${food._id}`}
          className="btn btn-danger btn-sm w-100"
        >
          Detail
        </Link>
      </div>
    </div>
  </div>
))}

  </div>


    );
  }
  return (
    <>
   

   <div className="row justify-content-center buttonsmenu">
  <div className="lineunder">
    Our Hot Dishes
    <hr />
  </div>
  <div className="col-md-11 menuhub">
  {buttonData.map((button, index) => (
    <div className="menuhub mt-5" key={button.id}>
      <button
        className={`button ${activeButton === index ? 'active' : ''}`}
        onClick={() => handleButtonClick(index)}
      >
        <div className={`icon-container ${activeButton === index ? 'active' : ''}`}>
          <div className="icon">
            <img src={button.image} alt={button.label} />
          </div>
        </div>
        <div className="label">{button.label}</div>
      </button>
    </div>
  ))}
</div>
</div>



    {card}
  

 </>
  );
};

export default ButtonFunctionsPage;






