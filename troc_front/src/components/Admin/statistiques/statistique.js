import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminStats = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const response = await axios.get(`http://localhost:4000/users`)

      const data = await response.data;
      setUsers(data.users)
      /* console.log(data.users) */

    }
    return fetchUsers();
  }, [])
  /* 
    function handleUpdate(id) {
      var config = {
        method: 'put',
        url: `http://localhost:4000/user/update?userID=${id}`,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : users
      };
      
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
    } */

  function handleDelete(id) {

    var config = {
      method: 'delete',
      url: `http://localhost:4000/users/${id}`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: users

    };

    axios(config)
      .then(function (response) {
        /* console.log(JSON.stringify(response.data)); */
        window.location.reload();
      })
      .catch(function (error) {
        /* console.log(error); */
      });
  }
  const Reloaded = () => {
    window.location.reload(true);

  }
  return (
    <div style={{ marginBottom: 500 }}>
      <div className="left right aligned five wide column">
        <div style={{ marginTop: "10px" }}>
          <Link to="/admin-users">
            <button className="ui black basic button">Users</button>
          </Link>
          <Link to="/admin-artworks">
            <button className="ui black basic button">Artworks</button>
          </Link>
          <Link to="/admin-messages">
            <button className="ui black basic button">Messages</button>
          </Link>
          <Link to="/admin-comments">
            <button className="ui black basic button">Commentaries</button>
          </Link>
          <Link to="/admin-stats">
            <button className="ui black basic button">Statistiques</button>
          </Link>
        </div>
      </div>
      <table class="ui five column table">
        <thead>
          <tr>
            <th>Organic Search</th>
            <th>Utilisateurs</th>
            <th>Nouveaux Utilisateurs</th>
            <th>Sessions</th>
            <th>Taux de rebond</th>
            <th>Pages/Sessions</th>
            <th>Durée moyenne des sessions</th>
            <th>Conversion</th>
            <th>Taux de Conversion</th>
          </tr></thead>
        <tbody>
          <tr>
            <td>Organic Search</td>
            <td>53 282</td>
            <td>24 005</td>
            <td>104 652</td>
            <td>20,58 %</td>
            <td>3,08</td>
            <td>00:05:03</td>
            <td>28</td>
            <td>4,02 %</td>
          </tr>
          <tr>
            <td>Paid Search</td>
            <td>30 422</td>
            <td>10 085</td>
            <td>75 982</td>
            <td>10,78 %</td>
            <td>1,01</td>
            <td>00:02:13</td>
            <td>2</td>
            <td>0,001 %</td>
          </tr>
          <tr>
            <td>Direct</td>
            <td>100 852</td>
            <td>1 505</td>
            <td>180 352</td>
            <td>10,02 %</td>
            <td>6,20</td>
            <td>00:08:53</td>
            <td>11</td>
            <td>2,62 %</td>
          </tr>
          <tr>
            <td>Social</td>
            <td>4 587</td>
            <td>1 258</td>
            <td>3 652</td>
            <td>80,42 %</td>
            <td>5,27</td>
            <td>00:00:30</td>
            <td>0</td>
            <td>0, 00 %</td>
          </tr>
          <tr>
            <td>Referral</td>
            <td>23 451</td>
            <td>20 002</td>
            <td>35 421</td>
            <td>55,67 %</td>
            <td>2,48</td>
            <td>00:02:41</td>
            <td>2</td>
            <td>0,02 %</td>
          </tr>
          <tr>
            <td>(Other)</td>
            <td>142 352</td>
            <td>52 325</td>
            <td>154 233</td>
            <td>80,42 %</td>
            <td>1,58</td>
            <td>00:02:43</td>
            <td>6</td>
            <td>5,02 %</td>
          </tr>
        </tbody>
        <tfoot>
          <tr><th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr></tfoot>
      </table>
    </div>
  )
}

export default AdminStats
