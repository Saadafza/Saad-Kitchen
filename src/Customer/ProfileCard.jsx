import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Avatar, Button, Grid } from '@mui/material';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import CountUp from 'react-countup';
import { Link } from 'react-router-dom';
import { Input } from 'antd';
import mail from '../picture/gmail-old-svgrepo-com.svg';
import Twitter from '../picture/twitter-svgrepo-com.svg';
import Facebook from '../picture/facebook-color-svgrepo-com.svg';
import Instagram from '../picture/instagram-1-svgrepo-com.svg';

const Profilecard = () => {
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);
  const [comments, setComments] = useState([]);
  const [orderDeliveredCount, setOrderDeliveredCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('ssid'); // Assuming you store the token in localStorage

    if (token) {
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.id;

      axios.get(`https://backend-self-delta.vercel.app/api/user/${userId}`).then((res) => {
        setUser(res.data.user);
      });

      axios.get(`https://backend-self-delta.vercel.app/api/ordersbyuser/${userId}`).then((res) => {
        setOrders(res.data.orders);
      });

      axios.get(`https://backend-self-delta.vercel.app/api/getcommentbyuser/${userId}`).then((res) => {
        setComments(res.data.comments);
      });
    }
  }, []);

  const totalDeliveredPrice = orders.reduce((total, order) => {
    if (order.status === 'Delivered') {
      return total + parseFloat(order.price);
    }
    return total;
  }, 0);

  const totalPendingPrice = orders.reduce((total, order) => {
    if (order.status === 'pending') {
      return total + parseFloat(order.price);
    }
    return total;
  }, 0);

  const now = new Date();
  const hour = now.getHours();
  let greeting;
  if (hour >= 5 && hour < 12) {
    greeting = 'Good Morning';
  } else if (hour >= 12 && hour < 18) {
    greeting = 'Good Afternoon';
  } else {
    greeting = 'Good Evening';
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <Typography variant="h2">
          <Typography variant="h5">Personal Info</Typography>
        </Typography>
        <Card>
          <CardContent>
            <Typography variant="h5">{user.name}</Typography>
            <img src={mail} className="svgm" alt="user" />
            <Input value={user.email} disabled />

            <img src={Instagram} className="svgm" alt="user" />
            <Input value={user.instagram} disabled />

            <img src={Facebook} className="svgm" alt="user" />
            <Input value={user.facebook} disabled />

            <img src={Twitter} className="svgm" alt="user" />
            <Input value={user.Twitter} disabled />

            <Typography variant="h5">About You</Typography>
            <Typography variant="h6">{user.about}</Typography>
            <Link to="/trackorder">
              <Button variant="contained">Track Your Orders</Button>
            </Link>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={4}>
        <div>
          <Typography variant="h2">
            {greeting}, <Typography className="username" variant="h2">{user.name}!</Typography>
          </Typography>
          <img className="profile-img" src={user.url} alt={user.name} />
          <Typography variant="h4">
            {user.name}. Our beloved customer!
          </Typography>
        </div>
      </Grid>
      <Grid item xs={4}>
        <div>
          <Typography variant="h5">Recent Activity</Typography>
          {comments.map((comment) => (
            <Card key={comment._id} className="mt-2">
              <CardContent>
                <Avatar src={comment.user.url} alt={user.name} /> Commented by You at: {comment.deal.title}
                <Typography variant="body1">{comment.comment}</Typography>
                <Typography variant="caption">Date: {comment.createdAt}</Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </Grid>

      <Grid item xs={12}>
        <h4 className="text-center">Order Statistics</h4>
        <div className="container bg-danger">
          <div className="row">
            <div className="col-md-4 text-center">
              <h4> Orders Delivered</h4>
              <CountUp start={0} end={orderDeliveredCount} duration={2} />
            </div>
            <div className="col-md-4 text-center">
              <h4> Pending Orders</h4>
              <CountUp start={0} end={orders.length} duration={2} />
            </div>
            <div className="col-md-4 text-center">
              <h4> Pending Price</h4>
              <CountUp start={0} end={totalPendingPrice} duration={2} />
            </div>
          </div>
        </div>
      </Grid>

      <Grid item xs={12}>
        <div>
          <h4 className="text-center">Order Tracking</h4>
          <div className="row my-5" style={{ backgroundColor: '#D3CFD5', marginLeft: '40px', marginRight: '40px', borderRadius: '10px' }}>
            {orders.map((food) => (
              <div className="col-md-3 my-4" key={food.id}>
                <div className="card h-100 shadow-sm" style={{ borderRadius: '10px' }}>
                  <div className="img-container position-relative">
                    <img src={food.deals?.url} className="card-img-top img-fluid" alt="food" />
                    <div className="btn-add-to-cart position-absolute top-0 end-0"></div>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{food.deals?.title}</h5>
                    <p className="card-price mb-0">$ {food.price}</p>
                    <p className=" mb-0">Quantity: {food.quantity}</p>
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
        </div>
      </Grid>
    </Grid>
  );
};

export default Profilecard;
