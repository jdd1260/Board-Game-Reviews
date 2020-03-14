import React, { useState } from 'react';
import './index.scss';

import Login from "../login";

const storageName = 'userName';

function App() {
  const [user, setUser] = useState(localStorage.getItem(storageName));

  function storeUser(name) {
    if (name) {
      localStorage.setItem(storageName, name);
      setUser(name);
    } else {
      localStorage.removeItem(storageName);
      setUser(undefined);
    }
  }

  if (!user) {
    return <Login setUser={storeUser} />;
  } else {
    return (
      <div className="App">
        <header>
          Hi, { user }! <button onClick={() => storeUser()}> Log Out </button>
        </header>
        
      </div>
    );
  }
}

export default App;
