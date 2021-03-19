import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../Homepage.css'
import axios from 'axios'
import server from '../server.js'


function Homepage({ setMainLoggedIn, superLoggedIn }) {
  const [data, setData] = useState()
  const idStorage = localStorage.getItem('id');


  const getData = async () => {
    const datas = await axios(`http://localhost:4000/selections`)
    setData(datas)
    /* console.log(datas) */

  }
  useEffect(() => {
    getData()
    if (idStorage !== undefined) setMainLoggedIn(true)

  }, [data])


  return (
    <div className="HomepageContainer">
      <div className="HomePageTitre" >
        <h1>Our Weekly Selection</h1>
      </div>
      {superLoggedIn ? <hr /> : null}
      <div className="productsContainer">
        {data ? data.data[0].selection.map(artwork => (
          <div className="product" key={artwork._id}>
            {/* superLoggedIn &&
              <Link to={`/product/${artwork._id}`}> */

                <div className="imagePrice">
                  <img src={`${artwork.image}`} />
                  <h2>{artwork.title}</h2>
                </div>

             /*  </Link> */}


            {!superLoggedIn &&
              <Link onClick={() => alert("You need to sign it first")}>
                <img width="100px" height='auto' src={`${artwork.image}`} />
                <h2>€ {artwork.price}</h2>
              </Link>}

          </div>

        ))
          :
          "Loading..."}


      </div>


    </div>
  );
}

export default Homepage;