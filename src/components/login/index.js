import React from 'react';
import { useForm } from 'react-hook-form'

import './index.scss';

function Login({ setUser }) {
  const { register, handleSubmit } = useForm()


  function submit({ name }) {
    setUser(name.trim());
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="Login">
      Enter Your Name to Log In: <br/>
      <input name="name" placeholder="name" ref={register({ required: true })} />
      <input type="submit" className="button" />
    </form>
  )
}

export default Login;
