import React, { useState } from 'react'

import { Link } from 'react-router-dom';


function InputField() {
  const [inputTxt, setInputTxt] = useState("");


  return (
  <div className="input-group">
  <div className="form-outline">
    <input onChange={(e) => setInputTxt(e.target.value)} type="search" id="form1" className="form-control" />
  </div>
  <Link to={`/search?q=${inputTxt}`} type="button" className="btn btn-warning">
    <i className="fas fa-search"></i>
  </Link>
</div>


  )
}

export default InputField