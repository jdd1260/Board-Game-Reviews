import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';

import './index.scss';

import Reviews from "../reviews";
import Collapse from "../collapse";
import { getFlaggedReviews, getFlaggedReviewers, deleteReviewerFlag,  deleteReviewFlag } from "../../api/flags";

function Flags() {
  const [flags, setFlags] = useState({});

  const fetchFlags = async () => {
    setFlags([]);
    const [flaggedReviews, flaggedReviewers] = await Promise.all([getFlaggedReviews(), getFlaggedReviewers()]);
    setFlags({ flaggedReviews, flaggedReviewers });
  };

  useEffect(() => {
    fetchFlags();
  }, []);

  return (
    <div className="Flags">
      <h3>Flagged Reviews</h3>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell> Action </TableCell>
              <TableCell> Reviewer </TableCell>
              <TableCell> Game </TableCell>
              <TableCell> Rating </TableCell>
              <TableCell> Comment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { flags.flaggedReviews && flags.flaggedReviews.map(flag => (
              <TableRow key={flag.flagId}>
                <TableCell> 
                  <Button 
                    onClick={() => deleteReviewFlag(flag.id).then(fetchFlags) }
                    variant="contained" 
                    color="primary"
                    size="small"
                  >
                    Remove Flag
                  </Button> 
                </TableCell>
                <TableCell> {flag.reviewerId } </TableCell>
                <TableCell> {flag.gameName} </TableCell>
                <TableCell> {flag.rating} </TableCell>
                <TableCell>{flag.comment} </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <h3>Flagged Reviewers</h3>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell> Action </TableCell>
              <TableCell> Reviewer </TableCell>
              <TableCell> Reviews </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { flags.flaggedReviewers && flags.flaggedReviewers.map(flag => (
              <TableRow key={flag.reviewerId}>
                <TableCell> 
                  <Button 
                    onClick={() => deleteReviewerFlag(flag.reviewerId).then(fetchFlags)}
                    variant="contained" 
                    color="primary"
                    size="small"
                  >
                    Remove Flag
                  </Button> 
                </TableCell>
                <TableCell> {  flag.reviewerId } </TableCell>
                <TableCell> 
                  <Collapse name="Reviews">
                    <Reviews reviewerId={flag.reviewerId} hideReviewer={true}/>
                  </Collapse> 
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Flags;
