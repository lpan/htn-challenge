const renderHTML = (jsPath, cssPath) => {
  const cssTag = `<link rel="stylesheet" href="${cssPath}">`;

  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${process.env.NODE_ENV === 'production' ? cssTag : ''}
        <title>Hack the North Frontend Challenge</title>
      </head>
      <body>
        <div id="app"></div>
        <script src="${jsPath}"></script>
      </body>
    </html>
    `;
};

module.exports = {
  renderHTML,
};
