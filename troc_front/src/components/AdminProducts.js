import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const AdminProducts = () => {
    return (
      <div>
      <div className="ui right aligned grid" style={{marginTop:"1px"}}>
        <div className="sixteen wide column">
          <div >
          <Link to="/product/create">
              <button className="ui green button">
                Create
              </button>
          </Link>
          </div>
        </div>
      </div>
            <table className="ui nine column table">
  <thead>
    <tr>
    <th>id</th>
    <th>Image</th>
    <th>Price</th>
    <th>Category</th>
    <th>Description</th>
    <th>Seller</th>
    <th>Created_at</th>
    <th></th>
    <th></th>
  
  </tr>
  </thead>
  <tbody>
    <tr>
      <td>2020</td>
      <td>Paris-Paradise</td>
      <td>1000$</td>
      <td>PictureXXL</td>
      <td>Paris la nuit</td>
      <td>Momo</td>
      <td>45/01/2021</td>
  
      <td>
          <Link to="/">
        <button className="ui primary button" href="/">
            Edit
        </button>
        </Link>
      </td>
      <td>
        <button className="ui button">
            Delete
        </button>
      </td>
    </tr>
  </tbody>
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
  </tr></tfoot> 
  
</table>
        </div>
    )
}

export default AdminProducts
