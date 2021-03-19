import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminUsers = () => {

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
    <div>
      <div>
        <div className="ui right aligned grid" onChange={Reloaded}>
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
          <div class="right floated left aligned one wide column">
            <div style={{ marginTop: "10px" }}>
              <Link to="/user/create">
                <button className="ui green button">
                  Create
            </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <table className="ui nine column table">
        <thead>
          <tr>
            <th>id</th>
            <th>Image</th>
            <th>First-name</th>
            <th>Last-name</th>
            <th>Username</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Admin</th>
            <th>Seller</th>
            <th>Follow</th>
            <th>Followers</th>
            <th>favorite</th>
            <th>Products</th>
            <th>Created</th>
            <th></th>
            <th></th>

          </tr>
        </thead>
        {users.map((user) => (

          <tbody key={user._id}>
            <tr>
              <td >{user._id}</td>
              <td><img style={{ width: 50, height: 50 }} className="ui medium circular image" src={user.avatar} alt={user.username} /></td>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.username}</td>
              <td>{user.gender}</td>
              <td>{user.email}</td>
              <td>{String(user.admin)}</td>
              <td>{String(user.seller)}</td>
              <td>{user.follow.length}</td>
              <td>{user.followers.length}</td>
              <td>{user.favorites.length}</td>
              <td>{user.products.length}</td>
              <td>{user.created_at}</td>

              <td>
                <Link to={{
                  pathname: `/user/edit/:${user._id}`,
                  state: {
                    user: user
                  }
                }}>
                  <button className="ui primary button">
                    Edit
          </button>
                </Link>
              </td>
              <td>
                <button className="ui button" onClick={() => handleDelete(user._id)}>
                  Delete
          </button>
              </td>
            </tr>
          </tbody>
        ))}
        <tfoot>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

export default AdminUsers
