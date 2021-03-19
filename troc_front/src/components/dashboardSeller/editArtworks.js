import axios from 'axios';
import React, { useState, useEffect } from 'react'
import '../../App.css'



function EditArtworks(props) {


  const artworkID = props.match.params.id
  const idMain = props.match.params.idMain
  const url = "http://localhost:4000/artworks/" + artworkID
  const [image, setImage] = useState(null)
  const [description, setDescription] = useState(null)
  const [type, setType] = useState(null)
  const [price, setPrice] = useState(null)
  const [file, setFile] = useState(false)
  const [notFile, setnotFile] = useState(true)
  const [fileName, setfileName] = useState(null)
  const [fileType, setfileType] = useState(null)
  const [fileSize, setfileSize] = useState(null)
  const [ExistingArtwork, setExistingArtwork] = useState(null)
  const [ChangeType, setChangeType] = useState(false)
  const [ChangePrice, setChangePrice] = useState(false)
  const [ChangeDescription, setChangeDescription] = useState(false)
  const [ChangeImage, setChangeImage] = useState(false)



  useEffect(() => {
    getArtwork()
  }, [])

  async function getArtwork() {
    axios({
      method: 'GET',
      url: url,
    })
      .then(async response => {
        /* console.log(response.data.artwork) */
        await setExistingArtwork(response.data.artwork)

      })
  }

  function handleChange(event) {

    //----------- On récup le fichier (et tous ses attributs) sélectionné dans l'input -------
    let files = event.target.files[0]
    setFile(true)
    setnotFile(false)
    /* console.log(files) */

    if (!files.type.match('image.*')) {
      return ('image type please');
    }


    setfileName(files.name)
    setfileType(files.type)
    setfileSize(files.size)


    var reader = new FileReader();

    //----------- On met l'url de l'image dans  la cosntante image -------
    reader.onload = function () {
      setImage(reader.result)
    }

    reader.readAsDataURL(files);
  }

  function listenDescription(event) {
    setDescription(event.target.value)
  }

  function listenPrice(event) {
    setPrice(event.target.value)
  }


  function listenType(event) {
    setType(event.target.value)

  }

  function ChangeTypeTrue() {
    if (ChangeType) {
      setChangeType(false)
    }
    else {
      setChangeType(true)
    }
  }
  function ChangePriceTrue() {
    if (ChangePrice) {
      setChangePrice(false)
    }
    else {
      setChangePrice(true)
    }
  }
  function ChangeDescriptionTrue() {
    if (ChangeDescription) {
      setChangeDescription(false)
    }
    else {
      setChangeDescription(true)
    }
  }
  function ChangeImageTrue() {
    if (ChangeImage) {
      setChangeImage(false)
    }
    else {
      setChangeImage(true)
    }
  }

  function editArtwork() {
    const url = "http://localhost:4000/artworks/" + artworkID
    axios({
      method: 'PATCH',
      url: url,
      data: {
        'image': image,
        'price': price,
        'type': type,
        'description': description,
        'seller': '601980ed2f58091949df1c93'

      }
    })
      .then(response => {
        /* console.log(response) */
        setPrice('')
        setType('')
        setDescription('')
        setImage('')
        window.history.go()

      })
  }



  return (
    <div className="editArtwork">


      <h1>Update this artwork</h1>

      {
        ExistingArtwork !== null ?
          <div className="editProduct">
            <div className="artworkEdit">

              <h3>Existing type :</h3>
              <h4>{ExistingArtwork.type}</h4>
              <button className="change" onClick={ChangeTypeTrue}>Change type?</button>
              {
                ChangeType ?
                  <select onChange={listenType}>
                    <option value="painting">Painting</option>
                    <option value="sculpting">Sculpting</option>
                    <option value="drawing">Drawing</option>
                  </select>
                  : null
              }
            </div>

            <div className="artworkEdit">
              <h3>Existing description :</h3>
              <h4>{ExistingArtwork.description}</h4>
              <button className="change" onClick={ChangeDescriptionTrue}>Change Description?</button>
              {
                ChangeDescription ?
                  <textarea placeholder="enter your description" onChange={listenDescription} rows={10}></textarea>
                  : null
              }
            </div>

            <div className="artworkEdit">
              <h3>Existing price :</h3>
              <h4>{ExistingArtwork.price}</h4>
              <button className="change" onClick={ChangePriceTrue}>Change Price?</button>
              {
                ChangePrice ?
                  <input type="number" placeholder="price" onChange={listenPrice} />
                  : null
              }
            </div>

            <div className="artworkEdit">
              <h3>Existing image :</h3>
              <img src={ExistingArtwork.image} />
              <button className="change" onClick={ChangeImageTrue}>Change Image?</button>

              {
                ChangeImage ?

                  <div className="upload">

                    {
                      notFile ?
                        <div className="inputFile">
                          <input type="file" id="files" accept="image/*" name="files[]" onChange={handleChange} />
                        </div>

                        : null
                    }
                    {
                      file ?
                        <div className="infosFile">
                          <h2>{fileName}</h2>
                          <h4>{fileType}</h4>
                          <h4>{fileSize} bytes</h4>
                        </div>
                        : null
                    }
                    {
                      file ?
                        <div className="previewImage">
                          <img src={image} alt="preview" />

                        </div>
                        : null
                    }
                  </div>
                  : null
              }
            </div>
          </div>



          : <h1>Loading...</h1>
      }




      <button onClick={editArtwork}>Send</button>

    </div>
  );
}

export default EditArtworks;
