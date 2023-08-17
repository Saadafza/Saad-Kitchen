import React, { useState, useEffect } from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBInput } from 'mdb-react-ui-kit';
import image1 from "../picture/chef1.705417f3cf231c71d1bd.png";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Update() {
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [url, setUrl] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios.get(`https://backend-self-delta.vercel.app/api/getfoods/${id}`)
      .then((res) => {
        const item = res.data;
        setTitle(item.food.title);
        setPrice(item.food.price.toString());
        setDiscount(item.food.discount.toString());
        setDescription(item.food.description);
        setCategory(item.food.category);
      })
      .catch((error) => {
        console.error('Error fetching item:', error);
      });
  }, [id]);

  const validateInputs = () => {
    let errors = {};
    let isValid = true;
  
    if (!title.trim()) {
      errors.title = "Title is required";
      isValid = false;
    }
  
    console.log("Price value: ", price);
  
    if (!price.trim()) {
      errors.price = "Price is required";
      isValid = false;
    } else if (isNaN(price)) {
      errors.price = "Price must be a number";
      isValid = false;
    }
  
    if (typeof discount !== "string" || !discount.trim()) {
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
      errors.url = "Url is required";
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

      axios.put(`https://backend-self-delta.vercel.app/api/update/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((res) => {
          if (res.data.status === true) {
            console.log("All is okay");
            navigate("/admin");
          } else {
            console.log(res.data.errors);
            if (res.data.status === false) {
              console.log("Problem");
            }
          }
        })
        .catch((error) => {
          console.error('Error updating item:', error);
        });
    }
  };

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
                  <h3 className="mb-5 text-uppercase fw-bold">Food Updation</h3>
                  <MDBRow>
                    <MDBCol md='6'>
                      <MDBInput wrapperclassName='mb-4' label='TITLE' value={title} onChange={(e) => setTitle(e.target.value)} size='lg' id='form1' type='text' error={errors.title} />
                      {errors.title && <div className="text-danger">{errors.title}</div>}
                    </MDBCol>
                    <MDBCol md='6'>
                      <MDBInput wrapperClass='mb-4' label='PRICE' value={price} onChange={(e) => setPrice(e.target.value)} size='lg' id='form2' type='text' error={errors.price} />
                      {errors.price && <div className="text-danger">{errors.price}</div>}
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md='6'>
                      <MDBInput wrapperClass='mb-4' label='DISCOUNT' value={discount} onChange={(e) => setDiscount(e.target.value)} size='lg' id='form3' type='text' error={errors.discount} />
                      {errors.discount && <div className="text-danger">{errors.discount}</div>}
                    </MDBCol>
                    <MDBCol md='6'>
                      <MDBInput wrapperClass='mb-4' label='CATEGORY' value={category} onChange={(e) => setCategory(e.target.value)} size='lg' id='form4' type='text' error={errors.category} />
                      {errors.category && <div className="text-danger">{errors.category}</div>}
                    </MDBCol>
                  </MDBRow>
                  <MDBInput wrapperClass='mb-4' label='DESCRIPTION' value={description} onChange={(e) => setDescription(e.target.value)} size='lg' id='form5' type='textarea' error={errors.description} />
                  {errors.description && <div className="text-danger">{errors.description}</div>}
                  <MDBInput wrapperClass='mb-4' label='Image Url' value={"put image  URL here from google drive"} onChange={(e) => setUrl(e.target.value)} size='lg' id='form6' type='text' error={errors.url} />
                  {errors.description && <div className="text-danger">{errors.description}</div>}
                  <MDBBtn className='rounded-pill' color='success' onClick={handleSubmit}>Update</MDBBtn>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </>
  );
}

export default Update;