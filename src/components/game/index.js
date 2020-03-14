import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
// import './index.scss';

import { getGameInfo } from "../../api/games";

function Game() {
  const { gameId } = useParams();
  const [gameInfo, setGameInfo] = useState();

  useEffect(() => {
    async function fetchGameInfo() {
      setGameInfo(undefined);
      const info = await getGameInfo(gameId);
      setGameInfo(info);
    }
    fetchGameInfo();
  }, [gameId]);

  return (
    <div className="Game">
      { gameInfo &&
        <table>
          <tbody>
            <tr>
              <td> Name </td>
              <td> { gameInfo.name } </td>
            </tr>
            <tr>
              <td> URL </td>
              <td> <a href={ gameInfo.url }> BGG Link </a> </td>
            </tr>
            <tr>
              <td> Description </td>
              <td> { gameInfo.description } </td>
            </tr>
            <tr>
              <td> Categories </td>
              <td> { gameInfo.categories.join(', ') } </td>
            </tr>
            <tr>
              <td> Designers </td>
              <td> { gameInfo.designers.join(', ') } </td>
            </tr>
            <tr>
              <td> Mechanics </td>
              <td> { gameInfo.mechanics.join(', ') } </td>
            </tr>
            <tr>
              <td> BGG Rank </td>
              <td> { gameInfo.bgg_rank } </td>
            </tr>
            <tr>
              <td> BGG Average </td>
              <td> { gameInfo.bgg_average } </td>
            </tr>
            <tr>
              <td> BGG Median </td>
              <td> { gameInfo.bgg_median } </td>
            </tr>
            <tr>
              <td> BGG Number of Reviews </td>
              <td> { gameInfo.bgg_num_reviews } </td>
            </tr>
            <tr>
              <td> BGG Score </td>
              <td> { gameInfo.bgg_score } </td>
            </tr>
            <tr>
              <td> Play Time (average/min/max) </td>
              <td> { gameInfo.play_time } / { gameInfo.min_play_time } / { gameInfo.max_play_time } </td>
            </tr>
            <tr>
              <td> Number of Players (min/max) </td>
              <td> { gameInfo.min_players } / { gameInfo.max_players } </td>
            </tr>
            <tr>
              <td> Minimum Age </td>
              <td> { gameInfo.min_age } </td>
            </tr>
          </tbody>
        </table>
      }
    </div>
  )
}

export default Game;
