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
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom"


const ButtonFunctionsPage = (props) => {
  const [activeButton, setActiveButton] = useState(0);
  const [foods, setFoods] = useState([]);



  useEffect(()=>{
    axios.get("https://backend-self-delta.vercel.app/api/food").then((res) => {
      console.log(res.data);
      setFoods(res.data.food);

    });
  },[])
  console.log(foods)
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
      axios.get("https://backend-self-delta.vercel.app/api/all/Chicken").then((res) => {
        console.log(res.data);
        setFoods(res.data.food);
      });
    },
    () => {
      console.log("Button 6 clicked");
      axios.get("https://backend-self-delta.vercel.app/api/all/Deserts").then((res) => {
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
        <div className="card h-100 shadow-sm" style={{borderRadius:"10px"}}>
          <div className="img-container position-relative">
            <img src={food.url} className="card-img-top img-fluid" alt="food" />
            <div className="btn-add-to-cart position-absolute top-0 end-0">
              <img src={image11} alt="cart" className="img-fluid" onClick={() => props.addtocart(food)} />
            </div>
          </div>
          <div className="card-body">
            <h5 className="card-title">{food.title}</h5>
            <p className="card-subtitle mb-2">{food.description}</p>
            <p className="card-price mb-0">$ {food.price}</p>
          </div>
          <div className="card-footer bg-white border-0">
            <Link type="button" to={`/detailpage/${food._id}`} className="btn btn-danger btn-sm w-100">
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
  {buttonData.map((button, index) => (
    <div className="col-md-1 col-sm-8 mt-5" key={button.id}>
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




    {card}
  

 </>
  );
};

export default ButtonFunctionsPage;






