import React from 'react';
import axios from 'axios';
import { Button, Item } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Cart extends React.Component {

    state = {
        userID: localStorage.getItem('id'),
        cart: [],
        products: [],
        cartItems: []
    }

    async componentDidMount() {
        this.fetchCart();
        this.fetchArtworks();
    }

    async fetchArtworks() {
        const response = await axios.get(`http://localhost:4000/artworks`);
        this.setState({ products: response.data })
        this.displayProducts()
    }

    async fetchCart() {
        const response = await axios.get(`http://localhost:4000/users/${this.state.userID}`)
        let cart = response.data.user.cart
        /* console.log('cart', cart) */
        this.setState({ cart: cart })
    }

    getProducts() {
        var artworks = [];
        if (this.state.cart.length > 0) {
            this.state.cart.forEach(async id => {
                await axios.get(`http://localhost:4000/artworks/${id}?id=${id}`)
                    .then(result => artworks.push(result.data.artwork));
            })
        }
        this.setState({ products: artworks });

    }

    displayProducts() {
        var filter = this.state.products.filter(product => this.state.cart.includes(product._id) == true)
        this.setState({ cartItems: filter })
    }

    async deleteCartItem(id) {
        const response = await axios.get(`http://localhost:4000/users/${this.state.userID}`);
        let cart = response.data.user.cart;
        const index = cart.indexOf(id);
        if (index > -1) {
            cart.splice(index, 1);
        }
        var config = {
            method: 'put',
            url: `http://localhost:4000/users/${this.state.userID}?id=${this.state.userID}`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: { cart: cart }
        };
        await axios(config)
        window.location.reload()
    }

    getTotal() {
        var total = 0;
        this.state.cartItems.forEach(item => total += item.price)
        return total;
    }

    render() {
        if (this.state.cartItems.length > 0) {
            return (
                <div>
                    <h1>Cart</h1>
                    <Item.Group>
                        {this.state.cartItems.map((item, index) => (
                            <Item key={index} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Item.Image size='tiny' src={item.image} style={{ marginLeft: '15%' }} />
                                <Item.Content>
                                    <Item.Header as='a'>{item.title}</Item.Header>
                                    <Item.Meta>{item.title}</Item.Meta>
                                </Item.Content>
                                <Item.Content>
                                    <Item.Header as='a' style={{ fontSize: '20px' }}>{item.price}€</Item.Header>
                                </Item.Content>
                                <Item.Content style={{ marginRight: '10%' }}>
                                    <Item.Header as='a' onClick={() => this.deleteCartItem(item._id)}>Delete item</Item.Header>
                                </Item.Content>
                            </Item>
                        ))}
                    </Item.Group>
                    <hr style={{ width: "100%" }}></hr>
                    <br />
                    <h1 style={{ textAlign: 'right', marginRight: "15%" }}>Total: {this.getTotal()}€</h1>
                    <Link to='/confirmation'><Button style={{ backgroundColor: "#dd96c5" }}>Continue to payment</Button></Link>
                </div >
            )
        } else {
            return (
                <div>
                    <h1>Cart</h1>
                </div>
            )
        }
    }
}

export default Cart;