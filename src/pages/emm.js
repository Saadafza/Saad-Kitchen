const handleSubmit = async () => {
    try {
      const orderRequests = props.cart.map((food) => {
        return axios.post("https://backend-self-delta.vercel.app/api/create-order", {
          userId: user,
          productId: food._id,
          quantity: food.quantity,
          price: food.price,
        });
      });

      const responses = await Promise.all(orderRequests);
      const createdOrders = responses.map((res) => res.data.message);
      setOrders(createdOrders);
      props.setCart([]);
    } catch (error) {
      console.error(error);
    }
  };


  const [orders, setOrders] = useState([]);