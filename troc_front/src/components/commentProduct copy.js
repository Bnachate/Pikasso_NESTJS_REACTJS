import React from 'react';
import { Form, Input, Button, Select, TextArea  } from 'semantic-ui-react'


class commentProduct extends React.Component{

    render(){
        return(
            <Form reply>
            <Form.TextArea />
            <Button content='Add Reply' labelPosition='left' icon='edit' primary />
          </Form>
        )
    }
}

export default commentProduct