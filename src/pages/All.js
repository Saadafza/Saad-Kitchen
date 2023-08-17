
import { useEffect, useState } from 'react';
import axios from 'axios';
function All() {
    const [foods, setFoods] = useState([]);


    useEffect(() => {

        axios.get("https://backend-self-delta.vercel.app/api/food").then((res) => {


            setFoods(res.data.food);

        })

    }, []);
    const Chicken = () => {
        axios.get("https://backend-self-delta.vercel.app/api/getfood/Chicken").then((res) => {
            console.log(res.data);

            setFoods(res.data.food);

        })
    }
    const Icecream = () => {
        axios.get("https://backend-self-delta.vercel.app/api/getfood/Ice").then((res) => {
            console.log(res.data);

            setFoods(res.data.food);

        })
    }
    const Fruits = () => {
        axios.get("https://backend-self-delta.vercel.app/api/getfood/Fruit").then((res) => {
            console.log(res.data);

            setFoods(res.data.food);

        })
    }
    const Desert = () => {
        axios.get("https://backend-self-delta.vercel.app/api/getfood/desert").then((res) => {
            console.log(res.data);

            setFoods(res.data.food);

        })
    }
    return (
        <>
            <button type="button" onClick={Chicken} className="btn btn-primary">Primary</button>
            <button type="button" onClick={Fruits} className="btn btn-secondary">Secondary</button>
            <button type="button" onClick={Icecream} className="btn btn-success">Success</button>
            <button type="button" onClick={Desert} className="btn btn-danger">Danger</button>
            <div className="container">
                <div className="row">
                    {foods.map((food) => {
                        return (
                            <div className="col-sm-3">
                                <div className="card main" >
                                    <img src={food.url} className="card-img-top img-detail" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{food.name}</h5>


                                    </div>
                                </div></div>
                        )
                    })}
                </div> </div>


        </>
    )
}
export default All