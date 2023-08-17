import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox
} from 'mdb-react-ui-kit';
import { useState } from 'react';
import axios from 'axios';
import {  useNavigate } from "react-router-dom";
import imagecook from "../picture/chef1.705417f3cf231c71d1bd.png"
function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    setIsLoading(true);

    // Create a FormData object to send the image as multipart/form-data
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
  

    axios.post('https://backend-self-delta.vercel.app/api/registration/', formData)
      .then((res) => {
        if (res.data.status === true) {
          // Registration successful, navigate to the login page
          navigate("/login");
          console.log("Registration successful");
        } else {
          console.log(res.data.errors);
          if (res.data.status === false) {
            console.log("Error during registration");
          }
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error while submitting the form:', error);
        setIsLoading(false);
      });
  }

  return (
    <MDBContainer fluid>
      <MDBCard className='text-black m-5 signin' style={{ borderRadius: '25px' }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="user me-3" size='lg' />
                <MDBInput label='Your Name' id='form1' onChange={(e) => { setName(e.target.value) }} type='text' className='w-100' />
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="envelope me-3" size='lg' />
                <MDBInput label='Your Email' onChange={(e) => { setEmail(e.target.value) }} id='form2' type='email' />
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="lock me-3" size='lg' />
                <MDBInput label='Password' onChange={(e) => { setPassword(e.target.value) }} id='form3' type='password' />
              </div>

              

              <div className='mb-4'>
                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
              </div>

              <MDBBtn className='mb-4' size='lg' onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Register'}
              </MDBBtn>
            </MDBCol>

            <MDBCol md='10' lg='3' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src={imagecook} fluid />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default Signup;
