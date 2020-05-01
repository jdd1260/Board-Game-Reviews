import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import FlagIcon from '@material-ui/icons/Flag';
import Fab from '@material-ui/core/Fab';

import { flagReview, flagReviewer } from '../../api/flags';

const Review = ({ review, reload, hideReviewer }) => (
  <TableRow>
    { !hideReviewer && 
      <TableCell>
        {review.reviewerId} 
        <div className="flag">
          <Fab size="small" color="secondary" onClick={ () => flagReviewer(review.reviewerId).then(reload) }>
            <FlagIcon/>
          </Fab>
        </div>
      </TableCell>
    }
    { hideReviewer &&
      <TableCell>
        {review.gameName} 
      </TableCell>
    }
    <TableCell>
      {review.rating}
    </TableCell>
    <TableCell>
      <div dangerouslySetInnerHTML={ { __html: review.comment }} />
      <div className="flag">
        <Fab size="small" color="secondary" onClick={ () => flagReview(review.id).then(reload) }>
          <FlagIcon/>
        </Fab>
      </div>
    </TableCell>
  </TableRow>
);

export default Review;
