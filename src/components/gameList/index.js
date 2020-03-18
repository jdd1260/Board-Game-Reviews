import React, { useEffect, useState } from 'react';
import { useLocation, Link } from "react-router-dom";
import { parse } from "qs";
// import './index.scss';

import { getGames } from "../../api/games";

function GameList() {
  const { search } = useLocation();
  const { field, item } = parse(search, { ignoreQueryPrefix: true });

  const [games, setGames] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    async function fetchGameInfo() {
      setGames([]);
      const list = await getGames({ field, item, page });
      setGames(list);
    }
    fetchGameInfo();
  }, [field, item, page]);

  return (
    <div className="GameList">
      <h2>
      { field ? 
        `${ field}: ${item}`
        : 'Games'
      }</h2>
      <Link to="/games">Reset</Link>
      <table>
        <thead>
          <tr>
            <th> BGG Rank </th>
            <th> Game </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          { games && games.map(game => (
            <tr key={game.id}>
              <td> {game.bgg_rank } </td>
              <td> <Link to={'/games/' + game.id} > {game.name} </Link></td>
              <td> <img width="60" src={ game.thumbnail } alt={game.name} /> </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={ () => setPage(0) } >Go to Page 0</button>
          { page > 0 && <button onClick={ () => setPage(page - 1) } >Go to Prev Page</button> }
        Page { page }
        <button onClick={ () => setPage(page + 1) } >Go to Next Page</button>
      </div>
    </div>
  )
}

export default GameList;
