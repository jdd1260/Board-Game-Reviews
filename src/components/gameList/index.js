import React, { useEffect, useState } from 'react';
import { useLocation, Link } from "react-router-dom";
import { parse } from "qs";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import FirstPageIcon from '@material-ui/icons/FirstPage';

import './index.scss';

import { getGames } from "../../api/games";

function GameList() {
  const { search } = useLocation();
  const { field, item } = parse(search, { ignoreQueryPrefix: true });

  const [games, setGames] = useState([]);
  const [useCustomRanking, setUseCustomRanking] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => {
    async function fetchGameInfo() {
      setGames([]);
      const list = await getGames({ field, item, page }, useCustomRanking);
      setGames(list);
    }
    fetchGameInfo();
  }, [field, item, page, useCustomRanking]);

  return (
    <div id="GameList">
      <div>
      <h2 className="title">
        { field ? 
          `${ field}: ${item}`
          : 'All Games'
        }
        {
          field && <Link className="resetLink" to="/games">Reset</Link>
        }
      </h2>
      <h3 className="title switch">
        Use Custom Ranking?
        <Switch
          checked={useCustomRanking}
          onChange={() => setUseCustomRanking(!useCustomRanking)}
        />
      </h3>
      </div>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell> { useCustomRanking ? 'Custom Rank' : 'BGG Rank' } </TableCell>
              <TableCell> Game </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { games && games.map(game => (
              <TableRow key={game.id}>
                <TableCell> { useCustomRanking ? game.custom_rank : game.bgg_rank } </TableCell>
                <TableCell> <Link to={'/games/' + game.id} > {game.name} </Link></TableCell>
                <TableCell> <img width="60" src={ game.thumbnail } alt={game.name} /> </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="buttons">
        <Button variant="contained" color="primary" onClick={ () => setPage(0) }>
          <FirstPageIcon/>
        </Button>
        { page > 0 && 
          <Button variant="contained" color="primary" onClick={ () => setPage(page - 1) } >
            <NavigateBeforeIcon/>
          </Button>
        }
        Page { page + 1 }
        <Button variant="contained" color="primary" onClick={ () => setPage(page + 1) } >
          <NavigateNextIcon/>
        </Button>
      </div>
    </div>
  )
}

export default GameList;
