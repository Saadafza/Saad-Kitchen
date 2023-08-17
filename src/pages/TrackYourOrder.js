import axios from "axios";
import jwt_decode from "jwt-decode";
import { useState, useEffect } from "react";

function TrackYourOrder() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("ssid");
    if (token) {
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.id;
      setUser(userId);
    }
  }, []);

  useEffect(() => {
    if (user) {
      axios.get(`https://backend-self-delta.vercel.app/api/ordersbyuser/${user}`)
        .then((res) => {
          console.log(res.data);
          setOrders(res.data.orders);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [user]);

  return (
    <>
    <div className="container">
       <h1 className="text-center">YOUR ORDERS </h1>
  
       {orders.map((order) => (
  <div className="card mb-3" key={order._id}>
    <div className="row g-0">
      <div className="col-md-4">
        <img src={order.deals.url} className="img-fluid rounded-start" alt="..." />
      </div>
      <div className="col-md-8">
        <div className="card-body">
          <h5 className="card-title">{order.deals.title}</h5>
          <p className="card-text">PRICE: {order.price}</p>
          <p className="card-text">QUANTITY: {order.quantity}</p>
        
            <p className="card-text">STATUS: {order.status}</p>
        
          <p className="card-text">{order.deals.description}</p>
          <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
        </div>
      </div>
    </div>
  </div>
))}


        </div>
    </>
  );
}

export default TrackYourOrder;
