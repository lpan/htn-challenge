const express = require('express');
const path = require('path');

const { renderHTML } = require('./templates');

const app = express();

if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack');
  const webpackConfig = require('../webpack.config');

  const compiler = webpack(webpackConfig);

  // webpack hot module replacement middlewares
  app.use(require('webpack-dev-middleware')(compiler,
    {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath,
      quiet: true,
      watchOptions: {
        aggregateTimeout: 300,
        poll: true
      },
      stats: { colors: true },
      reporter: null,
      serverSideRender: false,
    })
  );

  app.use(require('webpack-hot-middleware')(compiler));
}

// CONSTANTS
const PORT = 8080;
const PUBLIC_PATH = path.join(__dirname, '..', 'public');

app.use(express.static(PUBLIC_PATH));

// use react-router to handle routes
app.get('*', (req, res) => {
  res.send(renderHTML('/bundle.js', '/bundle.css'));
});

app.listen(PORT, () => { console.log(`Server listens on ${PORT}`); });
