import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import image1 from "../picture/emptyCart.71ad17e692d71caa77c6c9351f84756b.png"
function Cart(props) {
  const [user, setUser] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const navigator = useNavigate();
  const [validationError, setValidationError] = useState("");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("ssid");
    if (token != null) {
      const decodedToken = jwt_decode(token);
      if (decodedToken) {
        const userId = decodedToken.id;
        setUser(userId);
      }
    } else {
      navigator("/login");
    }
  }, []);

  const deleteOne = (index) => {
    const updatedCart = [...props.cart];
    updatedCart.splice(index, 1);
    props.setCart(updatedCart);
  };

  const plus = (index) => {
    const updatedCart = [...props.cart];
    updatedCart[index].quantity += 1;
    props.setCart(updatedCart);
  };

  const minus = (index) => {
    const updatedCart = [...props.cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      props.setCart(updatedCart);
    }
  };

  const handleSubmit = async () => {
    if (!address.trim() || !contact.trim()) {
      setValidationError("Please enter a valid address and contact number.");
      return;
    }

    try {
      setValidationError(""); // Clear validation error
      const orderRequests = props.cart.map((food) => {
        return axios.post("https://backend-self-delta.vercel.app/api/create-order", {
          users: user,
          deals: food._id,
          quantity: food.quantity,
          price: food.quantity * food.price,
          address: address,
          contact: contact,
        });
      });

      const responses = await Promise.all(orderRequests);
      const createdOrders = responses.map((res) => res.data.message);
      setOrders(createdOrders);
      setAddress("");
      setContact("");
      props.setCart([]);
    } catch (error) {
      console.error(error);
    }
  };

  let totalPrice = 0;


  return (
    <section className="h-100 h-custom" >
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12">
          <div className="card card-registration card-registration-2" style={{ borderRadius: "15px" }}>
            <div className="card-body p-0">
              <div className="row g-0">
                <div className="col-lg-8">
                  <div className="p-5">
                    <div className="d-flex justify-content-between align-items-center mb-5">
                      <h1 className="fw-bold mb-0 text-black">Shopping Cart</h1>
                      <h6 className="mb-0 text-muted">{props.cart.length}</h6>
                    </div>
                    <hr className="my-4" />
                    {props.cart.length === 0 ? (
                        <div className="text-center">
                          <img src={image1} alt="Empty Cart"  style={{width:"100%",height:"60%"}}/>
                          <p>Your cart is empty.</p>
                        </div>
                      ) : (
                        <>

                      {props.cart.map((food, index) => {
                        totalPrice += food.quantity * food.price;

                        return (
                          <div className="row mb-4 d-flex justify-content-between align-items-center" key={index}>
                            <div className="col-md-2 col-lg-2 col-xl-2">
                              <img src={food.url} className="img-fluid rounded-3" alt="Cotton T-shirt" />
                            </div>
                            <div className="col-md-3 col-lg-3 col-xl-3">
                              <h6 className="text-muted">{food.category}</h6>
                              <h6 className="text-black mb-0">{food.title}</h6>
                            </div>
                            <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                              <button className="btn btn-link px-2" onClick={() => minus(index)}>
                                <i className="fas fa-minus"></i>
                              </button>
                              <input
                                id={`form${index}`}
                              style={{width:"30px"}}
                                name="quantity"
                                value={food.quantity}
                                type="text"
                                readOnly
                                className="form-control form-control-sm"
                              />
                              <button className="btn btn-link px-2" onClick={() => plus(index)}>
                                <i className="fas fa-plus"></i>
                              </button>
                            </div>
                            <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                              <h6 className="mb-0">{food.quantity * food.price}</h6>
                            </div>
                            <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                              <Link t0="#!" className="text-muted"><i className="fas fa-times" onClick={() => deleteOne(index)}></i></Link>
                            </div>
                            <hr className="my-4" />
                          </div>
                        );
                      })}

</>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-4 bg-grey">
                    <div className="p-5">
                      <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                      <hr className="my-4" />
                      <div className="d-flex justify-content-between mb-4">
                      <hr className="my-4" />
                     
                        <h5 className="text-uppercase">Total price</h5>
                        <br></br>
                        <h5>PKR  {totalPrice}</h5>
                    
                      </div>

                      <h5 className="text-uppercase mb-3">Enter Your Address</h5>
                      <div className="mb-5">
                        <div className="form-outline">
                          <input
                            type="text"
                            id="form3Examplea2"
                            onChange={(e) => {
                              setAddress(e.target.value);
                              setValidationError("");
                            }}
                            className="form-control form-control-lg"
                          />
                        </div>
                      </div>
                      <h5 className="text-uppercase mb-3">Enter Your Contact No</h5>
                      <div className="mb-5">
                        <div className="form-outline">
                          <input
                            type="text"
                            id="form3Examplea2"
                            onChange={(e) => {
                              setContact(e.target.value);
                              setValidationError("");
                            }}
                            className="form-control form-control-lg"
                          />
                        </div>
                      </div>
                      {validationError && <p className="text-danger">{validationError}</p>}
                      <hr className="my-4" />
                      <div className="d-flex justify-content-between mb-5">
                        {/* ... (rest of the total price JSX) */}
                      </div>
                      <button
                        type="button"
                        className="btn btn-dark btn-block btn-lg"
                        data-mdb-ripple-color="dark"
                        onClick={handleSubmit}
                      >
                        Shop Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;
