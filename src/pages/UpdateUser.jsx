import React, { useState, useEffect } from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBInput } from 'mdb-react-ui-kit';
import image1 from "../picture/chef1.705417f3cf231c71d1bd.png";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

function UpdateUser() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [twitter, setTwitter] = useState("");
  const [facebook, setFacebook] = useState("");
  const [about, setAbout] = useState("");
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('ssid');

    if (token) {
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.id;

      axios.get(`https://backend-self-delta.vercel.app/api/user/${userId}`).then((res) => {
        setUser(res.data.user);
        setName(res.data.user.name);
        setEmail(res.data.user.email);
        setTwitter(res.data.user.twitter);
        setFacebook(res.data.user.facebook);
        setAbout(res.data.user.about);
      });
    }
  }, []);

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('twitter', twitter);
    formData.append('facebook', facebook);
    formData.append('about', about);
    formData.append('url', url);
   

    const userId = user._id; 

    axios.put(`https://backend-self-delta.vercel.app/api/updateuser/${userId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((res) => {
      if (res.data.status === true) {
        console.log("Update successful");
        navigate("/");
      } else {
        console.log("Update failed:", res.data.errors);
      }
    })
    .catch((error) => {
      console.error('Error updating user:', error);
    });
  };

  return (
    <MDBRow className='d-flex justify-content-center align-items-center h-80'>
      <MDBCol>
        <MDBCard className='my-4'>
          <MDBRow className='g-0'>
            <MDBCol md='3' className="d-none d-md-block image-container">
              <MDBCardImage src={image1} alt="Sample photo" style={{ width: "250px" }} className="rounded-start shaking-image" fluid />
            </MDBCol>
            <MDBCol md='9'>
              <MDBCardBody className='text-black d-flex flex-column justify-content-center'>
                <h3 className="mb-5 text-uppercase fw-bold">UPDATE USER INFORMATION</h3>
                <MDBInput wrapperClass='mb-4' label='Name' value={name} onChange={(e) => setName(e.target.value)} size='lg' id='form1' type='text' />
                <MDBInput wrapperClass='mb-4' label='Email' value={email} onChange={(e) => setEmail(e.target.value)} size='lg' id='form2' type='text' />
                <MDBInput wrapperClass='mb-4' label='Twitter' value={twitter} onChange={(e) => setTwitter(e.target.value)} size='lg' id='form3' type='text' />
                <MDBInput wrapperClass='mb-4' label='Facebook' value={facebook} onChange={(e) => setFacebook(e.target.value)} size='lg' id='form4' type='text' />
                <MDBInput wrapperClass='mb-4' label='About' value={about} onChange={(e) => setAbout(e.target.value)} size='lg' id='form5' type='textarea' />
                <MDBInput wrapperClass='mb-4' label='Image URL' onChange={(e) => setUrl(e.target.value)} size='lg' id='form6' type='text' />
                <MDBBtn className='rounded-pill' color='success' onClick={handleSubmit}>Update</MDBBtn>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  );
}

export default UpdateUser;
