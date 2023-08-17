import React, { useEffect, useState } from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBInput } from 'mdb-react-ui-kit';
import image1 from "../picture/chef1.705417f3cf231c71d1bd.png"
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { getToken } from "../pages/Functions";

function Create() {
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [discount, setDiscount] = useState("")
  const [description, setDescription] = useState("")
  const [address, setAddress] = useState("")
  const [category, setCategory] = useState("")
  const [url, setUrl] = useState("")
  const [errors, setErrors] = useState({});
  const [userId ,setUserId]=useState("")
  const token = getToken();

  useEffect(() => {
    if (token) {
      const decodedToken = jwt_decode(token);
      if (decodedToken) {
      
        setUserId(decodedToken.id);
   
      }
    }
  }, [token]);
  
  const validateInputs = () => {
    let errors = {};
    let isValid = true;

    if (!title.trim()) {
      errors.title = "Title is required";
      isValid = false;
    }

    if (!price.trim()) {
      errors.price = "Price is required";
      isValid = false;
    } else if (isNaN(price)) {
      errors.price = "Price must be a number";
      isValid = false;
    }

    if (!discount.trim()) {
      errors.discount = "Discount is required";
      isValid = false;
    } else if (isNaN(discount)) {
      errors.discount = "Discount must be a number";
      isValid = false;
    }

    if (!description.trim()) {
      errors.description = "Description is required";
      isValid = false;
    }

    if (!category.trim()) {
      errors.category = "Category is required";
      isValid = false;
    }

    if (!url) {
      errors.image = "url is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateInputs()) {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('price', price);
      formData.append('discount', discount);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('url', url);
      formData.append('users', userId);
      formData.append('address', address);
      axios.post("https://backend-self-delta.vercel.app/api/create-food", formData)
        .then((res) => {
          if (res.data.status === true) {
            console.log("all is okay")
          } else {
            console.log(res.data.errors);
            if (res.data.status === false) {
              console.log("problem")
            }
          }
        })
    }
  }

  return (
    <>
      <MDBRow className='d-flex justify-content-center align-items-center h-80'>
        <MDBCol>
          <MDBCard className='my-4'>
            <MDBRow className='g-0'>
              <MDBCol md="2"></MDBCol>
              <MDBCol md='3' className="d-none d-md-block image-container">
                <MDBCardImage src={image1} alt="Sample photo" style={{ width: "250px" }} className="rounded-start shaking-image" fluid />
              </MDBCol>

              <MDBCol md='4'>
                <MDBCardBody className='text-black d-flex flex-column justify-content-center'>
                  <h3 className="mb-5 text-uppercase fw-bold">Food Registration</h3>

                  <MDBRow>
                    <MDBCol md='6'>
                      <MDBInput wrapperClassName='mb-4' label='TITLE' onChange={(e) => { setTitle(e.target.value) }} value={title} size='lg' id='form1' type='text' error={errors.title} />
                      {errors.title && <div className="text-danger">{errors.title}</div>}
                    </MDBCol>

                    <MDBCol md='6'>
                      <MDBInput wrapperClass='mb-4' label='PRICE' onChange={(e) => { setPrice(e.target.value) }} value={price} size='lg' id='form2' type='text' error={errors.price} />
                      {errors.price && <div className="text-danger">{errors.price}</div>}
                    </MDBCol>
                  </MDBRow>

                  <MDBInput wrapperClass='mb-4' label='Discount Price' onChange={(e) => { setDiscount(e.target.value) }} value={discount} size='lg' id='form3' type='text' error={errors.discount} />
                  {errors.discount && <div className="text-danger">{errors.discount}</div>}

                  <MDBInput wrapperClass='mb-4' label='Category' onChange={(e) => { setCategory(e.target.value) }} value={category} size='lg' id='form4' type='text' error={errors.category} />
                  {errors.category && <div className="text-danger">{errors.category}</div>}

                  <MDBInput wrapperClass='mb-4' label='Description' onChange={(e) => { setDescription(e.target.value) }} value={description} size='lg' id='form5' type='text' error={errors.description} />
                  {errors.description && <div className="text-danger">{errors.description}</div>}

                  <MDBInput wrapperClass='mb-4' label='Your Adress' size='lg' onChange={(e) => { setAddress(e.target.value) }} id='form6' type='text' />

                  <MDBInput wrapperClass='mb-4' label='IMAGE URL' onChange={(e) => { setUrl(e.target.value) }} value={url} size='lg' id='form5' type='text' error={errors.url} />
                  {errors.url && <div className="text-danger">{errors.url}</div>}

                  <div className="d-flex justify-content-end pt-3">
                    <MDBBtn className='ms-2' color='warning' onClick={handleSubmit} size='lg'>Submit form</MDBBtn>
                  </div>

                </MDBCardBody>

              </MDBCol>
            </MDBRow>

          </MDBCard>

        </MDBCol>
      </MDBRow>

    </>

  );
}

export default Create;