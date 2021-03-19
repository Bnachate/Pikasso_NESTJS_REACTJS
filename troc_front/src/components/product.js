import React, { useState, useEffect } from 'react'
import { withRouter, Link } from "react-router-dom"
import '../App.css'
import MessagingButton from './Message/Messaging';
import axios from 'axios'
import artwork from '../images/artwork.jpg'





function Product(props) {

  const [product, setProduct] = useState(null)
  const [seller, setSeller] = useState(false)
  const productID = props.match.params.id
  const userID = localStorage.id
  const url = 'http://localhost:4000/artworks/' + productID


  const idMain = localStorage.getItem("id")


  useEffect(() => {
    getData()
  }, [url])

  async function getData() {
    await axios
      .get(url)
      .then(response => {
        /* console.log(response.data.artwork) */
        if (response.data.artwork.seller.length > 0) {
          setSeller(true)
        }
        setProduct(response.data.artwork)

      })
  }

  async function addFav() {
    /* console.log(userID) */
    await axios({
      method: 'POST',
      url: 'http://localhost:4000/users/favorites',
      data: {
        'userID': userID,
        'artworkID': productID
      }
    })
      .then(response => {
        /* console.log(response.data) */
        alert('added to your fav !')


      })
      .catch(error => {
        /* console.log(error) */
        alert('already in your fav')
      })
  }

  /* console.log("product.seller", product) */
  return (
    <div className="productPage">

      {
        product ?
          <div className="productInfos">

            <div className="productImage">
              <div className="image">
                {/* <h2>{product.image}</h2> */}
                <img src={product.image} alt="artwork image" />
              </div>
              <div className="productActions">
                <button style={{ marginTop: "auto", marginBottom: "auto" }} onClick={addFav}>Add to my fav</button>
                <MessagingButton product={product.id} />
              </div>
            </div>

            <div className="infosProduct">
              <h1 style={{ textAlign: "center", fontSize: "40px" }}>{product.title}</h1>
              <h3 style={{ textAlign: "center", fontSize: "24px", fontWeight: "normal" }}>{product.description}</h3>
              <h3 style={{ textAlign: "center", fontSize: "18px", fontWeight: "normal" }}>Category: {product.type}</h3>
              <h3 style={{ textAlign: "center", fontSize: "40px" }}>{product.price} €</h3>
            </div>

            {
              seller ?
                <div className="sellerButton">
                  <h3>{product.seller[0].username}</h3>
                  <h3>{product.seller[0].email}</h3>
                  <h3>{product.seller[0].username}</h3>
                  <Link to={`/profile/${product.seller[0]}`}><button>Go to this seller profile</button></Link>
                </div>
                : null
            }

          </div>

          : null
      }

    </div >
  );
}

export default withRouter(Product);