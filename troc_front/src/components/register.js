import React from 'react'
import '../register.css'
import  server from '../server'

import { useForm } from "react-hook-form"
import { useState } from "react"
import  { Redirect } from 'react-router-dom'
import axios from 'axios'





function Register() {
    
    const { register, handleSubmit } = useForm();
    const [ password, setPassword ] = useState();
    const [ password_conf, setPassword_Conf ] = useState();
    const [ username, setUsername ] = useState("");
    const [ redirect, setRedirect ] = useState(false)
    
    const onSubmit = (data) => {
        axios({
            method: 'post',
            url:`${server}/users`,
            data:{
                "username": data.username,
                "email": data.email,
                "password": data.password,
                "firstname": data.first_name,
                "lastname": data.last_name,
                "gender": data.gender
            }})
            .then( response => {
               /*  console.log(response) */
                if(response.status === 500) alert('error')
                else if(response.data.name === "MongoError") alert("username already taken")
                else if(response.data.status === "wrong email") alert("wrong email")
                else {
                    alert("Success") 
                    setRedirect(true)}
            })            
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }
    const handleChangePassword_Conf = (e) => {
        setPassword_Conf(e.target.value)
    }
    const handleUsername= (e) => {
        setUsername(e.target.value)
    }
  return (
    <div class="AuthContainer">

       <div className="registerForm">
           <h1>Register Form</h1>
           <form onSubmit={handleSubmit(onSubmit)}>
                <select name="gender" ref={register}>
                   <option value="M">M</option>
                   <option value="Ms">Ms</option>
                   <option value="Mrs">Mrs</option>
               </select>
               <input onChange={handleUsername} name="username" ref={register} type='text' placeholder='Type Username'/>
               {username !== "" && username.length < 4 ? <p className="pw_check">Careful, Username is too short</p> : null}
               <input name="first_name" ref={register} type='text' placeholder='Type First Name'/>
               <input name="last_name" ref={register} type='text' placeholder='Type Last Name'/>
               <input name="email" ref={register} type='text' placeholder='Type Email'/>
               <input onChange={handleChangePassword} name="password" ref={register} type='password' placeholder='Type Password'/>
               <input onChange={handleChangePassword_Conf} name="password_conf" ref={register} type='password' placeholder='Confirm Password'/>
               {password === password_conf && password !== "" ? <input className="submit_but" type="submit"/> : <p className="pw_check">Careful, passwords dont match</p> }
           </form>
        {redirect === true ? <Redirect to="/login"/>
         : null}
        
        {/*  */}
       </div>
       </div>  
  );
}

export default Register;