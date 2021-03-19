import React from 'react';
import './homeStyle.css'



class Search extends React.Component{

    state = { term :""};

    onFormSubmit =(event)=>{
        event.preventDefault();
        /* console.log(this.state.term); */
        this.props.SearchProduct(this.state.term)
    }

    render(){
        return(
            <>
            <div className="bar">
            <form className="ui form" onSubmit={this.onFormSubmit}>
                <div className="field">
                    <input 
                    placeholder="Search Title Artwork"
                    onChange={(e) => this.setState({term : e.target.value})}
                    value={this.state.term}
                    />
                </div>
            </form>
            </div>
          
            </>
        )
    }

}

export default Search