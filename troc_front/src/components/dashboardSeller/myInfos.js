import axios from 'axios';
import React, { useState, useEffect } from 'react'
import '../../App.css'


function MyInfos({ idMain }) {



  const url = "http://localhost:4000/users/" + idMain
  const [ExistingUser, setExistingUser] = useState(false)


  const [avatar, setAvatar] = useState(null)
  const [description, setDescription] = useState(null)
  const [username, setUsername] = useState(null)
  const [age, setAge] = useState(null)
  const [lastname, setLastname] = useState(null)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [seller, setSeller] = useState(null)
  const [adress, setAdress] = useState(null)
  const [zip_code, setZip] = useState(null)
  const [city, setCity] = useState(null)

  const [file, setFile] = useState(false)
  const [notFile, setnotFile] = useState(true)
  const [fileName, setfileName] = useState(null)
  const [fileType, setfileType] = useState(null)
  const [fileSize, setfileSize] = useState(null)

  const [ChangeAvatar, setChangeAvatar] = useState(false)
  const [ChangeUsername, setChangeUsername] = useState(false)
  const [ChangeLastname, setChangeLastname] = useState(false)
  const [ChangeEmail, setChangeEmail] = useState(false)
  const [ChangePassword, setChangePassword] = useState(false)
  const [ChangeDescription, setChangeDescription] = useState(false)
  const [ChangeSeller, setChangeSeller] = useState(false)
  const [ChangeAdress, setChangeAdress] = useState(false)
  const [ChangeZip, setChangeZip] = useState(false)
  const [ChangeCity, setChangeCity] = useState(false)



  useEffect(() => {
    getUser()
  }, [url])
  async function getUser() {
    await axios
      .get(url)
      .then(response => {



        /* console.log(response.data.user) */
        setExistingUser(response.data.user)
        /* console.log(ExistingUser) */

        if (!ExistingUser.description) {
          setChangeDescription(true)
        }
        if (!ExistingUser.city) {
          setChangeCity(true)
        }
        if (!ExistingUser.seller) {
          setChangeAdress(true)
        }
        if (!ExistingUser.adress) {
          setChangeAdress(true)
        }
        if (!ExistingUser.zip_code) {
          setChangeZip(true)
        }
        if (!ExistingUser.avatar) {
          setChangeAvatar(true)
        }



      })
  }



  function handleChange(event) {

    //----------- On récup le fichier (et tous ses attributs) sélectionné dans l'input -------
    let files = event.target.files[0]
    setFile(true)
    setnotFile(false)
   /*  console.log(files) */

    if (!files.type.match('image.*')) {
      return ('image type please');
    }


    setfileName(files.name)
    setfileType(files.type)
    setfileSize(files.size)


    var reader = new FileReader();

    //----------- On met l'url de l'image dans  la cosntante image -------
    reader.onload = function () {
      setAvatar(reader.result)
    }

    reader.readAsDataURL(files);
  }

  function listenDescription(event) {
    setDescription(event.target.value)
  }
  function listenUsername(event) {
    setUsername(event.target.value)
  }
  function listenLastname(event) {
    setLastname(event.target.value)
  }
  function listenEmail(event) {
    setEmail(event.target.value)
  }

  function listenPassword(event) {
    setPassword(event.target.value)
  }
  function listenSeller(event) {
    setSeller(event.target.value)
  }
  function listenAdress(event) {
    setAdress(event.target.value)
  }
  function listenZipCode(event) {
    setZip(event.target.value)
  }
  function listenCity(event) {
    setCity(event.target.value)
  }


  function ChangeUsernameTrue() {
    if (ChangeUsername) {
      setChangeUsername(false)
    }
    else {
      setChangeUsername(true)
    }
  }

  function ChangeLastnameTrue() {
    if (ChangeLastname) {
      setChangeLastname(false)
    }
    else {
      setChangeLastname(true)
    }
  }

  function ChangeEmailTrue() {
    if (ChangeEmail) {
      setChangeEmail(false)
    }
    else {
      setChangeEmail(true)
    }
  }

  function ChangePasswordTrue() {
    if (ChangePassword) {
      setChangePassword(false)
    }
    else {
      setChangePassword(true)
    }
  }
  function ChangeSellerTrue() {
    if (ChangeSeller) {
      setChangeSeller(false)
    }
    else {
      setChangeSeller(true)
    }
  }
  function ChangeAdressTrue() {
    if (ChangeAdress) {
      setChangeAdress(false)
    }
    else {
      setChangeAdress(true)
    }
  }

  function ChangeZipTrue() {
    if (ChangeZip) {
      setChangeZip(false)
    }
    else {
      setChangeZip(true)
    }
  }

  function ChangeCityTrue() {
    if (ChangeCity) {
      setChangeCity(false)
    }
    else {
      setChangeCity(true)
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


  function editInfos() {
    const url = "http://localhost:4000/users/" + idMain
    axios({
      method: 'PUT',
      url: url,
      data: {
        'avatar': avatar,
        'username': username,
        'email': email,
        'password': password,
        'lastname': lastname,
        'age': age,
        'seller': seller,
        'adress': adress,
        'zip_code': zip_code,
        'city': city,
        'description': description


      }
    })
      .then(response => {
        /* console.log(response) */
        setAvatar('')
        setUsername('')
        setDescription('')
        setAvatar('')
        setLastname('')
        setAge('')
        setSeller('')
        setAdress('')
        setZip('')
        setCity('')
        setEmail('')
        setPassword('')
        window.history.go()

      })
  }



  return (
    <div className="editUser">

      {
        ExistingUser !== false ?

          <div className="userEdit">
            <h1>Update my infos</h1>

            <div className="changeInfos">


              <div className="existing">
                <img class="ui medium circular image" src={ExistingUser.avatar} style={{ cursor: 'pointer' }} />
              </div>

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
                    <h4>{fileName}</h4>
                    <h4>{fileType}</h4>
                    <h4>{fileSize} bytes</h4>
                  </div>
                  : null
              }
              {
                file ?
                  <div style={{ borderRadius: "30px" }} className="ui medium circular image">
                    <img style={{ width: 150, height: 150, borderRadius: "10%" }} className="ui medium circular image" src={avatar} alt="preview" />
                  </div>
                  : null
              }
            </div>

            <div className="changeInfos">
              <div className="existing">
                <h3>Username :</h3>
                <h4 onClick={ChangeUsernameTrue} style={{ cursor: 'pointer' }}>{ExistingUser.username}</h4>
              </div>

              {
                ChangeUsername ?
                  <input type="text" placeholder="enter your username" onChange={listenUsername} />
                  : null
              }
            </div>


            <div className="changeInfos">
              <div className="existing">
                <h3>Lastname :</h3>
                <h4 onClick={ChangeLastnameTrue} style={{ cursor: 'pointer' }}>{ExistingUser.lastname}</h4>
              </div>
              {
                ChangeLastname ?
                  <input type="text" placeholder="enter your lastname" onChange={listenLastname} />
                  : null
              }
            </div>

            <div className="changeInfos">
              <div className="existing">
                <h3>Email :</h3>
                <h4 style={{ cursor: 'pointer' }} onClick={ChangeEmailTrue}> {ExistingUser.email}</h4>
              </div>

              {
                ChangeEmail ?
                  <input type="text" placeholder="enter your email" onChange={listenEmail} />
                  : null
              }
            </div>

            <div className="changeInfos">
              <div className="existing">
                <h3 onClick={ChangePasswordTrue}>Password :</h3>
                <h4 style={{ cursor: 'pointer' }} >{/* {ExistingUser.password} */}</h4>
              </div>
              {
                ChangePassword ?
                  <input type="password" placeholder="enter your new password" onChange={listenPassword} />
                  : null
              }
            </div>
            <div className="changeInfos ">
              <div className="existing">
                <h3  onClick={ChangeSellerTrue}>Seller :</h3>
                <h4 style={{ cursor: 'pointer' }}>{ExistingUser.seller}</h4>
              </div>
              {
                ChangeSeller ?
                  
                <div className="ui form" style={{float: "right", marginLeft: "auto", marginRight: 0, height: "auto", width: 185, border: "0.5px solid black"}} onChange={listenSeller}>
                  <div className="field">
                    <select>
                      <option value="">Are you an Artist ?</option>
                      <option value={true}>Yes</option>
                      <option value={false}>No</option>
                    </select>
                  </div>
                </div>
                  : null
              }
            </div>
            <div className="changeInfos">
              <div className="existing">
                <h3>Address :</h3>
                <h4 style={{ cursor: 'pointer' }} onClick={ChangeAdressTrue}>{ExistingUser.adress}</h4>
              </div>
              {
                ChangeAdress ?
                  <input type="text" placeholder="enter your adress" onChange={listenAdress} />
                  : null
              }
            </div>

            <div className="changeInfos">
              <div className="existing">
                <h3>Zip Code :</h3>
                <h4 style={{ cursor: 'pointer' }} onClick={ChangeZipTrue}>{ExistingUser.zip_code}</h4>
              </div>
              {
                ChangeZip ?
                  <input type="number" placeholder="enter your price" onChange={listenZipCode} />
                  : null
              }
            </div>

            <div className="changeInfos">
              <div className="existing">
                <h3>City :</h3>
                <h4 style={{ cursor: 'pointer' }} onClick={ChangeCityTrue}>{ExistingUser.city}</h4>
              </div>
              {
                ChangeCity ?
                  <input type="text" placeholder="enter your city" onChange={listenCity} />
                  : null
              }
            </div>

            <div className="changeInfos">
              <div className="existing">
                <h3>Description :</h3>
                <h4 style={{ cursor: 'pointer' }} onClick={ChangeDescriptionTrue}>{ExistingUser.description}</h4>
              </div>
              {
                ChangeDescription ?
                  <textarea placeholder="enter your description" onChange={listenDescription} style={{ width: '70%' }} rows={8}></textarea>
                  : null
              }
            </div>
            <button onClick={editInfos}>Send these changes</button>
          </div>


          : <h1>Loading...</h1>
      }
    </div>
  );
}

export default MyInfos;