import { Table, Space, Button, message } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

function OrdersByDeliver() {
  const [orders, setOrders] = useState([]);
  const [loadingClaim, setLoadingClaim] = useState(false);
  const [claimedOrders, setClaimedOrders] = useState([]);
  const [userClaimed, setUserClaimed] = useState([]);
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [deliver, setDeliver] = useState('');
  const [roles, setRoles] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('ssid');
    if (token) {
      const decodedToken = jwt_decode(token);
      if (decodedToken) {
        const { id, name } = decodedToken;
        setUserId(id);
        setUserName("Picked by " + name);
        setDeliver(name);
        setRoles(decodedToken.role);
      }
    }
    fetchItems();
    fetchClaimedOrders();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('https://backend-self-delta.vercel.app/api/orders');
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const fetchClaimedOrders = () => {
    axios
      .get('https://backend-self-delta.vercel.app/api/claimedorder')
      .then((res) => {
        const claimedData = res.data.claim;
        setClaimedOrders(claimedData.map((item) => item._id));
        setUserClaimed(claimedData.map((item) => item));
      })
      .catch((error) => {
        console.error('Error fetching claimed orders:', error);
      });
  };

  const handleClaim = async (orderId) => {
    setLoadingClaim(true);

    try {
      const res = await axios.put(`https://backend-self-delta.vercel.app/api/product/${orderId}/status`, { status: userName });

      if (res.data && res.data.status === true) {
        message.success('Claim successful');

        await axios.post('https://backend-self-delta.vercel.app/api/claimorder', {
          orders: orderId,
          Claimedby: userName,
          user: userId
        });

        fetchClaimedOrders();
      } else {
        message.error('Claim failed');
      }
    } catch (error) {
      console.error('Error claiming:', error);
      message.error('Claim failed');
    } finally {
      setLoadingClaim(false);
    }
  };

  const handleDeliver = async (orderId) => {
    try {
      const res = await axios.put(`https://backend-self-delta.vercel.app/api/product/${orderId}/status`, {
        status: 'Delivered',
      });

      if (res.data && res.data.status === true) {
        message.success('Order delivered successfully');
        fetchClaimedOrders();
      } else {
        message.error('Failed to deliver order');
      }
    } catch (error) {
      console.error('Error delivering order:', error);
      message.error('Failed to deliver order');
    }
  };

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
      title: 'Actions',
      key: 'actions',
      render: (text, item) => (
        <Space>
          <Button
            type="primary"
            onClick={() => handleClaim(item._id)}
            loading={loadingClaim}
            disabled={claimedOrders.includes(item._id)}
          >
            {claimedOrders.includes(item._id)
              ? 'Claimed'
              : loadingClaim
              ? 'Claiming...'
              : 'Claim'}
          </Button>
        </Space>
      ),
    },
  ];

  const claimColumns = [
    {
      title: 'ID',
      dataIndex: 'orders',
      key: 'id',
      render: (order) => order._id,
    },
    {
      title: 'Image',
      dataIndex: 'orders',
      key: 'Image',
      render: (order) => <img src={order.url} alt="img" style={{ width: 50, height: 50 }} />,
    },
    {
      title: 'Address',
      dataIndex: 'orders',
      key: 'address',
      render: (order) => order.address,
    },
    {
      title: 'Quantity',
      dataIndex: 'orders',
      key: 'quantity',
      render: (order) => order.quantity,
    },
    {
      title: 'Price',
      dataIndex: 'orders',
      key: 'Price',
      render: (order) => order.price,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, item) => (
        <Space>
          <Button
            type="primary"
            onClick={() => handleDeliver(item.orders._id)}
            disabled={item.orders.status === 'Delivered'}
          >
            Delivered
          </Button>
        </Space>
      ),
    },
  ];

  const filteredClaimedOrders = userClaimed.filter((item) => item.Claimedby === userName);
  const tableDataOrder = Array.isArray(orders) ? orders : [];
  const tableDataClaim = Array.isArray(filteredClaimedOrders) ? filteredClaimedOrders : [];

  if (roles === 'Delivery') {
    return (
      <>
        <Table dataSource={tableDataOrder} columns={orderColumns} />
        <h1>ORDERS {deliver}</h1>
        <Table dataSource={tableDataClaim} columns={claimColumns} />
      </>
    );
  } else {
    return (
      <div>
        <h2>404 Page Not Found</h2>
        <p>You are not authorized to access this page.</p>
      </div>
    );
  }
}
export default OrdersByDeliver;
