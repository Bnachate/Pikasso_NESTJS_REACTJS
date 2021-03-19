import React from 'react';
import { Card, Button } from 'semantic-ui-react';
import axios from 'axios';


class MessageCard extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        users: []
    }

    async fetchUsers() {
        const users = await axios.get('http://localhost:4000/users')
        this.setState({ users: users.data.users })
    }

    componentDidMount() {
        this.fetchUsers()
    }

    findUser(id) {
        let sender = this.state.users.find(user => user._id == id)
        if (sender) {
            return sender.firstname + " " + sender.lastname
        }
    }

    displayUser(message) {
        if (this.props.active == 'received') {
            return (
                <Card.Meta>From: {this.findUser(message.from)}</Card.Meta>
            )
        } else {
            return (
                <Card.Meta>To: {this.findUser(message.to)}</Card.Meta>
            )
        }
    }

    async updateCartUser(userID, productID) {
        const response = await axios.get(`http://localhost:4000/users/${userID}`);
        let cart = response.data.user.cart;
        if (cart.includes(productID) === false) {
            cart.push(productID);
            var config = {
                method: 'put',
                url: `http://localhost:4000/users/${userID}?id=${userID}`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: { cart: cart }
            };
            await axios(config)
        }
    }

    async sendResponse(response, id, to, price) {
        if (response == 'approve') {
            var config = {
                method: 'put',
                url: `http://localhost:4000/message/update?messageID=${id}`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: { accept: true, hasResponse: true }
            };
            await axios(config)
            var confirmation = { from: this.props.user, to: to, sender: false, new: true, title: 'You have a response concerning your offer', body: `Congratulations, ${this.findUser(this.props.user)} has accept your offer ${price}€`, offer: false, price: -1, accept: false, product: this.props.product, hasResponse: false }
            var confirmationConfig = {
                method: 'post',
                url: 'http://localhost:4000/message/create',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: confirmation
            };
            await axios(confirmationConfig);
            this.updateCartUser(to, this.props.product)
        } else if (response == 'decline') {
            var config = {
                method: 'put',
                url: `http://localhost:4000/message/update?messageID=${id}`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: { accept: false, hasResponse: true }
            };
            await axios(config)
            var confirmation = { from: this.props.user, to: to, sender: false, new: true, title: 'You have a response concerning your offer', body: `Sorry, ${this.findUser(this.props.user)} has decline your offer!`, offer: false, price: -1, accept: false, product: this.props.product, hasResponse: false }
            var confirmationConfig = {
                method: 'post',
                url: 'http://localhost:4000/message/create',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: confirmation
            };
            await axios(confirmationConfig);
        }
    }

    displayButtons(message) {
        if (message.offer == true && this.props.active == 'received' && message.hasResponse == false) {
            return (
                <div>
                    <Card.Content style={{ marginLeft: "3%" }}>
                        <div>
                            <p style={{ marginBottom: "-10px" }}>This message does contain an offer:</p>
                            <h2 style={{ marginBottom: "10px" }}>{message.price + " €"}</h2>
                        </div>
                    </Card.Content>
                    <Card.Content extra>
                        <div className='ui two buttons'>
                            <Button basic color='green' style={{ width: "40%", marginRight: "3%" }} onClick={() => this.sendResponse('approve', message._id, message.to, message.price)}>
                                Approve
                            </Button>
                            <Button basic color='red' style={{ width: "40%", marginLeft: "3%" }} onClick={() => this.sendResponse('decline', message._id, message.to, message.price)}>
                                Decline
                            </Button>
                        </div>
                    </Card.Content>
                </div>
            )
        } else if (message.offer == true && this.props.active == 'sent') {
            return (
                <div>
                    <Card.Content style={{ marginLeft: "3%" }}>
                        <div>
                            <p style={{ marginBottom: "-10px" }}>This message does contain an offer:</p>
                            <h2 style={{ marginBottom: "10px" }}>{message.price + " €"}</h2>
                        </div>
                    </Card.Content>
                </div>
            )
        } else {
            return (
                <div>
                    <Card.Content style={{ marginLeft: "3%" }}>
                        <div>
                            <p style={{ marginBottom: "10px" }}>This message does not contain an offer.</p>
                        </div>
                    </Card.Content>
                </div>
            )
        }
    }

    render() {

        return (
            <div>
                {this.props.messages.map(message => {
                    return (
                        <Card.Group>
                            <Card style={{ width: "100%" }}>
                                <Card.Content>
                                    <div style={{ display: 'flex' }}>
                                        {this.displayUser(message)}
                                        <div style={{ width: "30%" }}></div>
                                        <Card.Meta>{new Date(message.created_at).toLocaleString()}</Card.Meta>
                                    </div>
                                    <br />
                                    <Card.Header>{message.title}</Card.Header>
                                    <Card.Description>
                                        {message.body}
                                    </Card.Description>
                                </Card.Content>
                                {this.displayButtons(message)}
                            </Card>
                        </Card.Group>
                    )
                })}
            </div>
        )
    }
}
export default MessageCard;