import axios from 'axios';
import React from 'react';


import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Search from './Search';

class ProductList extends React.Component {

    state = {
        products: [],
        desc: [],
    };

    async getAllProducts() {
        await axios.get('http://localhost:4000/artworks')
            .then(res => this.setState({ products: res.data })
            )
       /*  console.log(this.state.products); */
    }

    componentDidMount() {
        this.getAllProducts();
    }


    sellerData(option, arraySeller) {
        let usernameSeller = "";
        let emailSeller = ""
        arraySeller.forEach(item => {
            usernameSeller = item.username
            emailSeller = item.email
        })

        if (option === "username") {
            return usernameSeller
        } else if (option === "email") {
            return emailSeller
        }
    }

    findDescription = async (term) => {
        /* console.log(term); */
        let resultat = this.state.products.filter(item => item.description.toLowerCase().includes(term.toLowerCase()));
        /* console.log(resultat); */
        await this.setState({ desc: resultat });
        /* console.log(this.state.desc) */
    }


    findUser = async (term) => {
        /* console.log(term); */
        let resultat = this.state.products.filter(item => item.description.toLowerCase().includes(term.toLowerCase()));
        /* console.log(resultat); */
        await this.setState({ desc: resultat });
       /*  console.log(this.state.desc) */
    }

    componentDidMount() {
        this.getAllProducts();
    }



    render() {

        if (this.state.desc.length == 0) {

            return (
                <div className="ui segment">
                    <Search onSubmit={this.findDescription} />
                    <table className="ui nine column table">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Image</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Description</th>
                                <th>Seller</th>
                                <th>Email</th>
                                <th>Created_at</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>

                        {this.state.products.map((item) =>
                            <tbody key={item._id}>
                                <tr>
                                    <td>{item._id}</td>
                                    <td></td>
                                    <td>{item.price}</td>
                                    <td>{item.type}</td>
                                    <td>{item.description}</td>
                                    {/* <td>{item.seller.forEach(item => <td>{item.username}</td>)}</td> */}
                                    <td>{this.sellerData("username", item.seller)}</td>
                                    <td>{this.sellerData("email", item.seller)}</td>
                                    <td>{item.created_at}</td>
                                    <td>
                                        <button className="ui negative button">
                                            Delete
                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        )
                        }
                    </table>
                </div>
            )
        } else if (this.state.desc.length > 0) {
            return (
                <div className="ui segment">
                    <div div className="ui right aligned grid">
                        <div className="left right aligned five wide column">
                            <div style={{ marginTop: "10px" }}>
                                <Link to="/admin-users">
                                    <button className="ui black basic button">Users</button>
                                </Link>
                                <Link to="/admin-artworks">
                                    <button className="ui black basic button">Products</button>
                                </Link>
                                <Link to="/admin-messages">
                                    <button className="ui black basic button">Messages</button>
                                </Link>
                                <Link to="/admin-comments">
                                    <button className="ui black basic button">Comments</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <Search onSubmit={this.findDescription} />

                    <table className="ui nine column table">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Image</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Description</th>
                                <th>Seller</th>
                                <th>Email</th>
                                <th>Created_at</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>

                        {this.state.desc.map((item) =>
                            <tbody key={item._id}>
                                <tr>
                                    <td>{item._id}</td>
                                    <td></td>
                                    <td>{item.price}</td>
                                    <td>{item.type}</td>
                                    <td>{item.description}</td>
                                    {/* <td>{item.seller.forEach(item => <td>{item.username}</td>)}</td> */}
                                    <td>{this.sellerData("username", item.seller)}</td>
                                    <td>{this.sellerData("email", item.seller)}</td>
                                    <td>{item.created_at}</td>


                                    <td>
                                        <button className="ui negative button">
                                            Delete
                            </button>
                                    </td>
                                </tr>
                            </tbody>
                        )
                        }
                    </table>
                </div>
            )
















        }
    }
}


export default ProductList
