import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

import './index.scss';

import { getGameInfo } from "../../api/games";
import Reviews from "../reviews";

function renderLinkList(items, field) {
  return <React.Fragment>
    { items.map((item, index) => (
    <React.Fragment key={item}>
      {index > 0 && ', '}<Link to={`/games?field=${field}&item=${item}`}>{item}</Link>
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
    <div id="Game">
      { gameInfo &&
        <TableContainer>
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell> Name </TableCell>
                <TableCell> { gameInfo.name } </TableCell>
              </TableRow>
              <TableRow>
                <TableCell> Thumbnail </TableCell>
                <TableCell> <img src={ gameInfo.thumbnail } alt={gameInfo.name} /> </TableCell>
              </TableRow>
              <TableRow>
                <TableCell> URL </TableCell>
                <TableCell> 
                  <a 
                    href={ 'https://www.boardgamegeek.com/boardgame/' + gameId } 
                    target="_blank" 
                    rel="noopener noreferrer"
                  > 
                    BGG Link 
                  </a> 
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell> Categories </TableCell>
                <TableCell> 
                  {renderLinkList(gameInfo.categories, 'category') } 
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell> Designers </TableCell>
                <TableCell> 
                  {renderLinkList(gameInfo.designers, 'designer') } 
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell> Mechanics </TableCell>
                <TableCell> 
                  {renderLinkList(gameInfo.mechanics, 'mechanic') } 
                </TableCell>            
              </TableRow>
              <TableRow>
                <TableCell> Your Custom Rank </TableCell>
                <TableCell> { gameInfo.custom_rank } </TableCell>
              </TableRow>
              <TableRow>
                <TableCell> Your Custom Average </TableCell>
                <TableCell> { gameInfo.custom_avg } </TableCell>
              </TableRow>
              <TableRow>
                <TableCell> Your Custom Number of Reviews </TableCell>
                <TableCell> { gameInfo.review_count } </TableCell>
              </TableRow>
              <TableRow>
                <TableCell> BGG Rank </TableCell>
                <TableCell> { gameInfo.bgg_rank } </TableCell>
              </TableRow>
              <TableRow>
                <TableCell> BGG Average </TableCell>
                <TableCell> { gameInfo.bgg_average } </TableCell>
              </TableRow>
              <TableRow>
                <TableCell> BGG Median </TableCell>
                <TableCell> { gameInfo.bgg_median } </TableCell>
              </TableRow>
              <TableRow>
                <TableCell> BGG Number of Reviews </TableCell>
                <TableCell> { gameInfo.bgg_num_reviews } </TableCell>
              </TableRow>
              <TableRow>
                <TableCell> BGG Score </TableCell>
                <TableCell> { gameInfo.bgg_score } </TableCell>
              </TableRow>
              <TableRow>
                <TableCell> Play Time (average/min/max) </TableCell>
                <TableCell> { gameInfo.play_time } / { gameInfo.min_play_time } / { gameInfo.max_play_time } </TableCell>
              </TableRow>
              <TableRow>
                <TableCell> Number of Players (min/max) </TableCell>
                <TableCell> { gameInfo.min_players } / { gameInfo.max_players } </TableCell>
              </TableRow>
              <TableRow>
                <TableCell> Minimum Age </TableCell>
                <TableCell> { gameInfo.min_age } </TableCell>
              </TableRow>
              <TableRow>
                <TableCell> Description </TableCell>
                <td dangerouslySetInnerHTML={ { __html: gameInfo.description }} /> 
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      }
      <h2> Reviews </h2>
      <Reviews gameId={gameId} />
    </div>
  )
}

export default Game;
