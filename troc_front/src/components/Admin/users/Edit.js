import { Form, Input, Button } from 'semantic-ui-react'
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import axios from 'axios';

class Edit extends Component {
  state = {
    users: [],

    firstname: this.props.location.state.user.firstname,
    lastname: this.props.location.state.user.lastname,
    gender: this.props.location.state.user.gender,
    username: this.props.location.state.user.username,
    admin: false,
    password: "123456",
    seller: false,
    email: this.props.location.state.user.email,

  }

  /*  handleChange = (e) => {
    this.setState({
      firstname: e.target.value,
      lastname: e.target.value,
      genre: e.target.value,
      username: e.target.value,
      admin: e.target.value,
      password: "123456",
      seller: false,
      email: e.target.value,
       })
     console.log(e.target.value) 
  }  */
  handleUpdate = () => {

    const user = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      gender: this.state.gender,
      username: this.state.username,
      admin: this.state.admin,
      password: this.state.password,
      seller: this.state.seller,
      email: this.state.email,
    }
    var config = {
      method: 'put',
      url: `http://localhost:4000/users/${this.props.location.state.user._id}`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: user
    };

    axios(config)
      .then(function (response) {
        /* console.log(JSON.stringify(response.data)); */
      })
      .catch(function (error) {
        /* console.log(error); */
      });

    this.props.history.push(`/admin-users`);
  }


  render() {

    /* console.log("hey yo :", this.props.history.push) */
    return (
      <div
      className=" ui form"
      style={{
        /* justifyContent:"center",
        alignItems: "center",
        alignContent: "center", */
        position: "relative",
        marginTop: 150,
        marginBottom: 550,
        width: "750px",
        height: "200px",
        marginLeft: "auto",
        marginRight: "auto"
      }}
    >

        <Form key={this.props.location.state.user._id}>
          <Form.Group widths='equal'>
            <Form.Field
              id='form-input-control-first-name'
              control={Input}
              label='First name'
              onChange={e => this.setState({ firstname: e.target.value })}
              placeholder={this.props.location.state.user.firstname}
            />
            <Form.Field
              id='form-input-control-last-name'
              control={Input}
              label='Last name'
              onChange={e => this.setState({ lastname: e.target.value })}
              placeholder={this.props.location.state.user.lastname}
            />
            <Form.Field onChange={e => this.setState({ gender: e.target.value })}>

              <div className="ui form">
                <div className="field">
                  <label>Gender</label>
                  <select className="ui dropdown">
                    <option name="gender" value="gender"></option>
                    <option name="gender" value="Male">Male</option>
                    <option name="gender" value="Female">Female</option>
                  </select>
                </div>
              </div>

            </Form.Field>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field
              id='form-input-control-first-name'
              control={Input}
              label='Username'
              onChange={e => this.setState({ username: e.target.value })}
              placeholder={this.props.location.state.user.username}
            />
            {/* <Form.Field
        id='form-input-control-last-name'
        control={Input}
        label='lol'
        placeholder='Last name'
      /> */}
            <Form.Field onChange={e => this.setState({ gender: e.target.value })}>

              <div className="ui form">
                <div className="field">
                  <label>Authorization</label>
                  <select className="ui dropdown">
                    <option name="admin" value="Authorization"></option>
                    <option name="admin" value={true}>Admin</option>
                    <option name="admin" value={false}>None</option>
                  </select>
                </div>
              </div>

            </Form.Field>
          </Form.Group>

          <Form.Field
            id='form-input-control-error-email'
            control={Input}
            label='Email'
            placeholder={this.props.location.state.user.email}
            onChange={e => this.setState({
              email: e.target.value
            })}
            error={{
              content: 'Please enter a valid email address',
              pointing: 'below',
            }}
          />

          <Form.Field
            id='form-button-control-public'
            control={Button}
            content='Submit'
            onClick={this.handleUpdate}
            label=''

          />

        </Form>

      </div >

    )
  }
}

export default withRouter(Edit);
