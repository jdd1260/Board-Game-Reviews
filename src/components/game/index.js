import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
// import './index.scss';

import { getGameInfo } from "../../api/games";
import Reviews from "../reviews";

function renderLinkList(items, field) {
  return <React.Fragment>
    { items.map(item => (
    <React.Fragment key={item}>
      <Link to={`/games?field=${field}&item=${item}`}>{item}</Link>,
    </React.Fragment>
  ))} 
  </React.Fragment>
}

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
              <td> Thumbnail </td>
              <td> <img src={ gameInfo.thumbnail } alt={gameInfo.name} /> </td>
            </tr>
            <tr>
              <td> URL </td>
              <td> 
                <a 
                  href={ 'https://www.boardgamegeek.com/boardgame/' + gameId } 
                  target="_blank" 
                  rel="noopener noreferrer"
                > 
                  BGG Link 
                </a> 
              </td>
            </tr>
            <tr>
              <td> Categories </td>
              <td> 
                {renderLinkList(gameInfo.categories, 'category') } 
              </td>
            </tr>
            <tr>
              <td> Designers </td>
              <td> 
                {renderLinkList(gameInfo.designers, 'designer') } 
              </td>
            </tr>
            <tr>
              <td> Mechanics </td>
              <td> 
                {renderLinkList(gameInfo.mechanics, 'mechanic') } 
              </td>            
            </tr>
            <tr>
              <td> Your Custom Rank </td>
              <td> { gameInfo.custom_rank } </td>
            </tr>
            <tr>
              <td> Your Custom Average </td>
              <td> { gameInfo.custom_avg } </td>
            </tr>
            <tr>
              <td> Your Custom Number of Reviews </td>
              <td> { gameInfo.review_count } </td>
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
            <tr>
              <td> Description </td>
              <td dangerouslySetInnerHTML={ { __html: gameInfo.description }} /> 
            </tr>
          </tbody>
        </table>
      }
      <h2> Reviews </h2>
      <Reviews gameId={gameId} />
    </div>
  )
}

export default Game;
