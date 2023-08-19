import ButtonFunctionsPage from "./pages/ButtonFunctionsPage"
import './App.css';
import Nav from './component/Nav';
import { useState, createContext, useContext } from "react";
import { Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import Detailpage from "./pages/Detailpage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Logout from "./pages/Logout";
import Create from "./pages/Create";
import Cart from "./pages/Cart"
import Applytodeliver from "./pages/Applytodeliver";
import AdminPanel from "./component/AdminPanel";
import Update from "./pages/Update";
import TrackYourOrder from "./pages/TrackYourOrder";
import Ordersbydeliver from "./component/Ordersbydeliver";
import New from "./pages/New";
import Search from "./pages/Search";
import Input from "./pages/Input";
import Profilecard from "./pages/Profilecard"
import { AuthContext } from './pages/AuthContext';
import VideoUpload from "./Videoupload/VideoUpload"
import VideoDisplayPage from "./Videoupload/VideoDisplayPage";
import ProfileCard from "./Customer/ProfileCard";
import UpdateUser from "./pages/UpdateUser"
import Applyforseller from "./pages/Applyforseller";
import SellerCenter from "./component/SellerCenter";

function App() {
  const[cart,setCart]=useState([])
const addtocart =(food)=>{
const newAra = [...cart,food]
setCart(newAra)

}
const deleteall =()=>{
  setCart([])
}
const userContext = useContext(AuthContext);

  return (
   <>
   <Nav cart={cart} />
   <Routes>
   <Route path='/' element={<Home addtocart={addtocart}/>}/>
   <Route path='/update/:id' element={<Update/>}/>
   <Route path='/cart' element={<Cart cart={cart} setCart={setCart} deleteall={deleteall}/>}/>
   <Route path='/login' element={<Login/>}/>
   <Route path='/applytodeliver' element={ <Applytodeliver />}/>
   <Route path='/ordersbydeliver' element={<Ordersbydeliver/>}/>
   <Route path='/admin' element={<AdminPanel/>}/>
   <Route path='/login' element={<Login/>}/>
   <Route path="/create" element={<Create/>}/>
   <Route path="/trackorder" element={<TrackYourOrder/>}/>
   <Route path='/signup' element={<Signup/>}/>
   <Route path='/logout' element={<Logout/>}/>
   <Route path="/carss" element={<New/>}/>
   <Route path='/detailpage/:id' element={<Detailpage/>}/>
    <Route path='/menu' element={<ButtonFunctionsPage addtocart={addtocart}/>}/>
    <Route path='/search' element={<Search addtocart={addtocart}/>} />
    <Route path='/input' element={<Input />} />
    <Route path="/videoup" element={<VideoUpload/>}/>
    <Route path="/video" element={<VideoDisplayPage/>}/>
    <Route path="/profilecard" element={<ProfileCard/>}/>
    <Route path="/updateuser" element={<UpdateUser/>}/>
 <Route path="/sellerapply" element={<Applyforseller/>}/>
 <Route path="/sellercenter" element={<SellerCenter/>}/>
   </Routes>
   </>
  );
}

export default App;
