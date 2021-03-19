import React, { useState } from 'react';
import { Form, Input, Button, Select } from 'semantic-ui-react'
import { CustomDialog } from 'react-st-modal';
import axios from 'axios';

const offerOptions = [
    { key: false, text: 'No', value: 0 },
    { key: true, text: 'Yes', value: 1 },
]

const EditDialogMessage = (props) => {

    const [offer, setOffer] = useState();
    const [price, setPrice] = useState(-1);

    async function UpdateMessage(_id) {
        var config = {
            method: 'put',
            url: `http://localhost:4000/message/update?messageID=${_id}`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: { offer: offer, price: price }
        };
        if (offer === 1 && price !== -1) {
            try {
                await axios(config)
                window.location.reload();
            } catch (error) {
                /* console.log('Oops something went wrong...') */
            }
        } else if (offer === 0) {
            try {
                await axios(config)
                window.location.reload();
            } catch (error) {
                /* console.log('Oops something went wrong...') */
            }
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

    return (
        <div
            className=" ui form"
            style={{
                paddingLeft: "25px",
                paddingRight: "25px",
                paddingTop: "30px",
                paddingBottom: "30px"
            }}
        >

            <Form>
                <Form.Field
                    control={Input}
                    label="Id"
                    value={props._id}
                    disabled
                >
                </Form.Field>
                <Form.Field
                    control={Select}
                    options={offerOptions}
                    label={{ children: 'Add an offer to the message*', htmlFor: 'form-select-control-admin' }}
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
                {offerFields()}
                <Form.Field
                    id='form-button-control-public'
                    control={Button}
                    content='Submit'
                    onClick={() => UpdateMessage(props._id)}
                    label=''
                />
            </Form>
        </div>
    )
}

const EditButton = (props) => {
    return (
        <div>
            <button
                className="ui button"
                style={{ backgroundColor: "dodgerblue", color: "#fff" }}
                onClick={async () => {
                    await CustomDialog(
                        <EditDialogMessage _id={props._id} />,
                        {
                            title: 'Edit message',
                            showCloseIcon: true,
                        }
                    );
                }}
            >
                Edit
            </button>
        </div>
    )
}
export default EditButton;
