import React, { useEffect, useState, useCallback } from 'react';
// import './index.scss';

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
    <div className="Reviews">
      { reviews &&
        reviews.map(r => <Review key={r.id} review={r} reload={fetchReviews} hideReviewer={hideReviewer} />)
      }
    </div>
  )
}

export default Reviews;
