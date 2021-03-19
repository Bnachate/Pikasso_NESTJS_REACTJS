import React, { useState, useEffect } from 'react'
import '../nav.css'
import logo from '../images/Logo.png'
import cart from '../images/cart.png'
import profile from '../images/artists.png'

import { Link, Redirect } from 'react-router-dom'
import Login from './login'



function Nav({setMainLoggedIn, idMain, setIdMain, setRedirectAfterLogout, redirectAfterLogout, setAdmin}) {
    const [ loggedIn, setLoggedIn ] = useState(false)
    const [ show, setShow ] = useState(false)
    const [ id, setId ] = useState('')
    const usernameStorage = localStorage.getItem('username');
    const adminStorage = localStorage.getItem('admin');
    useEffect(() => {
        
        if(localStorage.id){
            setLoggedIn(true)
           
        }
        setId(idMain)
    },[])

    return (
    
        <div className="navigation ">
            <div className="logoNav">
            
            <Link onClick={() => {window.location.href="/"}}><img style={{width: 100, height:70}} src={logo} alt="pikasso logo" /></Link>
            </div>
            <div>
                
            </div>
            <div className="navLinks">
                { loggedIn === false ? 
                    <div className="actionNav">
                    <Link to="/register">
                        <button >Register</button>
                    </Link>
                    <button onClick={() => !show ? setShow(true) : setShow(false)}> Login</button>
                    {show && <Login setLoggedIn={setLoggedIn} setMainLoggedIn={setMainLoggedIn} setIdMain={setIdMain} setAdmin={setAdmin}/>}
                    
                    
                </div>
                    :
                    <div className="actionNav " style={{marginRight:40, display: "table"}}>
                        <Link onClick={() => {window.location.href="/cart"}}>
                            <div class="item" style={{display: "table-cell",}}>
                            <img height="40px" width="40px" color="white" style={{marginRight: 10}} src={cart} alt="cart logo"/> 
                            </div>   
                        </Link>
                        <Link onClick={() => {window.location.href="/artistList"}}>
                        <div className="item" style={{display: "table-cell"}}>
                            <img height="40px" width="40px" src={profile} alt="profile logo"/>
                        </div>
                        </Link> 
                        
                        <div className="item " style={{display: "table-cell", verticalAlign:"middle"}}>
                        {redirectAfterLogout &&<Redirect to="/"/>}
                        
                        <div className="ui compact menu" style={{backgroundColor: "#000000", height: 30,}}>
                            <div className="ui simple dropdown item" style={{backgroundColor: "#000000", color: "#ffffff", width: 30, marginRight: 20}}>
                                <strong style={{color: "#5deed7", fontSize:15}}>{usernameStorage}</strong>
                                    <i className="dropdown icon"></i>

                                    {adminStorage !== "false"? (<div className="menu">
    
                                        <div className="item"><Link onClick={() => {window.location.href=`/seller/${idMain}`}}><h4 className="links">Profile</h4></Link> </div>
                                        <div className="item"><Link onClick={() => {window.location.href="/admin-users"}}><h4>Admin</h4></Link></div>
                                        <div className="item" style={{marginTop:  5}} onClick={ () => {
                                                        localStorage.clear()
                                                        setIdMain('')
                                                        setMainLoggedIn(false)
                                                        setRedirectAfterLogout(true)
                                                        setLoggedIn(false);
                                                        }}><strong  style={{color: "#000000", textAlign: "center", marginLeft: 10}}>Log out</strong></div>
                                    </div>) 
                                    : 
                                    (<div className="menu">
    
                                    <div className="item"><Link  to={`/seller/${idMain}`}><h4 className="links">Profile</h4></Link> </div>
                                    <div className="item" onClick={ () => {
                                                    localStorage.clear()
                                                    setIdMain('')
                                                    setMainLoggedIn(false)
                                                    setRedirectAfterLogout(true)
                                                    setLoggedIn(false);
                                                    }}><strong  style={{color: "#000000", textAlign: "center", marginLeft: 10}}>Log out</strong></div>
                                </div>) }
                                 
                            </div>
                        </div> 
                        </div>
                    </div>
                    
                    }
                </div>
                
  
               
            

            </div>
      
        
       
        
    
  );
}

export default Nav;
