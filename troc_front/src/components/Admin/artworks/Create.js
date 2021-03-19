import React from 'react';
import { Form, Input, Button, Select, TextArea } from 'semantic-ui-react'
import axios from 'axios';


class Create extends React.Component {

  state = {
    image: "",
    price: "",
    type: "",
    description: "",
    seller: {},
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const product = {
      image: this.state.image,
      price: this.state.price,
      type: this.state.type,
      description: this.state.description,
      seller: this.state.seller,
    }

    var config = {
      method: 'post',
      url: 'http://localhost:4000/artworks',
      headers: {
        'Content-Type': 'application/json'
      },
      data: product
    };

    await axios(config)
    this.props.history.push('/product_list');

  }



  render() {
    return (
      <div
        className=" ui form"
        style={{
          position: "absolute",
          left: "35%",
          top: "30%",
          width: "750px",
          height: "200px",
          marginLeft: "-100px",
          marginTop: "-100px"
        }}
      >


        <Form >
          <Form.Group widths='equal'>
            <Form.Field
              id='form-input-control-first-name'
              control={Input}
              label='price'
              name="price"
              type="number"
              onChange={e => this.setState({ price: e.target.value })}
              placeholder='price'
            />
            <Form.Field
              id='form-input-control-last-name'
              control={Input}
              label='Seller name'
              onChange={e => this.setState({ seller: e.target.value })}
              placeholder='Seller Name'
            />
            <Form.Field onChange={e => this.setState({ type: e.target.value })}>
              <div className="ui form">
                <div className="field">
                  <label>Type</label>
                  <select className="ui dropdown">
                    <option name="type" value="sculpting">sculpting</option>
                    <option name="type" value="drawing">drawing</option>
                    <option name="type" value="painting">painting</option>
                  </select>
                </div>
              </div>
            </Form.Field>
          </Form.Group>

          <textarea


            label='Description'
            type="text"
            onChange={e => this.setState({ description: e.target.value })}
            placeholder='Product description'

          />

          <Form.Field
            id='form-button-control-public'
            control={Button}
            content='Submit'
            onClick={this.handleSubmit}
          />
        </Form>

      </div>
    )
  }
}

export default Create