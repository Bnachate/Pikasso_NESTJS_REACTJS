import React from 'react';



class Search extends React.Component{

    state = { description :""};

    onFormSubmit =(event)=>{
        event.preventDefault();
        /* console.log(this.state.description); */
        this.props.onSubmit(this.state.description)
    }


    render(){
        return(
            <>
                    <div className="ui segment ">
                            <form className="ui form" onSubmit={this.onFormSubmit}>
                                <div className="field">
                                    <label>Search description</label>
                                        <input 
                                        placeholder="description"
                                        onChange={(e) => this.setState({description : e.target.value})}
                                         value={this.state.description}
                                        />
                                </div>
                            </form>
                    </div>
            </>
        )
    }

}

export default Search