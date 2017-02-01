const express = require('express');
const path = require('path');

const app = express();

if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack');
  const webpackConfig = require('../webpack.config');
  const compiler = webpack(webpackConfig);

  // webpack hot module replacement middlewares
  app.use(require('webpack-dev-middleware')(compiler,
    {
      noInfo: false,
      publicPath: webpackConfig.output.publicPath,
      quiet: false,
      watchOptions: {
        aggregateTimeout: 300,
        poll: true
      },
      index: "index.html",
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

app.get('/', (req, res) => {
  res.sendFile(path.join(PUBLIC_PATH, 'index.html'));
});

app.listen(PORT, () => { console.log(`Server listens on ${PORT}`); });
