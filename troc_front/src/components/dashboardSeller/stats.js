import { Chart } from "react-google-charts";
import '../../App.css'
import Favorites from "../../images/favorites.png"
import MyArtworksIcon from "../../images/offers.png"
import MessagingIcon from "../../images/messaging.png"
import Statistics from "../../images/stats.png"
import CreateArtworks from "../../images/add.png"
import MyInfos from "../../images/personal-infos.png"
import EditMyInfos from './myInfos';
import MessagingButton from '../Message/MessagingUser';
import { Link } from 'react-router-dom';



function Stats({ idMain }) {
  return (
    <div className="dashboardUser">
      <div className="statistics">
        <div className="stats1">
          <h2>Sell/in stock</h2>
          <Chart
            width={400}
            height={'300px'}
            chartType="AreaChart"
            data={[
              ['Month', 'Ventes', 'En Stock'],
              ['Septembre 2020', 3, 5],
              ['Octobre 2020', 1, 2],
              ['Novembre 2020', 2, 0],
              ['Décembre 2020', 5, 9],
              ['Janvier 2021', 1, 2],
              ['Fevrier 2021', 3, 3],
            ]}
            options={{
              title: 'Ventes/mois',
              hAxis: { title: 'Month', titleTextStyle: { color: '#333' } },
              vAxis: { minValue: 0 },
              chartArea: { width: '100%', height: '70%' },
            }}
          />
        </div>
        <div className="stats2">
          <h2>Activity</h2>
          <Chart
            width={'500px'}
            height={'300px'}
            chartType="PieChart"
            data={[
              ['Visits', 'per Day'],
              ['Checked your products', 20],
              ['Liked them', 10],
              ['Bought them', 2],
            ]}
            options={{
              title: "visitor's activity"
            }}
            rootProps={{ 'data-testid': '1' }}
          />
        </div>
        <div className="stats3">
          <h2>Visits</h2>
          <Chart
            width={'500px'}
            height={'300px'}
            chartType="GeoChart"
            data={[
              ['Country', 'Visits'],
              ['France', 50],
              ['Germany', 2],
              ['Switzerland', 12],
              ['Luxembourg', 9],
              ['Belgium', 23]
            ]}
            options={{
              region: '155',
              colorAxis: { colors: ['#FFFF00', '#e31b23'] },
              backgroundColor: '#81d4fa',
              datalessRegionColor: '##FFFF00',
              defaultColor: '#C0C0C0',
            }}

          />
        </div>
      </div>
      <div className="dashboardActions">
        <Link to={`/seller/${idMain}`}><img src={MyInfos} style={{ width: "100px", heigth: "auto", marginTop: "30px", marginBottom: "30px" }} /><br /><p style={{ color: "black" }}>PERSONAL INFORMATION</p></Link>
        <Link to={`/seller/favorites/${idMain}`}><img src={Favorites} style={{ width: "100px", heigth: "auto", marginTop: "30px", marginBottom: "30px" }} /><br /><p style={{ color: "black" }}>FAVORITES</p></Link>
        <Link to={`/seller/artworks/${idMain}`}><img src={MyArtworksIcon} style={{ width: "100px", heigth: "auto", marginTop: "30px", marginBottom: "30px" }} /><br /><p style={{ color: "black" }}>YOUR SALES</p></Link>
        <Link to={`/seller/stats/${idMain}`}><img style={{ width: "100px", heigth: "auto", marginTop: "30px", marginBottom: "30px" }} src={Statistics} /><br /><p style={{ color: "black" }}>STATS OFFERS</p></Link>
        <Link to="/seller/post"><img style={{ width: "80px", heigth: "auto", marginTop: "30px", marginBottom: "30px" }} src={CreateArtworks} /><br /><p style={{ color: "black" }}>CREATE NEW OFFER</p></Link>
        <MessagingButton />
      </div>
    </div>
  );
}

export default Stats;
