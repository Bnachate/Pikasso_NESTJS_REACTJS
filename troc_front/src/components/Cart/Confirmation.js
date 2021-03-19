import React from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


const Confirmation = () => {
    return (
        <div style={{ marginTop: "45px" }}>
            <h1>Thank you for your purchase</h1>
            <h3 style={{ marginTop: "45px", marginBottom: "45px" }}>We hope to see you soon on our website :)</h3>
            <Link to='/'><Button style={{ backgroundColor: "#dd96c5" }}>Return to homepage</Button></Link>
        </div>
    )
}

export default Confirmation;