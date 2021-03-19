import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Input, Button } from 'semantic-ui-react'
import axios from 'axios';

 


class Create extends Component {

  state = {
    firstname: "",
    lastname: "",
    gender: "",
    username: "",
    admin: false,
    password: "123456",
    seller: false,
    email: "",
  }

 

handleChange = (e) => {
  this.setState({
    firstname: e.target.value,
    lastname: e.target.value,
    gender: e.target.value,
    username: e.target.value,
    admin: e.target.value,
    password: "123456",
    seller: e.target.value,
    email: e.target.value,
     })
   console.log(e.target.value) 
}
   handleSubmit = (e) => {
    e.preventDefault();
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
    /* axios.post(`http://localhost:4000/user/create`, { data: JSON.stringify(user) })
      .then(res => {
        console.log("user :", user);
        console.log("res :", res);
        console.log("res.data", res.data);
      }) */
    var config = {
      method: 'post',
      url: 'http://localhost:4000/users',
      headers: {
        'Content-Type': 'application/json'
      },
      data: user
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));

      })
      .catch(function (error) {
        console.log(error);
      });
    this.props.history.push('/admin-users');
  }

  render() {
    console.log(this.props.history.push)
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

        <Form >
          <Form.Group widths='equal'>
            <Form.Field
              id='form-input-control-first-name'
              control={Input}
              label='First name'
              name="firstname"
              onChange={e => this.setState({ firstname: e.target.value })}
              placeholder='First name'
            />
            <Form.Field
              id='form-input-control-last-name'
              control={Input}
              label='Last name'
              onChange={e => this.setState({ lastname: e.target.value })}
              placeholder='Last name'
            />
            <Form.Field onChange={e => this.setState({ gender: e.target.value })}>
              <div className="ui form">
                <div className="field">
                  <label>Gender</label>
                  <select className="ui dropdown">
                    <option name="gender" value="">Gender</option>
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
              name="username"
              onChange={e => this.setState({ username: e.target.value })}
              placeholder='Usernam'
            />
            {/* <Form.Field
    id='form-input-control-last-name'
    control={Input}
    label='lol'
    placeholder='Last name'
  /> */}
  <Form.Field onChange={e => this.setState({seller: e.target.value})}>
  <div className="ui form">
  <div className="field">
    <label>Artist</label>
    <select className="ui dropdown">
      <option name="admin" value="">Are you an artist</option>
      <option name="admin" value={true}>Yes</option>
      <option name="admin" value={false}>No</option>
    </select>
  </div>
</div>
  </Form.Field>
  <Form.Field onChange={e => this.setState({admin: e.target.value})}>
  <div className="ui form">
  <div className="field">
    <label>Authorization</label>
    <select className="ui dropdown">
      <option name="admin" value="">Authorization</option>
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
            name="email"
            onChange={e => this.setState({ email: e.target.value })}
            placeholder='joe@schmoe.com'
            error={{
              content: 'Please enter a valid email address',
              pointing: 'below',
            }}
          />

          <Form.Field
            id='form-button-control-public'
            control={Button}
            content='Submit'
            label=''
            onClick={this.handleSubmit}
          />

        </Form>

 


      </div >

    )
  }
}

 

export default withRouter(Create);