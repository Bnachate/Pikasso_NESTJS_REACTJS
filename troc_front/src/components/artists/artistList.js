import React from 'react'
import { Button, Header, Card, Image, } from 'semantic-ui-react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import './artistList.css'



class artistList extends React.Component {

    state = {
        userList: [],
        artistList: []
    }

    async getAllArtists() {
        await axios.get('http://localhost:4000/users')
            .then(res =>
                this.setState({
                    userList: res.data.users
                })
            )
        /* console.log(this.state.userList) */
    }

    componentDidMount() {
        this.getAllArtists();
    }

    render() {

        return (
            <div className="bod">

                <div >

                    <h1>Artists List</h1>
                    <div class="container">
                        {this.state.userList.map((item) =>
                            <Card.Group key={item._id}>

                                {item.seller == true

                                    ? <Card >
                                        <Card.Content>
                                            <Image
                                                width='280'
                                                height='200'
                                                src={item.avatar}
                                            />
                                            <Card.Header>{item.firstname} {item.lastname}</Card.Header>
                                            <Card.Meta>{item.email} </Card.Meta>
                                            <Card.Description>
                                                <strong></strong>
                                            </Card.Description>
                                        </Card.Content>
                                        <Card.Content extra>
                                            <Link to={`artistshow/${item._id}`}>
                                                <Button basic color='green'>
                                                    show
                        </Button>

                                            </Link>

                                        </Card.Content>
                                    </Card>

                                    : <div></div>
                                }

                            </Card.Group>
                        )}</div>
                </div>
            </div>

        )
    }
}

export default artistList 