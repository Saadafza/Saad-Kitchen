import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { getToken } from "../pages/Functions";
import Input from "../pages/Input";

import icon from "../picture/352539_menu_icon.png";
import image1 from "../picture/chef1.705417f3cf231c71d1bd.png";
import image2 from "../picture/account-avatar-profile-user-2-svgrepo-com (1).svg";
import image3 from "../picture/logout-svgrepo-com (1).svg";
import image4 from "../picture/setting-svgrepo-com.svg";

function Nav(props) {
  const token = getToken();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");

  useEffect(() => {
    if (token) {
      const decodedToken = jwt_decode(token);
      if (decodedToken) {
        setUser(decodedToken);
        setRole(decodedToken.role);
   
      }
    }
  }, [token]);



  const handleLogout = () => {
    // Add any logic here for clearing tokens or user data
    setUser(null);
    setRole("");
  };

  const userDropdown = user ? (
    <div className="dropdown show">
      <Link
        className="btn dropdown-toggle"
        to="#"
        role="button"
        id="dropdownMenuLink"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {user.name}
      </Link>

      <div className="dropdown-menu prof" aria-labelledby="dropdownMenuLink">
        <Link className="dropdown-item" to="/updateuser">
          <img src={image4} alt="Update" /> UPDATE
        </Link>
        <Link className="dropdown-item" to="/profilecard">
          <img src={image2} alt="Profile" /> PROFILE
        </Link>
        <Link className="dropdown-item" to="/logout" onClick={handleLogout}>
          <img src={image3} alt="Logout" /> LOGOUT
        </Link>
      </div>
    </div>
  ) : (
    <Link className="btn btn-dark mx-2" to="/login">
      Login
    </Link>
  );

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary miannav">
      <div className="container-fluid">
        <Link className="navbar-brand mx-5" to="/">
          <img src={image1} alt="Saad Logo" width="30" height="24" />
          <span className="topic">Saad's Kitchen</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <img src={icon} alt="icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/menu">
                menu
              </Link>
            </li>
            <li className="nav-item">
              {role === "Delivery" ? (
                <Link className="nav-link" to="/ordersbydeliver">
                  Orders
                </Link>
              ) : (
                <div className="dropdown show">
                <Link
                  className="btn dropdown-toggle"
                  to="#"
                  role="button"
                  id="dropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  style={{backgroundColor:"inherit"}}
                >
             Apply
                </Link>
          
                <div className="dropdown-menu prof" aria-labelledby="dropdownMenuLink">
                  <Link className="dropdown-item applydel" to="/applytodeliver">
                    Delivery
                  </Link>
                  <Link className="dropdown-item applydel" to="/sellerapply">
                 Seller
                  </Link>
                 
                </div>
              </div>
              )}
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/video">
                Shorts
              </Link>
            </li>
            {role === "admin" && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin">
                  Admin
                </Link>
              </li>
            )}
              
            <li className="nav-item">
              <Link to="/cart" className="nav-link">
                Cart&nbsp;
                <span className="badge rounded-pill badge-notification bg-danger">
                  {props.cart.length}
                </span>
              </Link>
            </li>
          </ul>

          <div className="d-flex mx-5 my-2" role="search">
            <Input />
          </div>

          <div className="d-flex mx-5 my-2" role="search">
            {token ? userDropdown : (
              <Link className="btn btn-dark mx-2" to="/login">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
