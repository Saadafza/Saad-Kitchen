import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import image2 from "../picture/emptyCart.71ad17e692d71caa77c6c9351f84756b.png"
import image1 from "../picture/add-to-cart.png"
import { Link } from 'react-router-dom';
function Example(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
if(props.cart.length == 0){
  return (
    <>
    <ul>
    <li  onClick={handleShow} className="nav-item mr-3" style={{width:"40px"}}>
    <div className="nav-link nav-icon iconclassName">
    <img src={image1}/>
        <span className="badge  bg-danger">{props.cart.length}</span>
    </div>
  </li>

    </ul>
    

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart  <button onClick={()=>{props.deleteall()}}>delete</button>   </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <img className='empty' src={image2}></img>
        <p className='text-center tt my-3'>Cart is empty</p>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}else{
  return (
    <>
     <li  onClick={handleShow} className="nav-item mr-3" style={{width:"40px"}}>
    <div className="nav-link nav-icon iconclassName">
    <img src={image1}/>
        <span className="badge  bg-danger">{props.cart.length}</span>
    </div>
  </li>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart  <button onClick={()=>{props.deleteall()}}>delete</button>    </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className='row'>

     
          {props.cart.map((food) => (
            <div className="col-md-10" key={food.id}>
              <div class="cart-card">
                <div className="img-con">
                  <img className="menucard-img" src={food.url} alt="card" />
                  <div className="cart-img" onClick={ () => { props.addtocart(food) } }  ></div>

                </div>
                <div className="text">
                <p className="text-end">{food.title}</p>
                <p className="text-end des" >{food.description}</p>
                <p className="text-end">{food.price}</p>
              </div>
            
            </div>
            </div>
          ))}
     </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
 
}

export default Example;