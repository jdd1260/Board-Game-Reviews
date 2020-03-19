import React from 'react';
import { useForm } from 'react-hook-form'

import './index.scss';

import { logIn } from "../../api";

function Login({ setUser }) {
  const { register, handleSubmit } = useForm()
  
  async function storeUser({name}) {
    if (name) {
      const loggedIn = await logIn(name);
      if (loggedIn) {
        setUser(name);
      } else {
        alert("User named " + name + " is not allowed");
      }
    } 
  }

  return (
    <form onSubmit={handleSubmit(storeUser)} className="Login">
      Enter Your Name to Log In: <br/>
      <input name="name" placeholder="name" ref={register({ required: true })} />
      <input type="submit" className="button" />
    </form>
  )
}

export default Login;
