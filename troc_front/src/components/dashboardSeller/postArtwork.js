import axios from 'axios';
import React, { useState } from 'react'
import { useHistory, Link } from "react-router-dom"
import '../../App.css'
import Favorites from "../../images/favorites.png"
import MyArtworksIcon from "../../images/offers.png"
import MessagingIcon from "../../images/messaging.png"
import Stats from "../../images/stats.png"
import CreateArtworks from "../../images/add.png"
import MyInfos from "../../images/personal-infos.png"
import EditMyInfos from './myInfos';
import MessagingButton from '../Message/MessagingUser';
import { Form, TextArea } from 'semantic-ui-react';




function PostArtwork({ idMain }) {



    const [image, setImage] = useState(null)
    const [description, setDescription] = useState(null)
    const [type, setType] = useState(null)
    const [title, setTitle] = useState(null)
    const [price, setPrice] = useState(null)
    const [file, setFile] = useState(false)
    const [notFile, setnotFile] = useState(true)
    const [fileName, setfileName] = useState(null)
    const [fileType, setfileType] = useState(null)
    const [fileSize, setfileSize] = useState(null)


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
    function listenTitle(event) {
        setTitle(event.target.value)
    }

    function postArtwork() {
        const url = "http://localhost:4000/artworks"
        axios({
            method: 'POST',
            url: url,
            data: {
                'image': image,
                'price': price,
                'type': type,
                'title': title,
                'description': description,
                'seller': idMain

            }
        })
            .then(response => {
                /* console.log(response) */
                setPrice('')
                setType('')
                setTitle('')
                setDescription('')
                setImage('')
                window.history.go()

            })
    }


    return (
        <div className="dashboardUser">
            <div className="artworkCRUD">

                <h1 style={{ marginBottom: "45px" }}>Create an artwork</h1>
                <div className="artworkForm">
                    <Form>
                        <Form.Field control='select' onChange={listenType}>
                            <option selected disabled>Choose an option...</option>
                            <option value="painting">Painting</option>
                            <option value="sculpting">Sculpting</option>
                            <option value="drawing">Drawing</option>
                        </Form.Field>
                        <Form.Field placeholder="enter your title" control='input' style={{ textAlign: "left" }} onChange={listenTitle} />
                        <Form.Field
                            id='form-textarea-control-opinion'
                            control={TextArea}
                            rows={15}
                            placeholder='enter your description'
                            onChange={listenDescription}
                        />
                        <Form.Field type="number" placeholder="enter your price" control='input' style={{ textAlign: "left" }} onChange={listenPrice} />
                    </Form>
                </div>
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
                                <div className="sendArtwork">
                                    {/* <button onClick={upload}>Send this picture</button> */}
                                </div>

                            </div>
                            : null
                    }
                    <button style={{ width: "140px", height: "45px", fontSize: "18px" }} onClick={postArtwork}>Send</button>
                </div>
            </div>
            <div className="dashboardActions">
                <Link to={`/seller/${idMain}`}><img src={MyInfos} style={{ width: "100px", heigth: "auto", marginTop: "30px", marginBottom: "30px" }} /><br /><p style={{ color: "black" }}>PERSONAL INFORMATION</p></Link>
                <Link to={`/seller/favorites/${idMain}`}><img src={Favorites} style={{ width: "100px", heigth: "auto", marginTop: "30px", marginBottom: "30px" }} /><br /><p style={{ color: "black" }}>FAVORITES</p></Link>
                <Link to={`/seller/artworks/${idMain}`}><img src={MyArtworksIcon} style={{ width: "100px", heigth: "auto", marginTop: "30px", marginBottom: "30px" }} /><br /><p style={{ color: "black" }}>YOUR SALES</p></Link>
                <Link to={`/seller/stats/${idMain}`}><img style={{ width: "100px", heigth: "auto", marginTop: "30px", marginBottom: "30px" }} src={Stats} /><br /><p style={{ color: "black" }}>STATS OFFERS</p></Link>
                <Link to="/seller/post"><img style={{ width: "80px", heigth: "auto", marginTop: "30px", marginBottom: "30px" }} src={CreateArtworks} /><br /><p style={{ color: "black" }}>CREATE NEW OFFER</p></Link>
                <MessagingButton />
            </div>
        </div>
    );
}

export default PostArtwork;
