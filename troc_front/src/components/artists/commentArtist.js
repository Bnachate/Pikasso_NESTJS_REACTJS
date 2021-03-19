import React from 'react';
import { Form, Button, Comment, Header } from 'semantic-ui-react'
import axios from 'axios';


class CommentArtist extends React.Component {



    state = {
        commentaire: "",
        allcomments: [],
        artistcomment: [],
    };


    postComment = async (e) => {

        const userID = localStorage.getItem('id')
        const userName = localStorage.getItem('username')

        e.preventDefault();
        const comment = {
            commentary: this.state.commentaire,
            user_id: userID,
            user_name: userName,
            artist_id: this.props.artist_user

        };

        var config = {
            method: 'post',
            url: 'http://localhost:4000/comment/create',
            headers: {
                'Content-Type': 'application/json'
            },
            data: comment
        };

        await axios(config)
        //console.log("props",this.props.artist_user)

        this.getAllComments();
        this.setState({ commentaire: "" })

    }

    async getAllComments() {
        await axios.get('http://localhost:4000/comment/comments')
            .then(res =>
                this.setState({
                    allcomments: res.data
                })
            )
        /* console.log(this.state.allcomments); */
        // this.returnId();
        this.url();
        this.getSellerArtist();
    }

    // returnId(){
    //     let test ="";
    //     this.state.allcomments.forEach(item =>{
    //     test=item.artist_id[0]} )
    //     return test
    // }


    url() {
        const urlBrut = window.location.href
        var splits = urlBrut.split("/", 5)
        var url = splits[4].toString()
        return url
    }

    getSellerArtist() {
        if (this.state.allcomments != []) {
            const id = this.url();
            /* console.log("returnID", id) */
            const artistId = this.state.allcomments.filter(item => item.artist_id == id)
            /* console.log("aaaartisteeee", artistId) */
            this.setState({ artistcomment: artistId })
        }
    }

    componentDidMount() {
        this.getAllComments();
        //console.log(this.props.artist_user)
    }

    async deleteComment(x) {
        await axios.delete(`http://localhost:4000/comment/delete?commentID=${x}`)
        const listComments = this.state.allcomments.filter(item => item._id !== x)
        this.setState({ allcomments: listComments })
        this.getSellerArtist();
    }


    render() {


        const deleteCom = localStorage.getItem('username')
        //console.log(deleteCom)


        const isLoggedIn = localStorage.getItem('id')
        //console.log(isLoggedIn)

        return (

            <div className="commentaires">

                <Comment>

                    <Comment.Group size='large'>
                        <Header as='h1' dividing>
                            Comments
                </Header>




                        <div>
                            {isLoggedIn != null
                                ? <Form>
                                    <textarea
                                        type="text"
                                        onChange={e => this.setState({ commentaire: e.target.value })}
                                        value={this.state.commentaire}
                                        placeholder='Inscrire un commentaire'
                                        style={{ height: '30px', width: '400px' }}

                                    />

                                    <Form.Field
                                        id='form-button-control-public'
                                        control={Button}
                                        content='Submit'
                                        onClick={this.postComment}
                                        style={{ backgroundColor: 'darkcyan', width: '100px' }}

                                    />
                                </Form>
                                : <div></div>
                            }
                        </div>

                        {this.state.artistcomment.reverse().map((item) =>

                            <Comment key={item._id}>
                                <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
                                <Comment.Content className="cm">
                                    <Comment.Author as='a'>{item.user_name}</Comment.Author>
                                    <Comment.Metadata>
                                        <span>{new Date(item.created_at).toLocaleString()}</span>
                                    </Comment.Metadata>

                                    <Comment.Text>{item.commentary}</Comment.Text>

                                    <div>
                                        {deleteCom == item.user_name
                                            ? <Comment.Actions>
                                                <Comment.Action onClick={() => this.deleteComment(item._id)}>delete</Comment.Action>
                                            </Comment.Actions>
                                            : <div></div>
                                        }
                                    </div>

                                </Comment.Content>
                            </Comment>


                        )}


                    </Comment.Group>
                </Comment>
            </div>
        )
    }
}

export default CommentArtist