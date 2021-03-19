import React from 'react'
import axios from 'axios'
import Search from './Search'
import { Button, Header, Card, Image, Dropdown, Menu } from 'semantic-ui-react'
import DropDown from './DropDown'
import './homeStyle.css'
import { Link } from 'react-router-dom'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'


class Home extends React.Component {

    state = {
        products: [],
        findList: [],
        filterDrop: [],
        findBoth: [],
        search: '',
    }

    async getAllProducts() {
        await axios.get('http://localhost:4000/artworks')
            .then(res => this.setState({ products: res.data })
            )
       /*  console.log(this.state.products); */
    }

    findProduct = (term) => {
       /*  console.log('check', term) */
        const filter = this.state.products.filter(item => item.title.toLowerCase().includes(term.toLowerCase()) == true);
        //console.log('artiisst', filter)
        this.setState({ findList: filter })
        this.setState({ search: term })

    }


    drop = (term) => {
        console.log("choice:", term)
        const filter = this.state.products.filter(item => item.type == term);
        // console.log('artiisst2', filter)
        this.setState({ filterDrop: filter })

    }

    componentDidMount() {
        this.getAllProducts()
    }

    render() {
        const isLoggedIn = localStorage.getItem('id')

        if (this.state.findList.length < 1 && this.state.filterDrop.length < 1) {
            return (
                <div className="bod">
                    { isLoggedIn != null
                        ? <div className="bod">
                            <div className="contain">
                                <div className="ui grid">
                                    <div className="ui row">
                                        <DropDown setFilter={this.drop} />
                                        <Search SearchProduct={this.findProduct} />
                                    </div>
                                </div>
                            </div>

                            <div class="container">
                                {this.state.products.map((item) =>

                                    <Card.Group key={item._id}>

                                        <Card >
                                            <Card.Content>
                                                <Link to={`/product/${item._id}`}>
                                                    <Image
                                                        width='280'
                                                        height='200'
                                                        src={item.image}
                                                    />
                                                </Link>
                                                <h2>{item.title}</h2>
                                                <Card.Header><span>{item.type} </span></Card.Header>

                                                <Card.Meta> {item.price}€</Card.Meta>


                                                <Card.Description>
                                                    <strong>{item.description}</strong>
                                                </Card.Description>
                                                <span>{new Date(item.created_at).toLocaleString()}</span>
                                            </Card.Content>
                                            <Card.Content extra>


                                            </Card.Content>

                                        </Card>

                                    </Card.Group>

                                )}
                            </div>
                        </div>
                        : (<Redirect to="/home" />)
                    }

                </div>
            )
        }

        else if (this.state.findList.length < 1 && this.state.filterDrop.length > 0) {
            return (
                <div className="bod">

                    { isLoggedIn != null
                        ? <div>
                            <div className="contain">
                                <div className="ui grid">
                                    <div className="ui row">
                                        <DropDown setFilter={this.drop} />
                                        <Search SearchProduct={this.findProduct} />
                                    </div>
                                </div>
                            </div>
                            <div class="container">
                                {this.state.filterDrop.map((item) =>
                                    <Card.Group key={item._id}>
                                        <Card >
                                            <Card.Content>
                                                <Link to={`/product/${item._id}`}>
                                                    <Image
                                                        width='280'
                                                        height='200'
                                                        src={item.image}
                                                    />
                                                </Link>

                                                <Card.Header>{item.title} </Card.Header>
                                                <h2>{item.type}</h2>
                                                <Card.Meta> </Card.Meta>


                                                <Card.Description>
                                                    <strong>{item.description}</strong>
                                                </Card.Description>
                                                <span>{new Date(item.created_at).toLocaleString()}</span>
                                            </Card.Content>
                                            <Card.Content extra>


                                            </Card.Content>
                                        </Card>
                                    </Card.Group>
                                )}
                            </div>
                        </div>
                        : (<Redirect to="/home" />)
                    }
                </div>
            )
        }


        else if (this.state.findList.length > 0 && this.state.filterDrop.length < 1) {
            return (
                <div className="bod">

                    { isLoggedIn != null
                        ? <div>
                            <div className="contain">
                                <div className="ui grid">
                                    <div className="ui row">
                                        <DropDown setFilter={this.drop} />
                                        <Search SearchProduct={this.findProduct} />
                                    </div>

                                </div>

                            </div>
                            <div class="container">
                                {this.state.findList.map((item) =>
                                    <Card.Group key={item._id}>

                                        <Card >
                                            <Card.Content>
                                                <Link to={`/product/${item._id}`}>
                                                    <Image
                                                        width='280'
                                                        height='200'
                                                        src={item.image}
                                                    />
                                                </Link>


                                                <Card.Header>{item.title} </Card.Header>
                                                <h2>{item.type}</h2>
                                                <Card.Meta> </Card.Meta>


                                                <Card.Description>
                                                    <strong>{item.description}</strong>
                                                </Card.Description>
                                                <span>{new Date(item.created_at).toLocaleString()}</span>
                                            </Card.Content>
                                            <Card.Content extra>


                                            </Card.Content>
                                        </Card>
                                    </Card.Group>
                                )}
                            </div>
                        </div>
                        : (<Redirect to="/home" />)
                    }
                </div>

            )
        }

        else if (this.state.findList.length > 1 && this.state.filterDrop.length > 1) {
            return (
                <div className="bod">

                    { isLoggedIn != null
                        ? <div>
                            <div className="contain">
                                <div className="ui grid">
                                    <div className="ui row">
                                        <DropDown setFilter={this.drop} />
                                        <Search SearchProduct={this.findProduct} />
                                    </div>
                                </div>
                            </div>
                            <div class="container">
                                {this.state.findList.map((item) =>
                                    <Card.Group key={item._id}>
                                        <Card >
                                            <Card.Content>
                                                <Link to={`/product/${item._id}`}>
                                                    <Image
                                                        width='280'
                                                        height='200'
                                                        src={item.image}
                                                    />
                                                </Link>


                                                <Card.Header>{item.title} </Card.Header>
                                                <h2>{item.type}</h2>
                                                <Card.Meta> </Card.Meta>


                                                <Card.Description>
                                                    <strong>{item.description}</strong>
                                                </Card.Description>
                                                <span>{new Date(item.created_at).toLocaleString()}</span>
                                            </Card.Content>
                                            <Card.Content extra>


                                            </Card.Content>
                                        </Card>
                                    </Card.Group>
                                )}
                            </div>
                        </div>
                        : (<Redirect to="/home" />)
                    }
                </div>


            )
        }
    }
}
export default Home