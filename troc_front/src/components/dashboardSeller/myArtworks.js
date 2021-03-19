import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useHistory, Link } from "react-router-dom"
import '../../App.css'



function MyArtworks({ idMain }) {

  const [artworks, setArtworks] = useState()
  const [noArtwork, setnoArtwork] = useState(true)
  const [userID, setUserID] = useState(idMain)
  let history = useHistory()
  // const userID=idMain
  const url = "http://localhost:4000/users/artworks/" + userID


  useEffect(() => {
    getUserArtworks()
  }, [])


  function getUserArtworks() {

    axios({
      method: 'GET',
      url: url,
    })
      .then(response => {
        if (response.data.length > 0) {
          setArtworks(response.data)
          setnoArtwork(false)
          /* console.log(artworks) */
        }
        else {
          setnoArtwork(true)
        }

      })
  }

  function deleteUserArtwork(e, artworkID) {
    e.preventDefault()
    /* console.log(artworkID) */

    axios({
      method: 'DELETE',
      url: url,
      data: {
        'userID': userID,
        'artworkID': artworkID
      }
    })
      .then(response => {
        /* console.log(response) */
        history.push('seller/artworks/' + userID)
      })
  }



  return (
    <div className="getArtworks">
      {
        noArtwork ?
          <h3>Loading...</h3>
          : <h1>My artworks</h1>
      }



      <div className="cardArtworks">

        {
          artworks !== undefined ?

            artworks.map(element =>


              <div className="artworkCard" key={element._id}>

                <div className="imageCard">
                  <img src={element.image} alt="artwork image" />
                </div>
                <div className="textCard">
                  <h4>Type:</h4>
                  <p>{element.type}</p>
                </div>
                <div className="textCard">
                  <h4>Price:</h4>
                  <p>{element.price} euros</p>
                </div>
                <div className="textCard">
                  <h4>Description:</h4>
                  <p>{element.description}</p>
                </div>
                <div className="actionsCard">
                  <button className="delete" type="button" onClick={(e) => deleteUserArtwork(e, element._id, idMain)}>Delete</button>
                  <Link to={`/edit/${element._id}`}><button>Edit</button></Link>
                </div>

              </div>
            )
            : null
        }
      </div>



    </div>
  );
}

export default MyArtworks;
