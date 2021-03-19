import React from 'react'
import axios from 'axios';
import EditButton from "./Edit";
import SearchMessage from "./Search";
import { Link } from 'react-router-dom';


class AdminMessages extends React.Component {
  state = {
    messages: [],
    filtered: [],
    noResult: false
  }

  async fetchMessages() {
    await axios.get("http://localhost:4000/message/messages")
      .then(response => this.setState({ messages: response.data }));
  }

  async deleteMessage(_id) {
    var id;
    var newMessages;
    await axios.delete(`http://localhost:4000/message/delete?messageID=${_id}`)
      .then(response => id = response._id)
    /* console.log("id", id); */
    newMessages = this.state.messages.filter(message => message._id !== _id);
    /* console.log("new state", newMessages); */
    this.setState(
      { messages: newMessages }
    )
  }

  filterMessages(option, value) {
    if (value === '') {
      this.setState({
        filtered: [],
        noResult: false
      })
    }
    if (option === 'id') {
      let result = this.state.messages.filter(message => message._id.includes(value))
      if (result.length === 0) {
        this.setState({
          noResult: true
        })
      } else {
        this.setState({ filtered: result })
      }
    } else if (option === 'title') {
      let result = this.state.messages.filter(message => message.title.toLowerCase().includes(value.toLowerCase()))
      if (result.length === 0) {
        this.setState({
          noResult: true
        })
      } else {
        this.setState({ filtered: result })
      }
    } else if (option === 'body') {
      let result = this.state.messages.filter(message => message.body.toLowerCase().includes(value.toLowerCase()))
      if (result.length === 0) {
        this.setState({
          noResult: true
        })
      } else {
        this.setState({ filtered: result })
      }
    } else {
      /* console.log(value.toLowerCase()) */
      let result = this.state.messages.filter(message => message.offer.toString().includes(value.toLowerCase()));
      if (result.length === 0) {
        this.setState({
          noResult: true
        })
      } else {
        this.setState({ filtered: result })
      }
    }
  }

  componentDidMount() {
    this.fetchMessages();
  }

  render() {
    if (this.state.messages.length > 0 && this.state.filtered.length === 0) {
      return (
        <div>
          <div div className="ui right aligned grid">
            <div className="left right aligned five wide column">
              <div style={{ marginTop: "10px" }}>
                <Link to="/admin-users">
                  <button className="ui black basic button">Users</button>
                </Link>
                <Link to="/admin-artworks">
                  <button class="ui black basic button">Artworks</button>
                </Link>
                <Link to="/admin-messages">
                  <button className="ui black basic button">Messages</button>
                </Link>
                <Link to="/admin-comments">
                  <button class="ui black basic button">Commentaries</button>
                </Link>
                <Link to="/admin-stats">
                  <button className="ui black basic button">Statistiques</button>
                </Link>
              </div>
            </div>
          </div>
          <SearchMessage messages={this.state.messages} filterMessages={this.filterMessages.bind(this)} />
          <table className="ui nine column table">
            <thead>
              <tr>
                <th>Id</th>
                <th>From</th>
                <th>To</th>
                <th>Sender</th>
                <th>New</th>
                <th>Title</th>
                <th>Body</th>
                <th>Offer</th>
                <th>Price</th>
                <th>Product</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.messages.map((message, i) => (
                <tr>
                  <td>{message._id}</td>
                  <td>{message.from}</td>
                  <td>{message.to}</td>
                  <td>{String(message.sender)}</td>
                  <td>{String(message.new)}</td>
                  <td>{message.title}</td>
                  <td>{message.body}</td>
                  <td>{String(message.offer)}</td>
                  <td>{message.price}</td>
                  <td>{message.product}</td>
                  <td>
                    <EditButton _id={message._id} />
                  </td>
                  <td>
                    <button className="ui button" style={{ backgroundColor: "#f6465b", color: "#fff" }} onClick={() => this.deleteMessage(message._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th><b>Nbr total results: {this.state.messages.length}</b></th>
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
              </tr></tfoot>
          </table>
        </div>
      )
    } else if (this.state.filtered.length > 0) {
      if (this.state.noResult === true) {
        return (
          <div>
            <div div className="ui right aligned grid">
              <div className="left right aligned five wide column">
                <div style={{ marginTop: "10px" }}>
                  <Link to="/admin-users">
                    <button className="ui black basic button">Users</button>
                  </Link>
                  <Link to="/admin-artworks">
                    <button class="ui black basic button">Artworks</button>
                  </Link>
                  <Link to="/admin-messages">
                    <button className="ui black basic button">Messages</button>
                  </Link>
                  <Link to="/admin-comments">
                    <button class="ui black basic button">Commentaries</button>
                  </Link>
                </div>
              </div>
            </div>
            <SearchMessage messages={this.state.messages} filterMessages={this.filterMessages.bind(this)} />
            <table className="ui nine column table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Sender</th>
                  <th>New</th>
                  <th>Title</th>
                  <th>Body</th>
                  <th>Price</th>
                  <th>Product</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{
                  fontSize: "16px"
                }}>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>No result</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        )
      } else {
        return (
          <div>
            <div className="ui right aligned grid">
              <div className="left right aligned five wide column">
                <div style={{ marginTop: "10px" }}>
                  <Link to="/admin-users">
                    <button className="ui black basic button">Users</button>
                  </Link>
                  <Link to="/admin-artworks">
                    <button class="ui black basic button">Artworks</button>
                  </Link>
                  <Link to="/admin-messages">
                    <button className="ui black basic button">Messages</button>
                  </Link>
                  <Link to="/user/create">
                    <button class="ui black basic button">Commentaries</button>
                  </Link>
                </div>
              </div>
            </div>
            <SearchMessage messages={this.state.messages} filterMessages={this.filterMessages.bind(this)} />
            <table className="ui nine column table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Sender</th>
                  <th>New</th>
                  <th>Title</th>
                  <th>Body</th>
                  <th>Offer</th>
                  <th>Price</th>
                  <th>Product</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.filtered.map((message, i) => (
                  <tr>
                    <td>{message._id}</td>
                    <td>{message.from}</td>
                    <td>{message.to}</td>
                    <td>{message.sender.toString()}</td>
                    <td>{message.new.toString()}</td>
                    <td>{message.title}</td>
                    <td>{message.body}</td>
                    <td>{message.price}</td>
                    <td>{message.product}</td>
                    <td>
                      <EditButton _id={message._id} />
                    </td>
                    <td>
                      <button className="ui button" style={{ backgroundColor: "#f6465b", color: "#fff" }} onClick={() => this.deleteMessage(message._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th><b>Nbr total results: {this.state.filtered.length}</b></th>
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
                </tr></tfoot>
            </table>
          </div>
        )
      }
    } else {
      return null
    }
  }
}

export default AdminMessages;
