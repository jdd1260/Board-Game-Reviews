const csv = require('@fast-csv/parse');
const writeCSV = require('@fast-csv/format').format;
const toNum = require('lodash/toNumber');
const fs = require('fs');
const JSON5 = require('json5')

const toNumber = (num) => {
  const result = toNum(num);
  if (isNaN(result)) return;
  else return result;
}

const gamesFile = fs.createWriteStream("../data/games.csv");
const gamesStream = writeCSV({ headers: true });
gamesStream.pipe(gamesFile);

const categoriesFile = fs.createWriteStream("../data/game_categories.csv");
const categoriesStream = writeCSV({ headers: true });
categoriesStream.pipe(categoriesFile);

const designersFile = fs.createWriteStream("../data/game_designers.csv");
const designersStream = writeCSV({ headers: true });
designersStream.pipe(designersFile);

const mechanicsFile = fs.createWriteStream("../data/game_mechanics.csv");
const mechanicsStream = writeCSV({ headers: true });
mechanicsStream.pipe(mechanicsFile);

function parseArray(arr, id, field,stream) {
  if (arr) {
    const parsed = JSON5.parse(arr);
    const converted = parsed.map(val => ({ gameId: id, [field]: val }));
    converted.forEach(r => stream.write(r))
  }
}

function parseGames() {
  csv.parseFile(
    './boardgamegeek-reviews/games_detailed_info.csv', 
    { headers: true, trim: true }
    )
    .on('data', (data) => {
      const formatted = {
        id: data.id,
        name: data.primary,
        thumbnail: data.thumbnail,
        bgg_rank: toNumber(data['Board Game Rank']),
        bgg_average: toNumber(data.average),
        bgg_num_reviews: toNumber(data.usersrated),
        bgg_score: toNumber(data.bayesaverage),
        play_time: toNumber(data.playingtime),
        min_play_time: toNumber(data.minplaytime),
        max_play_time: toNumber(data.maxplaytime),
        min_players: toNumber(data.minplayers),
        max_players: toNumber(data.maxplayers),
        min_age: toNumber(data.minage),
        description: data.description,       
      }
      gamesStream.write(formatted);
      parseArray(data.boardgamecategory, data.id, 'category', categoriesStream);
      parseArray(data.boardgamedesigner, data.id, 'designer', designersStream);
      parseArray(data.boardgamemechanic, data.id, 'mechanic', mechanicsStream);
    })
    .on('end', () => {
      gamesStream.end();
      categoriesStream.end();
    });
}

parseGames();
