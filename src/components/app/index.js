import React, { useState } from 'react';
import {
  HashRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';

import './index.scss';

import Login from "../login";
import Game from "../game";
import GameList from "../gameList";
import Flags from "../flags";
import Home from "../home";
import { getUser, logOut } from "../../api";

function App({ router }) {
  const Router = router || HashRouter;

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
        <Router>
          <AppBar position="static" className="header">
            <Tabs>
              <Link to="/"><Tab label="Home" href="/" /></Link>
              <Link to="/games"><Tab label="Games" href="/games" /></Link>
              <Link to="/flags"><Tab label="Flags" href="/flags" /></Link>
              <Button color="inherit" className="logout" onClick={logOutUser}> Not { user }? Log Out </Button>
            </Tabs>
          </AppBar>

          <Switch>
            <Route exact path={`/games/:gameId`} component={Game} />
          </Switch>
          <Switch>
            <Route exact path={`/games`} component={GameList} />
          </Switch>
          <Switch>
            <Route exact path={`/flags`} component={Flags} />
          </Switch>
          <Switch>
            <Route exact path={`/`} component={Home} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
