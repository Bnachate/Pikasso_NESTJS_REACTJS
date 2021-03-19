import React from 'react';
import axios from 'axios'
import CommentArtist from './commentArtist'
import Profile from '../profile'

class ShowArtist extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            userList: [],
            artists: [],
        }
    }



    async getAllArtists() {
        await axios.get('http://localhost:4000/users')
            .then(res =>
                this.setState({ userList: res.data.users })
            )
        //console.log(this.state.userList)
        this.getSellerArtist()
    }

    async getSellerArtist() {
        if (this.state.userList != []) {
            const url = window.location.href
            var splits = url.split("/", 5)
            var id = splits[4].toString()
            //console.log(id)
            const artistId = this.state.userList.filter(item => item._id == id)
            //console.log("aaaartisteeee", artistId)

            this.setState({ artists: artistId })

            this.returnId()
        }
    }


    returnId() {
        let test = "";
        this.state.artists.forEach(item => {
            test = item._id
        })

        /* console.log("test", test) */
        return test
    }

    componentDidMount() {
        this.getAllArtists()
    }



    render() {

        return (
            <div className="ui segment">

                <Profile />

                <CommentArtist artist_user={this.returnId()} />


            </div>
        )
    }
}




export default ShowArtist