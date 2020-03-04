module.exports = function() {
  const authSplit = process.env.DB_AUTH ? process.env.DB_AUTH.split(':') : ['', ''];
  const dbUser = authSplit[0];
  //if ending with an "@" then remove because it is intended to go in a db url
  const dbPassword = authSplit[1] && authSplit[1].replace(/@$/, '');
  return {
    database: process.env.DB_NAME,
    username: dbUser,
    password: dbPassword,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
    host: process.env.DB_HOST,
    dialect: 'postgres'
  };
}