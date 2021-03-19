import React, { useEffect, useReducer, useState } from 'react';
import { CustomDialog } from 'react-st-modal';
import { Input, Menu, Segment } from 'semantic-ui-react';
import axios from 'axios';
import CreateMessage from './CreateMessage';
import MessageCard from './MessageCard';
import MessagingIcon from "../../images/messaging.png"


const MessagingUser = (props) => {
    const [user, setUser] = useState(localStorage.getItem('id'));
    const [messages, setMessages] = useState([]);
    const [active, setActive] = useState('received');

    const handleItemClick = (name) => setActive(name);

    useEffect(() => {
        const fetchMessages = async () => {
            const messages = await axios.get('http://localhost:4000/message/messages')
            setMessages(messages.data)
        }
        fetchMessages();
    })

    const displayMessages = () => {
        if (active === 'received') {
            const receivedMessages = messages.filter(message => message.to == user && message.sender == false).reverse();
            return (
                <div>
                    <h2>Received messages</h2>
                    <MessageCard messages={receivedMessages} user={user} product={props.product} active="received" />
                </div>
            )
        } else {
            const sentMessages = messages.filter(message => message.from == user && message.sender == true).reverse();
            return (
                <div>
                    <h2>Sent messages</h2>
                    <MessageCard messages={sentMessages} user={user} product={props.product} active="sent" />
                </div>
            )
        }
    }

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
            <h1
                style={{
                    width: "80%",
                    textAlign: "center",
                    marginLeft: "auto",
                    marginRight: "auto"
                }}
            >
                Messaging
            </h1>
            <CreateMessage style={{ textAlign: "right" }} product={props.product} />
            <Menu pointing>
                <Menu.Item
                    name='received'
                    active={active === 'received'}
                    onClick={() => handleItemClick('received')}
                />
                <Menu.Item
                    name='sent'
                    active={active === 'sent'}
                    onClick={() => handleItemClick('sent')}
                />
                <Menu.Menu position='right'>
                    <Menu.Item>
                        <Input icon='search' placeholder='Search...' />
                    </Menu.Item>
                </Menu.Menu>
            </Menu>

            <Segment>
                {displayMessages()}
            </Segment>
        </div>
    )
}

const MessagingButton = (props) => {
    return (
        <div>
            <img style={{ width: "110px", heigth: "auto", marginTop: "30px", marginBottom: "30px" }} src={MessagingIcon} onClick={async () => {
                await CustomDialog(
                    <MessagingUser users={props.users} product={props.product} />
                );
            }} />
            <br />
            MESSAGING
        </div>
    )
}

export default MessagingButton;