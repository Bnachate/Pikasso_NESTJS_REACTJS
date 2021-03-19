import React from 'react'
import '../register.css'
import  server from '../server'

import { useForm } from "react-hook-form"
import { useState } from "react"
import  { Redirect } from 'react-router-dom'
import axios from 'axios'

function Login({setLoggedIn, setMainLoggedIn, setIdMain, setAdmin} ) {
    
    const { register, handleSubmit } = useForm();
    const [ redirect, setRedirect ] = useState(false)
    
    const onSubmit = (data) => {
        axios({
            method: 'post',
            url:`${server}/users/login`,
            data:{
                "username": data.username,
                "password": data.password,
            }})
            .then(response => {
               /*  console.log(response) */
                if(response.data==="wrong password") alert("wrong password")
                else{
                localStorage.setItem('id', response.data.id)
                localStorage.setItem('username', response.data.username)
                localStorage.setItem('admin', response.data.admin)
                // alert(`Welcome back ${response.data.username}`)
                if(response.data.admin==='true') setAdmin(true)
                setLoggedIn(true)
                setMainLoggedIn(true)
                setRedirect(true)
                setIdMain(localStorage.id)

                }
            })
            .catch(err => console.error(err))
                    
    }

  
  return (

       <div className="loginForm">

            <form onSubmit={handleSubmit(onSubmit)}>
                <input name="username" ref={register} type='text' placeholder='Type Username'/>
                <input name="password" ref={register} type='password' placeholder='Type Password'/>
                <input className="submit_but" type="submit"/> 
            </form>

        {redirect && <Redirect to="/"/>}
        {/* <Redirect to="/login"/> */}
        {/*  */}
       </div>
        
  );
}

export default Login;