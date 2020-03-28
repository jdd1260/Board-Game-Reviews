import React, { useEffect, useState } from 'react';
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
      <h2> Flags </h2>
      <h4>Flagged Reviews</h4>
      <table>
        <thead>
          <tr>
            <th> Action </th>
            <th> Reviewer </th>
            <th> Game </th>
            <th> Rating </th>
            <th> Comment</th>
          </tr>
        </thead>
        <tbody>
          { flags.flaggedReviews && flags.flaggedReviews.map(flag => (
            <tr key={flag.flagId}>
              <td> <button onClick={() => deleteReviewFlag(flag.id).then(fetchFlags) } >Remove Flag</button> </td>
              <td> {flag.reviewerId } </td>
              <td> {flag.gameName} </td>
              <td> {flag.rating} </td>
              <td>{flag.comment} </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h4>Flagged Reviewers</h4>
      <table>
        <thead>
          <tr>
            <th> Action </th>
            <th> Reviewer </th>
            <th> Reviews </th>
          </tr>
        </thead>
        <tbody>
          { flags.flaggedReviewers && flags.flaggedReviewers.map(flag => (
            <tr key={flag.reviewerId}>
              <td> <button onClick={() => deleteReviewerFlag(flag.reviewerId).then(fetchFlags)}>Remove Flag</button> </td>
              <td> {  flag.reviewerId } </td>
              <td> 
                <Collapse name="Reviews">
                  <Reviews reviewerId={flag.reviewerId} hideReviewer={true}/>
                </Collapse> 
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Flags;
