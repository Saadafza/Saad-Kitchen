import image1 from "../picture/chef1.705417f3cf231c71d1bd.png"
import image2 from "../picture/delivery.bf9130a0962fbe091abc.png"
import { useEffect, useState } from 'react';
import axios from 'axios';
import ButtonFunctionPage from "./ButtonFunctionsPage"
import New from "./New"
import { Link } from "react-router-dom";

function Home(props) {
  const [foods, setFoods] = useState([]);

 useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch food data
        const response = await axios.get("https://backend-self-delta.vercel.app/api/food");
        setFoods(response.data.data);
      } catch (error) {
        console.error("Error fetching food data:", error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []);
  return (
    <div>
      <div className=" container-fluid sec">
        <div className="row">

        <div className="col-md-5 mx-4 col hero">
  <div className="delivery mt-2">
    <div className="bike-delivery">
      <span>Bike Delivery</span>
      <div className="imagebike">
        <img src={image2} alt="Bike Delivery" />
      </div>
    </div>
  </div>
  <div className="title">
    <h1>The Fastest Food Delivery in <span>Accara</span></h1>
  </div>
  <p className="loerm">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus nam
    delectus sed, vel quaerat, libero nesciunt debitis, architecto repudiandae
    accusamus aut exercitationem nisi non doloribus! Temporibus officia
    architecto reiciendis blanditiis.
  </p>
  <Link to="/menu" className="btn btn-warning">Order Now</Link>
</div>

          <div className="col-md-1"></div>
          <div className="col-md-5 cass">

            {
              <div className="container">
                <div className="row ">

                  {foods.slice(0, 3).map((food) => (
                    <div className="col-md-4 mt-5" key={food.id}>
                      <div className="hee">
                        <img src={food.url} alt="card" />
                        <p className="text-center">{food.title}</p>
                        <p className="text-center des" >{food.description}</p>
                        <p className="text-center">{food.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {/* <div className="row justify-content-center">
                  {foods.slice(3, 4).map((food) => (
                    <div className="col-md-4" key={food.id}>
                      <div className="hee">
                        <img src={food.url} alt="Img" />
                        <p className="text-center">{food.title}</p>
                        <p className="text-center des" >{food.description}</p>
                        <p className="text-center">{food.price}</p>
                      </div>
                    </div>
                  ))}
                </div>  */}
                </div>
            }
          </div>
        </div>
   
        <div id="buy"> <New /></div>
        <ButtonFunctionPage addtocart={props.addtocart} />
        <div className="row">
          <div className="col-md-3">
            <div className="image-container">
              <img src={image1} alt="cont" className="shaking-image" />
            </div>
          </div>
          <div className="col-md-3">
            <div className="shaking-Text">
              <h2>Saad's Kitchen</h2>
            </div>

          </div>
        </div>
        <hr className="orange-hr "></hr><br></br>
<div className="row">
  <div className="col-md-12 text-center pb-3 hrling">
All Rights Reserved By Saad
  </div>
</div>

      </div>
 

      </div>
  )
}

export default Home
