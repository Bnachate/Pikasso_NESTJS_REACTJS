
import '../../App.css'
import PostArtwork from './postArtwork'
import MyArtworks from './myArtworks'
import { Link } from 'react-router-dom';
import Favorites from "../../images/favorites.png"
import MyArtworksIcon from "../../images/offers.png"
import MessagingIcon from "../../images/messaging.png"
import Stats from "../../images/stats.png"
import CreateArtworks from "../../images/add.png"
import MyInfos from "../../images/personal-infos.png"
import EditMyInfos from './myInfos';
import MessagingButton from '../Message/MessagingUser';



function dashboardSeller({ idMain }) {



  return (
    <div className="dashboardSeller">
      {/* <h1>Dashboard Seller</h1> */}

      <div className="infosAction">
        <EditMyInfos idMain={idMain} />

        <div className="dashboardActions">
          <Link to={`/seller/${idMain}`}><img src={MyInfos} style={{ width: "100px", heigth: "auto", marginTop: "30px", marginBottom: "30px" }} /><br /><p style={{ color: "black" }}>PERSONAL INFORMATION</p></Link>
          <Link to={`/seller/favorites/${idMain}`}><img src={Favorites} style={{ width: "100px", heigth: "auto", marginTop: "30px", marginBottom: "30px" }} /><br /><p style={{ color: "black" }}>FAVORITES</p></Link>
          <Link to={`/seller/artworks/${idMain}`}><img src={MyArtworksIcon} style={{ width: "100px", heigth: "auto", marginTop: "30px", marginBottom: "30px" }} /><br /><p style={{ color: "black" }}>YOUR SALES</p></Link>
          <Link to={`/seller/stats/${idMain}`}><img style={{ width: "100px", heigth: "auto", marginTop: "30px", marginBottom: "30px" }} src={Stats} /><br /><p style={{ color: "black" }}>STATS OFFERS</p></Link>
          <Link to="/seller/post"><img style={{ width: "80px", heigth: "auto", marginTop: "30px", marginBottom: "30px" }} src={CreateArtworks} /><br /><p style={{ color: "black" }}>CREATE NEW ARTWORK</p></Link>
          <MessagingButton />
        </div>
      </div>



    </div >
  );
}

export default dashboardSeller;
