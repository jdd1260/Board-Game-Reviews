const csv = require('@fast-csv/parse');
const writeCSV = require('@fast-csv/format').format;
const toNum = require('lodash/toNumber');
const fs = require('fs');

const reviewsFile = fs.createWriteStream("../data/reviews.csv");
const reviewsStream = writeCSV({ headers: true });
reviewsStream.pipe(reviewsFile);

const reviewersFile = fs.createWriteStream("../data/reviewers.csv");
const reviewersStream = writeCSV({ headers: true });
reviewersStream.pipe(reviewersFile);

const reviewers = {};
const toNumber = (num) => {
  const result = toNum(num);
  if (isNaN(result)) return;
  else return result;
}
function parseReviews() {
  csv.parseFile(
    './boardgamegeek-reviews/bgg-13m-reviews.csv', 
    { headers: true, trim: true }
    )
    .on('data', (data) => {
      const formatted = {
        reviewerId: data.user,
        gameId: data.ID,
        rating: toNumber(data.rating),
        comment: data.comment   
      }
      if (formatted.comment) {
        reviewers[data.user] = { id: data.user, name: data.user };
        reviewsStream.write(formatted);
      }
    })
    .on('end', () => {
      reviewsStream.end();
      Object.values(reviewers).forEach(reviewer => reviewersStream.write(reviewer));
      reviewersStream.end();
    });
}

parseReviews();
