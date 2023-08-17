import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { getToken } from '../pages/Functions';
import { Card, Table, Space, Button, } from 'antd';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function SellerCenter() {
  const token = getToken();
  const [userId, setUserId] = useState('');

  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);
const [ totalPriceEarned,setTotalPriceEarned]=useState(0)
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const decodedToken = jwt_decode(token);
      if (decodedToken) {
        setUserId(decodedToken.id);
        setRole(decodedToken.role);
      }
    }
  }, [token]);

  useEffect(() => {
    fetchItems();
    fetchOrders();
   

  }, [userId]); // Fetch items and orders whenever the userId changes

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://backend-self-delta.vercel.app/api/allfood/${userId}`);
      setItems(response.data.food);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching items:', error);
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://backend-self-delta.vercel.app/api/allorders/${userId}`);
      setOrders(response.data.orders);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };

  const deleteItem = async (itemId) => {
    try {
      await axios.delete(`https://backend-self-delta.vercel.app/api/delete/${itemId}`);
      fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const updateItem = (item) => {
    const itemId = item?._id;
    if (itemId) {
      navigate(`/update/${itemId}`);
    } else {
      console.error("Item object is null or does not have an _id property.");
      // Handle the error or show an appropriate message to the user.
    }
  };
  const calculateTotalQuantitySold = () => {
    const totalSoldMap = new Map();
  
    // Initialize a map to store the total price for each item
    const totalPriceMap = new Map();
  
    orders.forEach((order) => {
      const itemId = order.deals?._id; // Use optional chaining to access `_id`
      const quantity = Number(order.quantity);
      const price = Number(order.price);
  
      if (totalSoldMap.has(itemId)) {
        totalSoldMap.set(itemId, totalSoldMap.get(itemId) + quantity);
        totalPriceMap.set(itemId, totalPriceMap.get(itemId) + quantity * price); // Calculate and store the total price for the item
      } else {
        totalSoldMap.set(itemId, quantity);
        totalPriceMap.set(itemId, quantity * price); // Calculate and store the total price for the item
      }
    });
  
    return Array.from(totalSoldMap, ([itemId, totalQuantitySold]) => ({
      key: itemId,
      totalQuantitySold: totalQuantitySold,
      totalPrice: totalPriceMap.get(itemId), // Get the total price for the item from the map
    }));
  };
useEffect(()=>{
  const total = orders.reduce((acc, order) => acc + parseFloat(order.price), 0);
  setTotalPriceEarned(total.toFixed(2));
},[])
 

  const itemColumns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: 'id',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Image',
      dataIndex: 'url',
      key: 'image',
      render: (url) => <img src={url} alt="Item" style={{ width: 50, height: 50 }} />,
    },
    {
      title: 'Total Quantity Sold',
      dataIndex: '_id',
      key: 'totalQuantitySoldColumn', // Use a unique key here
      render: (itemId) => {
        const totalQuantitySold = calculateTotalQuantitySold().find((soldItem) => soldItem.key === itemId)?.totalQuantitySold || 0;
        return totalQuantitySold;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, item) => (
        <Space>
          <Button type="primary" onClick={() => updateItem(item)}>
            Update
          </Button>
          <Button type="danger" onClick={() => deleteItem(item._id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const orderColumns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: 'id',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: '$ Price',
      dataIndex: 'price',
      key: 'Price',

    },
    
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Image',
      dataIndex: 'deals',
      key: 'image',
      render: (deals) => <img src={deals.url} alt="Item" style={{ width: 50, height: 50 }} />,
    },
  ];
  if (role === 'Seller') {
    return (
      <>
     <h2 style={{ marginBottom: '20px' }}>Admin Panel</h2>
        <Card style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', color: '#000' }}>Total Price Earned</div>
            <div style={{ fontSize: '36px', color: '#000', fontWeight: 'bold' }}>{totalPriceEarned} USD</div>
          </div>
       
          
          </div>
          <h3 className='text-center'>Add Food</h3>
          <Link to="/create" className='btn btn-warning mb-3'> Create</Link>
        </Card>
      <Card title="Items" style={{ marginBottom: '20px' }}>
        {loading ? <div>Loading...</div> : <Table dataSource={items} columns={itemColumns} />}
      </Card>
      <Card title="Orders" style={{ marginBottom: '20px' }}>
        {loading ? <div>Loading...</div> : <Table dataSource={orders} columns={orderColumns} />}
      </Card>
    </>
  );
}else {
  return (
    <div>
    <h1>404 Not Found</h1>  
    </div>
  );
}
}

export default SellerCenter;






