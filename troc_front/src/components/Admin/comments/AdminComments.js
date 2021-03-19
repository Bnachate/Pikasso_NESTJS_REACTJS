import React from 'react';
import axios from "axios";
import SearchBar from './SearchBar';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


class CommentsList extends React.Component {


  state = {
    comments: [],
    filters: [],

  };

  async getAllComments() {
    await axios.get('http://localhost:4000/comment/comments')
      .then(res =>
        this.setState({
          comments: res.data
        })
      )
    /* console.log(this.state.comments); */

  }

  findComments = async (term) => {
    /* console.log(term.toString()); */
    let resulat = this.state.comments.filter(item => item.commentary.toLowerCase().includes(term.toLowerCase()));
    /* console.log(resulat); */
    await this.setState({ filters: resulat });
    /* console.log(this.state.filters) */

  }

  async deleteComment(x) {
    await axios.delete(`http://localhost:4000/comment/delete?commentID=${x}`)
    const listComments = this.state.comments.filter(item => item._id !== x)
    this.setState({ comments: listComments })
  }

  componentDidMount() {
    this.getAllComments();
  }


  render() {
    if (this.state.filters.length === 0) {
      return (
        <div className="ui segment">
          <div div className="ui right aligned grid">
            <div className="left right aligned five wide column">
              <div style={{ marginTop: "10px" }}>
                <Link to="/admin-users">
                  <button className="ui black basic button">Users</button>
                </Link>
                <Link to="/admin-artworks">
                  <button className="ui black basic button">Products</button>
                </Link>
                <Link to="/admin-messages">
                  <button className="ui black basic button">Messages</button>
                </Link>
                <Link to="/admin-comments">
                  <button className="ui black basic button">Comments</button>
                </Link>
                <Link to="/admin-stats">
                  <button className="ui black basic button">Statistiques</button>
                </Link>
              </div>
            </div>
          </div>
          <div><SearchBar onSubmit={this.findComments} /></div>

          <table className="ui nine column table">
            <thead>
              <tr>
                <th>user_id</th>
                <th>product_id</th>
                <th>Comment</th>
                <th>created_at</th>
                <th>Delete</th>
              </tr>
            </thead>

            {this.state.comments.map((item) =>
              <tbody key={item._id}>
                <tr>
                  <td>{item.user_id}</td>
                  <td>{item.user_name}</td>
                  <td>{item.product_id}</td>
                  <td>{item.commentary}</td>
                  <td>{item.created_at}</td>

                  <td>
                    <button onClick={() => this.deleteComment(item._id)} className="ui negative button" >
                      Delete
                    </button>
                  </td>
                </tr>


              </tbody>
            )}
            <tfoot>
            </tfoot>
          </table>
        </div >
      )
    } else if (this.state.filters.length > 0) {
      return (
        <div className="ui segment">
          <div><SearchBar onSubmit={this.findComments} /></div>


          <table className="ui nine column table">
            <thead>
              <tr>
                <th>user_id</th>
                <th>product_id</th>
                <th>Comment</th>
                <th>created_at</th>
                <th>Delete</th>
              </tr>
            </thead>

            {this.state.filters.map((item) =>
              <tbody key={item._id}>
                <tr>
                  <td>{item.user_id}</td>
                  <td>{item.product_id}</td>
                  <td>{item.commentary}</td>
                  <td>{item.created_at}</td>

                  <td>
                    <button onClick={() => this.deleteComment(item._id)} className="ui negative button" >
                      Delete
                  </button>
                  </td>
                </tr>


              </tbody>
            )}
            <tfoot>
            </tfoot>
          </table>
        </div >
      )
    }
  }
}

export default CommentsList