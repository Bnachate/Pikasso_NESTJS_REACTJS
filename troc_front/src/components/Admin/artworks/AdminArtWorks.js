import axios from 'axios';
import React from 'react';
import Search from './search';
import { Link } from 'react-router-dom';

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


    async getAllUsers() {
        await axios.get('http://localhost:4000/users')
            .then(res => this.setState({ users: res.data })
            )
        /* console.log(this.state.users); */
    }
    componentDidMount() {
        this.getAllProducts();
        this.getAllUsers();
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
        /* console.log("this.state.desc", this.state.desc) */
    }


    async deleteProduct(x) {
        await axios.delete(`http://localhost:4000/artworks/${x}`)
        const listProducts = this.state.products.filter(item => item._id !== x)
        this.setState({ products: listProducts })
    }

    render() {

        if (this.state.desc.length === 0) {

            return (
                <div className="">
                    <div class="ui right aligned grid">
                        <div class="left right aligned five wide column">
                            <div style={{ marginTop: "10px" }}>
                                <Link to="/admin-users">
                                    <button class="ui black basic button">Users</button>
                                </Link>
                                <Link to="/admin-artworks">
                                    <button class="ui black basic button">Artworks</button>
                                </Link>
                                <Link to="/admin-messages">
                                    <button class="ui black basic button">Messages</button>
                                </Link>
                                <Link to="/admin-comments">
                                    <button class="ui black basic button">Commentaries</button>
                                </Link>
                                <Link to="/admin-stats">
                                    <button className="ui black basic button">Statistiques</button>
                                </Link>
                            </div>
                        </div>
                    </div>


                    <Search onSubmit={this.findDescription} />
                    <div className="ui right aligned grid" style={{ marginTop: "1px" }}>
                        <div className="sixteen wide column">
                            <div >
                                <Link to="/product/create">
                                    <button className="ui green button">
                                        Create
                            </button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <table className="ui nine column table">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Description</th>
                                <th>Seller</th>
                                <th>Email</th>
                                <th>Created_at</th>
                                <th> Delete</th>

                            </tr>
                        </thead>

                        {this.state.products.map((item) =>
                            <tbody key={item._id}>
                                <tr>
                                    <td>{item._id}</td>
                                    <td><img style={{ width: 50, height: 50 }} className="ui medium circular image" src={item.image} alt={item.type} /></td>
                                    <td>{item.title}</td>
                                    <td>{item.price}</td>
                                    <td>{item.type}</td>
                                    <td>{item.description}</td>
                                    {/* <td>{item.seller.forEach(item => <td>{item.username}</td>)}</td> */}
                                    <td>{this.sellerData("username", item.seller)}</td>
                                    <td>{this.sellerData("email", item.seller)}</td>
                                    <td>{item.created_at}</td>


                                    <td>
                                        <button className="ui negative button" onClick={() => this.deleteProduct(item._id)}>
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
                <div className="">
                    <Search onSubmit={this.findDescription} />
                    <div className="ui right aligned grid" style={{ marginTop: "1px" }}>
                        <div className="sixteen wide column">
                            <div >
                                <Link to="/product/create">
                                    <button className="ui green button">
                                        Create
                                </button>
                                </Link>
                            </div>
                        </div>
                    </div>

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
                                        <Link to="/product/edit/:id">
                                            <button className="ui primary button">
                                                Edit
                            </button>
                                        </Link>
                                    </td>
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
