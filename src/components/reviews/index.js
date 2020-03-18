import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
// import './index.scss';

import Review from "../review";
import { getReviews } from "../../api/reviews";

function Reviews() {
  const { gameId } = useParams();
  const [reviews, setReviews] = useState();

  useEffect(() => {
    async function fetchReviews() {
      setReviews(undefined);
      const data = await getReviews({ gameId });
      setReviews(data);
    }
    fetchReviews();
  }, [gameId]);

  return (
    <div className="Reviews">
      <h2> Reviews: { gameId } </h2>
      { reviews &&
        reviews.map(r => <Review key={r.id} review={r} />)
      }
    </div>
  )
}

export default Reviews;
