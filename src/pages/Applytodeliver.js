import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Login from "./Login";

function Applytodeliver() {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [text, setText] = useState("");
  const [address, setAddress] = useState("");
  const [salary, setSalary] = useState("");
  const [error, setError] = useState(""); // State for validation error
  const navigator = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("ssid");
    if (token != null) {
      const decodedToken = jwt_decode(token);
      if (decodedToken) {
        const userId = decodedToken.id;
        setUser(userId);
        setEmail(decodedToken.email);
      }
    } else {
      navigator("/login");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic form validation
    if (!email || !phone || !text || !address) {
      setError("Please fill in all required fields.");
      return;
    }



    setError(""); // Clear error message

    try {
      const requestBody = {
        users: user,
        email: email,
        phone: phone,
        text: text,
        address: address,
        salary: salary,
      };

      const response = await axios.post(
        "https://backend-self-delta.vercel.app/api/deliveryrequest",
        requestBody
      );

      if (response.data.status === true) {
        console.log("Application submitted successfully.");
      }
      navigator("/");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="container">
      <main>
        <div className="application-form">
          <h2 className="text-center mb-4">Apply For Delivery Partner</h2>
          <div className="application-form-detail">
            {error && <p className="error-message text-danger">{error}</p>}
            <form>
              {/* Contact Information */}
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  value={email}
                  className="form-control"
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="tel">Phone *</label>
                <input
                  type="tel"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                  minLength="11"
                  maxLength="11"
                  className="form-control"
                  placeholder="+92XXX-XXXXXX"
                  required
                />
              </div>

              {/* Position */}
              <div className="form-group">
                <label htmlFor="position">TELL US ABOUT YOURSELF *</label>
                <textarea
                  onChange={(e) => setText(e.target.value)}
                  value={text}
                  className="form-control"
                  required
                />
              </div>

              {/* Other Fields */}
              <div className="form-group">
                <label htmlFor="last-employer">Address?</label>
                <input
                  type="text"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                  autoComplete="off"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="salary">Salary Requirements</label>
                <input
                  type="text"
                  onChange={(e) => setSalary(e.target.value)}
                  value={salary}
                  className="form-control"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Applytodeliver;
