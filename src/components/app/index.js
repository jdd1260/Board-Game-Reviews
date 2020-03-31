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
import Flags from "../flags";
import { getUser, logOut } from "../../api";


function App({ router }) {
  const Router = router || BrowserRouter;

  const [user, setUser] = useState(getUser());

  const logOutUser = () => {
    logOut();
    setUser(undefined);
  }

  if (!user) {
    return <Login setUser={setUser} />;
  } else {
    return (
      <div className="App">
        <header>
          Hi, { user }! <button onClick={logOutUser}> Log Out </button>
        </header>
        <Router>
          <Switch>
            <Route path={`/games/:gameId`} component={Game} />
          </Switch>
          <Switch>
            <Route exact default path={`/games`} component={GameList} />
          </Switch>
          <Switch>
            <Route exact path={`/flags`} component={Flags} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
