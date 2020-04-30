import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'; 

import './index.scss';

import { logIn } from "../../api";

function Login({ setUser }) {
  const [name, setUserName] = useState();
  const isLoading = false;
  
  async function storeUser() {
    if (name) {
      const loggedIn = await logIn(name);
      if (loggedIn) {
        setUser(name);
      } else {
        alert("User named " + name + " is not allowed");
      }
    } 
  }

  const keyPress = (e) => {
    if (e.keyCode === 13) { 
      storeUser();
    }
  }

  return (
    <div className="Login">
      <div>
      <TextField
        placeholder="User Name"
        onChange={ e => setUserName(e.target.value)}
        onKeyDown={keyPress}
        disabled={isLoading}
        variant="outlined"
        className="input"
      />
      </div>
      <div>
        <Button onClick={storeUser} variant="contained" color="primary"> Log In </Button>
      </div>
    </div>
  )
}

export default Login;
