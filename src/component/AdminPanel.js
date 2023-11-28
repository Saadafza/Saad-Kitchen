import React, { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import { getToken } from "../pages/Functions";

import { Table, Space, Button, Select, notification, Card, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const { Option } = Select;


const AdminPanel = () => {
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [orders, setOrders] = useState([]);
  const [role, setRole] = useState('');
  const [expenditure, setExpenditure] = useState('');
  const [totalPriceEarned, setTotalPriceEarned] = useState('');
  const [profit, setProfit] = useState('');
  const [sellreq, setSellreq] = useState('');
  const [loading, setLoading] = useState(true);
  const token = getToken();

  const [roles, setRoles] = useState("");

  useEffect(() => {
    if (token) {
      const decodedToken = jwt_decode(token);
      if (decodedToken) {
      
        setRoles(decodedToken.role);
   
      }
    }
  }, [token]);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.all([fetchItems(), fetchUsersCount(), fetchDeliveryBoysRequests(),fetchsellerrequest(), fetchOrders()]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!loading) {
      calculateTotalPriceEarned();
      calculateProfit();
    }
  }, [loading, orders, expenditure]);

  const fetchItems = async () => {
    try {
      const response = await axios.get('https://backend-self-delta.vercel.app/api/food');
      setItems(response.data.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const fetchUsersCount = async () => {
    try {
      const response = await axios.get('https://backend-self-delta.vercel.app/api/users');
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching users count:', error);
    }
  };

  const fetchDeliveryBoysRequests = async () => {
    try {
      const response = await axios.get('https://backend-self-delta.vercel.app/api/getrequest');
      const filteredRequests = response.data.requested;
      setRequests(filteredRequests);
    } catch (error) {
      console.error('Error fetching delivery boys requests:', error);
    }
  };
  const fetchsellerrequest= async () => {
    try {
      const response = await axios.get('https://backend-self-delta.vercel.app/api/getseller');
      const filteredRequests = response.data.requested;
      setSellreq(filteredRequests);
    } catch (error) {
      console.error('Error fetching delivery boys requests:', error);
    }
  };
  const fetchOrders = async () => {
    try {
      const response = await axios.get('https://backend-self-delta.vercel.app/api/orders');
      setOrders(response.data.orders);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };

  const deleteItem = async (itemId) => {
    try {
      await axios.delete(`https://backend-self-delta.vercel.app/api/deletedbyid/${itemId}`);
      fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const navigate = useNavigate();
  const updateItem = (item) => {
    const itemId = item?._id;
    if (itemId) {
      navigate(`/update/${itemId}`);
    } else {
      console.error("Item object is null or does not have an _id property.");
      // Handle the error or show an appropriate message to the user.
    }
  }
 
  const approve = (userId, itemId) => {
    console.log(itemId)
    if (!role) {
      notification.error({
        message: 'Error',
        description: 'Please select a role before approving the request.',
      });
      return;
    }

    axios
      .put(`https://backend-self-delta.vercel.app/api/users/${userId}/role`, {
        role: role,
      })
      .then((res) => {
        if (res.data.status === true) {
          console.log('All is okay');
          notification.success({
            message: 'Approved',
            description: 'Request approved successfully.',
          });
          deletereq(itemId)
          // Update the user's status to "delivery" after approval
          updateUserStatus(userId);
        } else {
          console.log(res.data.errors);
          notification.error({
            message: 'Error',
            description: 'Something went wrong. Please try again.',
          });
        }
      })
      .catch((error) => {
        console.error(error);
        notification.error({
          message: 'Error',
          description: 'Something went wrong. Please try again.',
        });
      });
  };
  const seller = (userId, itemId) => {
    console.log(itemId)
    if (!role) {
      notification.error({
        message: 'Error',
        description: 'Please select a role before approving the request.',
      });
      return;
    }

    axios
      .put(`https://backend-self-delta.vercel.app/api/users/${userId}/role`, {
        role: "Seller",
      })
      .then((res) => {
        if (res.data.status === true) {
          console.log('All is okay');
          notification.success({
            message: 'Approved',
            description: 'Request approved successfully.',
          });
          deleterequest(itemId)
          // Update the user's status to "delivery" after approval
          sender(userId);
        } else {
          console.log(res.data.errors);
          notification.error({
            message: 'Error',
            description: 'Something went wrong. Please try again.',
          });
        }
      })
      .catch((error) => {
        console.error(error);
        notification.error({
          message: 'Error',
          description: 'Something went wrong. Please try again.',
        });
      });
  };
  const deletereq = (itemId)=>{
    try{
    axios.delete(`https://backend-self-delta.vercel.app/api/deletereq/${itemId}`)
    fetchDeliveryBoysRequests();
    } catch (error) {
    console.error('Error deleting item:', error);
  }
};

const deleterequest = (itemId)=>{
  try{
  axios.delete(`https://backend-self-delta.vercel.app/api/sellerdel/${itemId}`)
  fetchDeliveryBoysRequests();
  } catch (error) {
  console.error('Error deleting item:', error);
}
};

  const updateUserStatus = (userId) => {
    axios
      .put(`https://backend-self-delta.vercel.app/api/users/${userId}/status`, {
        status: 'delivery',
      })
      .then((res) => {
        if (res.data.status === true) {
          console.log('User status updated successfully');
          // Send the email notification to the user
          sendEmailNotification(userId);
        } else {
          console.log(res.data.errors);
        }
      })
      .catch((error) => {
        console.error('Error updating user status:', error);
      });
  };

  const sendEmailNotification = (userId) => {
    axios
      .get(`https://backend-self-delta.vercel.app/api/user/${userId}`)
      .then((res) => {
        if (res.data && res.data.user) {
          const { email } = res.data.user;

          // Call the API endpoint to send the email notification
          axios
            .post(`https://backend-self-delta.vercel.app/api/send-notification`, {
              email: email,
              subject: 'Role Update Notification',
              text: 'Your role has been updated to a delivery partner.',
              html: '<p>Your role has been updated to a delivery partner.</p>',
            })
            .then((res) => {
              console.log('Email sent successfully');
            })
            .catch((error) => {
              console.error('Error sending email notification:', error);
            });
        }
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  };

  const sender = (userId) => {
    axios
      .get(`https://backend-self-delta.vercel.app/api/user/${userId}`)
      .then((res) => {
        if (res.data && res.data.user) {
          const { email } = res.data.user;

          // Call the API endpoint to send the email notification
          axios
            .post(`https://backend-self-delta.vercel.app/api/send-notification`, {
              email: email,
              subject: 'Role Update Notification',
              text: 'Your role has been updated to a Seller partner.',
              html: '<p>Your role has been updated to a the seller</p>',
            })
            .then((res) => {
              console.log('Email sent successfully');
            })
            .catch((error) => {
              console.error('Error sending email notification:', error);
            });
        }
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
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
  
  const calculateTotalPriceEarned = () => {
    const total = orders.reduce((acc, order) => acc + parseFloat(order.price), 0);
    setTotalPriceEarned(total.toFixed(2));
  };

  const calculateProfit = () => {
    const totalEarned = parseFloat(totalPriceEarned);
    const totalExpenditure = parseFloat(expenditure);
    const profitValue = (totalEarned - totalExpenditure).toFixed(2);
    setProfit(profitValue);
  };

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
      key: 'totalQuantitySold',
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

  const userColumns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Image',
      dataIndex: 'url',
      key: 'image',
      render: (url) => <img src={url} alt="User" style={{ width: 50, height: 50 }} />,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
  ];
  const requestColumns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'users',
      key: 'name',
      render: (user) => user.name,
    },
    {
      title: 'Image',
      dataIndex: 'users',
      key: 'image',
      render: (user) => <img src={user.url} alt="User" style={{ width: 50, height: 50 }} />,
    },
    {
      title: 'User ID',
      dataIndex: 'users',
      key: 'userId',
      render: (user) => user.email,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, item) => (
        <Space>
          <Select defaultValue="user" style={{ width: 120 }} onChange={(value) => setRole(value)}>
            <Option value="user">User</Option>
            <Option value="delivery">Delivery</Option>
          </Select>
          <Button type="primary" onClick={() => approve(item.users._id, item._id)}>
  Approve
</Button>
        </Space>
      ),
    },
  ];


  const sellerColumns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'users',
      key: 'name',
      render: (user) => user.name,
    },
    {
      title: 'Image',
      dataIndex: 'users',
      key: 'image',
      render: (user) => <img src={user.url} alt="User" style={{ width: 50, height: 50 }} />,
    },
    {
      title: 'User ID',
      dataIndex: 'users',
      key: 'userId',
      render: (user) => user.email,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, item) => (
        <Space>
          <Select defaultValue="user" style={{ width: 120 }} onChange={(value) => setRole(value)}>
            <Option value="user">User</Option>
            <Option value="delivery">Seller</Option>
          </Select>
          <Button type="primary" onClick={() => seller(item.users._id, item._id)}>
  Approve
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
      title: 'Price',
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
      render: (deal) => <img src={deal?.url} alt="Item" style={{ width: 50, height: 50 }} />,
    },
  ];
  const itemSoldColumns = [
    {
      title: 'Item Name',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Quantity Sold',
      dataIndex: '_id',
      key: 'quantitySold',
      render: (itemId) => {
        const quantitySold = calculateTotalQuantitySold().find((soldItem) => soldItem.key === itemId)?.totalQuantitySold || 0;
        return quantitySold;
      },
    },
    {
      title: 'Total Price',
      dataIndex: '_id',
      key: 'totalPrice',
      render: (itemId) => {
        const totalPrice = calculateTotalQuantitySold().find((soldItem) => soldItem.key === itemId)?.totalPrice || 0;
        return `$${totalPrice.toFixed(2)}`;
      },
    },
  ];
  
return (
  <div style={{ padding: '20px' }}>
    {roles === 'admin' ? (
      <div>
        <h2 style={{ marginBottom: '20px' }}>Admin Panel</h2>
        <Card style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', color: '#000' }}>Total Price Earned</div>
            <div style={{ fontSize: '36px', color: '#000', fontWeight: 'bold' }}>{totalPriceEarned} USD</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', color: '#000' }}>Expenditure</div>
            <Input
              style={{ fontSize: '18px', fontWeight: 'bold' }}
              value={expenditure}
              onChange={(e) => setExpenditure(e.target.value)}
              placeholder="Enter Expenditure"
            />
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', color: '#000' }}>Profit</div>
            <div style={{ fontSize: '36px', color: '#000', fontWeight: 'bold' }}>{profit} USD</div>
          </div>
          </div>
          <h3 className='text-center'>Add Food</h3>
          <Link to="/create" className='btn btn-warning mb-3'> Create</Link>
        </Card>
        <Card title="Items" style={{ marginBottom: '20px' }}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <Table dataSource={items} columns={itemColumns} />
          )}
        </Card>
        <Card title="Users" style={{ marginBottom: '20px' }}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              Number of users we have: {users.length}
              <Table dataSource={users} columns={userColumns} />
            </>
          )}
        </Card>
        <Card title="Requests" style={{ marginBottom: '20px' }}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <Table dataSource={requests} columns={requestColumns} />
          )}
        </Card>

        <Card title="Seller Request" style={{ marginBottom: '20px' }}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <Table dataSource={sellreq} columns={sellerColumns} />
          )}
        </Card>
        <Card title="Orders" style={{ marginBottom: '20px' }}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <Table dataSource={orders} columns={orderColumns} />
          )}
        </Card>
        <Card title="Item Sales" style={{ marginBottom: '20px' }}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <Table dataSource={items} columns={itemSoldColumns} />
          )}
        </Card>
      </div>
    ) : (
      <div>
        <h2>404 Page Not Found</h2>
        <p>You are not authorized to access this page.</p>
      </div>
    )}
  </div>
);
};
export default AdminPanel;
