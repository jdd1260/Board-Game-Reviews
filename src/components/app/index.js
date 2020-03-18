import React, { useState } from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";

import './index.scss';

import Login from "../login";
import Game from "../game";
import GameList from "../gameList";

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
          <Switch>
            <Route path={`/games/:gameId`}>
              <Game />
            </Route>
          </Switch>
          <Switch>
            <Route path={`/games`}>
              <GameList />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
