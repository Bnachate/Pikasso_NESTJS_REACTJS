import React, { useState } from 'react';
import { Form, Input, Button, Select } from 'semantic-ui-react'
import { CustomDialog } from 'react-st-modal';
import axios from 'axios';
import sentLogo from './sent.png';

const offerOptions = [
    { key: false, text: 'No', value: 0 },
    { key: true, text: 'Yes', value: 1 },
]

const CreateDialogMessage = () => {

    const [from, setFrom] = useState();
    const [to, setTo] = useState();
    const [title, setTitle] = useState();
    const [message, setMessage] = useState();
    const [offer, setOffer] = useState();
    const [price, setPrice] = useState(-1);
    const [submit, setSubmit] = useState(false);

    async function sendMessage() {
        /* console.log(message) */
        var dataUser1 = { from: from, to: to, sender: true, new: false, title: title, body: message, offer: offer, price: price }
        var dataUser2 = { from: from, to: to, sender: false, new: true, title: title, body: message, offer: offer, price: price }
        var config1 = {
            method: 'post',
            url: 'http://localhost:4000/message/create',
            headers: {
                'Content-Type': 'application/json'
            },
            data: dataUser1
        };

        var config2 = {
            method: 'post',
            url: 'http://localhost:4000/message/create',
            headers: {
                'Content-Type': 'application/json'
            },
            data: dataUser2
        };

        try {
            await axios(config1);
            await axios(config2);
            await setSubmit(true);
        } catch (error) {
            /* console.log("Ooops something went wrong...") */
        }

    }

    const offerFields = () => {
        if (offer === 1) {
            return (
                <Form.Field
                    id='form-input-control-error-email'
                    control={Input}
                    label="Price*"
                    onChange={e => {
                        setPrice(e.target.value)
                    }}
                    placeholder='Price'
                />
            )
        }
    }

    if (submit === false) {
        return (
            <div
                className=" ui form"
                style={{
                    paddingLeft: "30px",
                    paddingRight: "30px",
                    paddingTop: "30px",
                    paddingBottom: "30px"
                }}
            >

                <Form>
                    <Form.Group widths='equal'>
                        <Form.Field
                            id='form-input-control-first-name'
                            control={Input}
                            label='From'
                            onChange={e => {
                                setFrom(e.target.value)
                            }}
                            disabled
                        />
                        <Form.Field
                            id='form-input-control-last-name'
                            control={Input}
                            label='To'
                            onChange={e => {
                                setTo(e.target.value)
                            }}
                            disabled
                        />
                    </Form.Group>
                    <Form.Field
                        control={Select}
                        options={offerOptions}
                        label={{ children: 'Add an offer to your message*', htmlFor: 'form-select-control-admin' }}
                        placeholder='Select an option...'
                        onChange={e => {
                            if (e.target.outerText === "Yes") {
                                setOffer(1)
                            } else if (e.target.outerText === "No") {
                                setOffer(0)
                            }
                        }}
                        search
                        searchInput={{ id: 'form-select-control-admin' }}
                    />
                    <Form.Field
                        id='form-input-control-error-email'
                        control={Input}
                        label='Title*'
                        onChange={e => {
                            setTitle(e.target.value)
                        }}
                        placeholder='Title'
                    />
                    <div class="ui form">
                        <div class="field">
                            <label>Message*</label>
                            <textarea
                                onChange={e => {
                                    setMessage(e.target.value)
                                }}
                            >
                            </textarea>
                        </div>
                    </div>
                    {offerFields()}
                    <Form.Field
                        id='form-button-control-public'
                        control={Button}
                        content='Submit'
                        onClick={() => sendMessage()}
                        label=''
                    />
                </Form>
            </div>
        )
    } else {
        return (
            <div
                className="ui form"
                style={{
                    paddingLeft: "30px",
                    paddingRight: "30px",
                    paddingTop: "50px",
                    paddingBottom: "80px"
                }}>
                <img src={sentLogo} alt="Your message is on flight..." style={{ width: "200px", height: "auto", marginLeft: "30%", marginRight: "auto" }} />
                <h1>Your message has been sent with success</h1>
            </div >
        )
    }
}

const CreateButton = () => {
    return (
        <div>
            <button
                onClick={async () => {
                    await CustomDialog(
                        <CreateDialogMessage />,
                        {
                            title: 'New message',
                            showCloseIcon: true,
                        }
                    );
                }}
            >
                SEND MESSAGE
            </button>
        </div>
    )
}
export default CreateButton;
