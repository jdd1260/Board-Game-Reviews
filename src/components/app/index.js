import React, { useState } from 'react';
import {
  BrowserRouter,
  Link,
  Switch,
  Route
} from "react-router-dom";

import './index.scss';

import Login from "../login";
import Game from "../game";

const storageName = 'userName';

function App({ router }) {
  const Router = router || BrowserRouter;

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
        <Router>
          <Link to={ '/games/' + 1}>Game 1</Link> <br/>
          <Link to={ '/games/' + 2}>Game 2</Link> <br/>
          <Link to={ '/games/' + 3}>Game 3</Link> <br/>
          <Link to={ '/games/' + 4}>Game 4</Link>
          <Switch>
            <Route path={`/games/:gameId`}>
              <Game />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
