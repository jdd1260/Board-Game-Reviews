import React, { useEffect, useState, useCallback } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import './index.scss';

import Review from "../review";
import { getReviews } from "../../api/reviews";

function Reviews({ gameId, reviewerId, hideReviewer }) {
  const [reviews, setReviews] = useState();

  const fetchReviews = useCallback(async () => {
    setReviews(undefined);
    const data = await getReviews({ gameId, reviewerId });
    setReviews(data);
  }, [gameId, reviewerId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return (
    <div id="Reviews">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              { !hideReviewer && 
                <TableCell>
                  Reviewer
                </TableCell>
              }
              { hideReviewer &&
                <TableCell>
                  Game
                </TableCell>
              }
              <TableCell>
                Rating
              </TableCell>
              <TableCell>
                Comment
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { reviews &&
              reviews.map(r => <Review key={r.id} review={r} reload={fetchReviews} hideReviewer={hideReviewer} />)
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Reviews;
