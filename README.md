# Board Game Geek Review Explorer

For a class project, I am building a website to explore data from [BoardGameGeek](boardgamegeek.com). I am using data obtained from [Kaggle](https://www.kaggle.com/jvanelteren/boardgamegeek-reviews). The project loads game data and review data into a PostgreSQL databases, then uses a NodeJS Express HTTP server to create a REST API. This API is consumed by a website using [create-react-app](https://facebook.github.io/create-react-app).

## Create the database

Locally, I suggest using Docker with PostgreSQL, and you can run `sh server/db/setup-db.sh` to create a container for your database to live in. If you do that then the `.env-example` file can be copied to `.env` and you will have everything you need to connect your server to the database. If you go with a different location for your database you will need a `.env` file to match your specification. 

## Create DB instance

Once your database connection is configured, run `yarn && yarn create-db && yarn migrate-db` to create your database instance and tables that will be used. 

## Populating Data

Download the review data from Kaggle, and unzip the directory `boardgamegeek-reviews` into `scripts/`. Then you can run `cd scripts && node genGames.js && node genReviews.js`. This will create files for you in the `data` directory that can then be uploaded to your DB using your favorite DB admin tool (or the `COPY` command in PostgreSQL).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
