import React from 'react';
import './Admin/artworks/search.css';


class Search extends React.Component{

    state = { title :""};

    onFormSubmit =(event)=>{
        event.preventDefault();
        /* console.log(this.state.title); */
        this.props.onSubmit(this.state.title)
    }


    render(){
        return(
            <>
                    <div className="" style={{width: 500, marginBottom: 40, marginTop: 40, display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                            <form className="ui form" onSubmit={this.onFormSubmit}>
                                <div className="field">
                                    <label>Search title</label>
                                        <input 
                                        placeholder="found your artwork by title"
                                        onChange={(e) => this.setState({title : e.target.value})}
                                         value={this.state.title}
                                        />
                                </div>
                            </form>
                    </div>
            </>
        )
    }

}

export default Search