import { useEffect } from "react"
import { removeToken } from "./Functions"
import { useNavigate } from "react-router-dom"
function Logout() {
   
   const navigator = useNavigate()
    useEffect(()=>{
        removeToken();
  
        navigator("/")
    },[])
   
    
}
export default Logout