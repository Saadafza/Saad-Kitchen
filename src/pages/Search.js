import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

function Search(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const q = searchParams.get('q');
 
  const [isLoading, setIsLoading] = useState(false);

  console.log(q);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`https://backend-self-delta.vercel.app/api/search?q=${q}`)
      .then((res) => {
        if (res.data.status === true) {
          setProducts(res.data.products);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err.message);
      });
  }, [searchParams]);

  return (
    <div className="container my-5">
      {isLoading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : products.length > 0 ? (
        <div className="search-results-container">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.url} alt={product.title} width="200" height="200" />
              <div className="product-details">
                <h5>{product.title}</h5>
                <p>{product.description}</p>
                <p className="price">${product.price}</p>
                <div className="buttons">
                  <button className="btn btn-primary" onClick={() => props.addtocart(product)}>Add to Cart</button>
                  <Link to={`/detailpage/${product._id}`} className="btn btn-outline-primary">Details</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-danger" role="alert">
          0 item found
        </div>
      )}
    </div>
  );
}

export default Search;