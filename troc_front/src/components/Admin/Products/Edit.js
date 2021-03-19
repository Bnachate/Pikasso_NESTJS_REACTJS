import React from "react";
import { Form, Input, Button, Select, TextArea } from 'semantic-ui-react'


class Edit extends React.Component{

  render(){

const categoryOptions = [
    { key: 'E', text: 'Emploi', value: 'Emploi' },
    { key: 'V', text: 'Véhicules', value: 'Véhicules' },
    { key: 'I', text: 'Immobilier', value: 'Immobilier' },
    { key: 'V', text: 'Vacances', value: 'Vacances' },
    { key: 'L', text: 'Loisirs', value: 'Loisirs' },
    { key: 'A', text: 'Animaux', value: 'Animaux' },
    { key: 'M', text: 'Mode', value: 'Mode' },
    { key: 'Mu', text: 'Multimédia', value: 'Multimédia' },
    { key: 'S', text: 'Services', value: 'Services' },
    { key: 'Ma', text: 'Maison', value: 'Maison' },
    { key: 'MP', text: 'Materiel Professionnel', value: 'Materiel Professionnel' },
    { key: 'D', text: 'Divers', value: 'Divers' },
  
  ]

    return (
        <div 
          className=" ui form" 
          style={{
              /* justifyContent:"center",
              alignItems: "center",
              alignContent: "center", */
              position: "absolute",
              left: "35%", 
              top: "30%",
              width: "850px",
              height: "250px",
              marginLeft: "-100px",
              marginTop: "-100px"
              }}
              >
            
      <Form>
        <Form.Group widths='equal'>
          <Form.Field
            id='form-input-control-name'
            control={Input}
            label='name'
            placeholder='name'
          />
          
          <Form.Field>
            <div widths='equal' >
            <label style={{ fontWeight: 'bold' }} >price</label>
            <input type="number" placeholder="Montant" id="form-input-control-price" style={{ marginTop: "4px" }} unit="$" /> 
          </div>
          </Form.Field>
        </Form.Group>

        <Form.Group widths='equal'>
          <Form.Field
            id='form-input-control-seller'
            control={Input}
            label='seller'
            placeholder='seller'
          />
          {/* <Form.Field
            id='form-input-control-last-name'
            control={Input}
            label='lol'
            placeholder='Last name'
          /> */}
          <Form.Field
            control={Select}
            options={categoryOptions}
            label={{ children: 'category', htmlFor: 'form-select-control-category' }}
            placeholder='Category'
            search
            searchInput={{ id: 'form-select-control-category' }}
          />
        </Form.Group>
        
        <div>
          <TextArea placeholder='Description ...' />
        </div>

        <div className="ui middle aligned center aligned grid container">
            <div className="ui fluid segment" style={{ marginTop: "20px" }} >
              <input type="file" change="fileEvent($event)"  className="inputfile" id="embedpollfileinput" />
            </div>
        </div>

        <Form.Field
          id='form-button-control-public'
          control={Button}
          content='Submit'
          label=''
          style= {{ 
            marginTop: "80px"
          }}
        />
    </Form>

    </div>           
    )
  }
}

export default Edit