import React from 'react';

// import './index.scss';

const Review = ({ review }) => (
  <div className="Review">
    { review && (
      <table>
        <tbody>
          <tr>
            <td>Game</td>
            <td>{review.game}</td>
          </tr>
          <tr>
            <td>Reviewer</td>
            <td>{review.reviewer}</td>
          </tr>
          <tr>
            <td>Rating</td>
            <td>{review.rating}</td>
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
