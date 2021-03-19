import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useHistory, Link } from "react-router-dom"
import '../../App.css'



function MyFavorites({ idMain }) {

  const [favorites, setFavorites] = useState()
  const [noFavorites, setnoFavorites] = useState(true)
  const [error, setError] = useState(false)
  const userID = idMain
  let history = useHistory()
  // const userID=idMain
  const url = "http://localhost:4000/users/fav/" + userID


  useEffect(() => {
    getUserFavorites()
  }, [])


  function getUserFavorites() {

    axios({
      method: 'GET',
      url: url,
    })
      .then(response => {
        /* console.log(response) */
        if (response.data.length > 0) {
         /*  console.log('coucouc') */
          setFavorites(response.data)
          setnoFavorites(false)

        }
        else {
          setnoFavorites(true)


        }
      })
      .catch((error) => {
        console.error(error)
        setError(true)
        // setFavorites(false)
      })
  }

  function deleteUserFavorite(e, artworkID) {
    e.preventDefault()
    // console.log(artworkID)

    axios({
      method: 'DELETE',
      url: url,
      data: {
        // 'id':userID,
        'artworkID': artworkID
      }
    })
      .then(response => {
       /*  console.log(response) */
        history.go()
      })
  }



  return (
    <div className="getFavorites">
      {
        error ?
          <h3>You don't have any favorite!</h3>
          : null
      }


      {
        noFavorites && error == false ?
          <h3>Loading...</h3>
          : null
      }




      <div className="cardArtworks">

        {
          favorites !== undefined ?

            favorites.map(element =>


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
                  <button className="delete" type="button" onClick={(e) => deleteUserFavorite(e, element._id, idMain)}>Delete</button>

                </div>

              </div>
            )
            : null
        }
      </div>



    </div>
  );
}

export default MyFavorites;
