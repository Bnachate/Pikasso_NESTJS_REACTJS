import React, { useState } from 'react';
import { Form, Dropdown } from 'semantic-ui-react'

const SearchMessage = (props) => {
    const [option, setOption] = useState('id');
    const dropdown = [
        { key: 0, text: 'False', value: 0 },
        { key: 1, text: 'True', value: 1 },
    ]

    const handleChange = (value) => {
        setOption(value)
    }

    const filterMessages = (value) => {
        props.filterMessages(option, value)
    }

    if (option !== "offer") {
        return (
            <div style={{ width: "30%", marginTop: "45px", marginBottom: "45px", marginLeft: "45px" }}>
                <Form>
                    <Form.Group>
                        <label>Search options:</label>
                        <Form.Radio
                            label='Id'
                            value='id'
                            checked={option === 'id'}
                            onChange={() => handleChange('id')}
                        />
                        <Form.Radio
                            label='Title'
                            value='title'
                            checked={option === 'title'}
                            onChange={() => handleChange('title')}
                        />
                        <Form.Radio
                            label='Body'
                            value='body'
                            checked={option === 'body'}
                            onChange={() => handleChange('body')}
                        />
                        <Form.Radio
                            label='Offer'
                            value='offer'
                            checked={option === 'offer'}
                            onChange={() => handleChange('offer')}
                        />
                    </Form.Group>
                    <Form.Input fluid placeholder='Search...' onChange={(e) => filterMessages(e.target.value)} />
                </Form>
            </div>
        )
    } else {
        return (
            <div style={{ width: "30%", marginTop: "45px", marginBottom: "45px", marginLeft: "45px" }}>
                <Form>
                    <Form.Group>
                        <label>Search options:</label>
                        <Form.Radio
                            label='Id'
                            value='id'
                            checked={option === 'id'}
                            onChange={() => handleChange('id')}
                        />
                        <Form.Radio
                            label='Title'
                            value='title'
                            checked={option === 'title'}
                            onChange={() => handleChange('title')}
                        />
                        <Form.Radio
                            label='Body'
                            value='body'
                            checked={option === 'body'}
                            onChange={() => handleChange('body')}
                        />
                        <Form.Radio
                            label='Offer'
                            value='offer'
                            checked={option === 'offer'}
                            onChange={() => handleChange('offer')}
                        />
                    </Form.Group>
                    <Dropdown style={{ width: "100%" }} clearable options={dropdown} selection onChange={e => filterMessages(e.target.outerText)} />
                </Form>
            </div>
        )
    }
}

export default SearchMessage;