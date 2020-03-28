import React from 'react';

// import './index.scss';

import { flagReview, flagReviewer } from '../../api/flags';

const Review = ({ review, reload, hideReviewer }) => (
  <div className="Review">
    { review && (
      <table border="1">
        <tbody>
          { !hideReviewer && 
            <tr>
              <td>Reviewer</td>
              <td>
                {review.reviewerId} 
                <button onClick={() => flagReviewer(review.reviewerId).then(reload)} > Flag Reviewer </button>
                <button onClick={() => flagReview(review.id).then(reload)} > Flag Review </button>
              </td>
            </tr>
          }
          { hideReviewer &&
            <tr>
              <td>Game</td>
              <td>
                {review.gameName} 
              </td>
            </tr>
          }
          <tr>
            <td>Rating</td>
            <td>
              {review.rating}
            </td>
          </tr>
          <tr>
            <td>Comment</td>
            <td>{review.comment}</td>
          </tr>
        </tbody>
      </table>
    )}
  </div>
);

export default Review;
