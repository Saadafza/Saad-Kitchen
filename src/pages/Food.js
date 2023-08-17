
// import ButtonRow from "./ButtonFunctionsPage"
// import { useEffect,useState } from 'react';
// import axios from 'axios';
// function Food() {
//   const [foods, setFoods] = useState([]);


// useEffect( () => {

//   axios.get("http://localhost:3003/all").then( (res) => {
//     console.log(res.data);
    
//       setFoods(res.data.food);
    
//   })

//  }, [] );
//  console.log(foods)
    // if(foods.length < 0){
    //     return(
    //         <div class="spinner-border" role="status">
    //         <span class="visually-hidden">Loading...</span>
    //       </div>
    //     )
       

    // }else{
    //     return(<>

    //    <ButtonRow/>
    //     <div className="container">
    //         <div className="row">
    //         {foods.map((food) => {
    //           <div className="col-sm-3">
    //           <div class="card main" >
    //           <img src={food.image} class="card-img-top img-detail" alt="..."/>
    //           <div class="card-body">
    //             <h5 class="card-title">{food.name}</h5>
                
               
    //           </div>
    //         </div></div>
    // })}
    //       </div> </div>
    //     </>
          
    //     )

    // }
  
//   }
//   export default Food;