import React, {
  useState,
  useEffect
} from 'react'
import {
  useParams
} from 'react-router-dom';
import '../App.css'
import axios from 'axios'
import Search from './Search'
import { Link } from 'react-router-dom'

function Profile(props) {
  const {
    id
  } = useParams()

  const [user, setUser] = useState(null)
  const url = `http://localhost:4000/users/${window.location.href.split("/")[4]}`

  const [products, setProducts] = useState()

  const urlproduct = 'http://localhost:4000/artworks/'


  let array = []

  const [title, setTitle] = useState()
  const [followers, setFollowers] = useState()
  const [follow, setFollow] = useState()
  const idStorage = localStorage.getItem('id');

  useEffect(() => {
    getData()
    getUser()


  }, [url, urlproduct])

  async function getData() {
    await axios
      .get(urlproduct)
      .then(response => {


        setProducts(response.data)

      })
  }
  const onClickFollowers = async () => {
    if (user.followers.includes(idStorage) === true) {
      await deleteFollowers(idStorage);
      await deleteFollow(window.location.href.split("/")[4]);

    }
    if (user.followers.includes(idStorage) === false) {
      await setFollowers(idStorage);
      await setFollow(window.location.href.split("/")[4]);
      await handleFollowers();
      await handleFollow();
    }
  }
  const handleFollowers = async () => {
    const response = await axios.get(`http://localhost:4000/users/${window.location.href.split('/')[4]}`);
    let followers = response.data.user.followers;
    followers.push(idStorage)
    var config = {
      method: 'put',
      url: `http://localhost:4000/users/${window.location.href.split("/")[4]}`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: { followers: followers }
    };

    await axios(config)
      .then(function (response) {
       /*  console.log(JSON.stringify(response.data)); */
      })
      .catch(function (error) {
        /* console.log(error); */
      });

  }

  const deleteFollowers = async (id) => {
    const response = await axios.get(`http://localhost:4000/users/${window.location.href.split('/')[4]}`);
    let followers = response.data.user.followers;
    const index = followers.indexOf(id);
    if (index > -1) {
      followers.splice(index, 1);
    }
    var config = {
      method: 'put',
      url: `http://localhost:4000/users/${window.location.href.split('/')[4]}`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: { followers: followers }
    };
    await axios(config)
  }
  const deleteFollow = async (id) => {
    const response = await axios.get(`http://localhost:4000/users/${idStorage}`);
    let follow = response.data.user.follow;
    const index = follow.indexOf(id);
    if (index > -1) {
      follow.splice(index, 1);
    }
    var config = {
      method: 'put',
      url: `http://localhost:4000/users/${idStorage}`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: { follow: follow }
    };
    await axios(config)
    window.location.reload();
  }

  async function getUser() {
    await axios
      .get(url)
      .then(response => {


        setUser(response.data.user)

      })
  }

  const findTitle = async (term) => {
    let resultat = array.filter(item => item.title.toLowerCase().includes(term.toLowerCase()));
    await setTitle(resultat);

  }

  const handleFollow = async () => {

    const response = await axios.get(`http://localhost:4000/users/${idStorage}`);
    let follow = response.data.user.follow;
    follow.push(window.location.href.split("/")[4])
    var config = {
      method: 'put',
      url: `http://localhost:4000/users/${idStorage}`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: { follow: follow }

    };


    await axios(config)
      .then(function (response) {
        /* console.log(JSON.stringify(response.data)); */
      })
      .catch(function (error) {
        /* console.log(error); */
      });


    window.location.reload()

  }



  console.log(followers)
  if (user !== null) {

    return (
      //profile Artist

      <div className="" style={{ justifyContent: "center" }}>
        <div class="ui one column stackable center aligned page grid">
          {user.avatar !== undefined ? (<div className="three column"> <img style={{ width: 250, height: 250 }} className="ui medium circular image" src={user.avatar} /></div>)
            : (<div className="three column"> <img style={{ width: 250, height: 250 }} className="ui medium circular image" src="https://img.icons8.com/color/452/avatar.png" /></div>)}
          <div class="content ">
            {user.description !== undefined ? (<div className="three column"><p>{user.description}</p></div>) : (<div className="three column"><p>please tell us who you are ?</p></div>)}
          </div>
          <div className="ui one column stackable center aligned page grid">
            <div className="ui labeled button " tabIndex="0" style={{ marginTop: 30 }}>
              <div className="ui pink button" onClick={onClickFollowers}>
                <i className="heart icon"></i> Like</div>
              <a className="ui basic pink left pointing label">
                {user.followers.length}
              </a>
            </div>
          </div>
        </div>


        <hr></hr>
        <div className="ui one column stackable center aligned page grid">
          <Search onSubmit={findTitle} />
        </div>
        {/* Endprofile Artist*/}
        {/* card */}
        <div className="ui grid three column row ui three four column centered row">
          {
            products !== undefined ? (

              user.products.map(productUser => (


                products.forEach(product => {

                  product._id.includes(productUser) === true ? (array.push(product)) : (<div>no artwork on your profile : (</div>)
                })


              ))

            ) : (<div className="ui active centered inline loader"></div>)}

          {
            title !== undefined ? (
              title.map(product => (


                <div className="ui card column" key={product._id} style={{ justifyContent: "center", marginLeft: 35, width: 300 }}>
                  <Link to={`/product/${product._id}`}>
                    <div className="image">
                      <img style={{ width: 280, height: 200 }} src={product.image} />
                    </div>
                  </Link>
                  <Link to={`/product/${product._id}`}>
                    <div className="content">
                      <a className="header" style={{ color: "#000000", fontSize: 20 }}>{product.title}</a>
                      <div className="description" style={{ color: "#000000", fontSize: 15 }}>
                        {product.description}
                      </div>
                    </div>
                  </Link>
                  <div className="content">


                    <strong style={{ fontSize: 40 }}>{product.price}</strong> euros

               </div>
                </div>

              ))) : (array.map(product => (


                <div className="ui card column" key={product._id} style={{ justifyContent: "center", marginLeft: 35, width: 300 }}>
                  <Link to={`/product/${product._id}`}>
                    <div className="image">
                      <img style={{ width: 280, height: 200 }} src={product.image} />
                    </div>
                  </Link>
                  <Link to={`/product/${product._id}`}>
                    <div className="content">
                      <a className="header" style={{ color: "#000000", fontSize: 20 }}>{product.title}</a>
                      <div className="description" style={{ color: "#000000", fontSize: 15 }}>
                        {product.description}
                      </div>
                    </div>
                  </Link>
                  <div className="content">


                    <strong style={{ fontSize: 40 }}>{product.price}</strong> euros

             </div>
                </div>

              )))
          }
        </div>
      </div>
    );


  } else {
    return null
  }

}

export default Profile;
