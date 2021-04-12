const Bundler = require('parcel-bundler');
const mockMiddleware = require('mock').middleware;
const express = require('express');
const parseArgs = require('minimist')(process.argv.slice(2));
const project = parseArgs._[0];
const chalk = require('chalk');
const opn = require('opn');
const getPort = require('get-port');
const app = express();
const history = require('connect-history-api-fallback');
const { join } = require('path');
const fs = require('fs');

if (!project) {
  console.log(chalk.red('缺少项目名称!'));
  return false;
}

const file = `src/${project}/index.html`;

const options = {
  logLevel: 3,
  sourceMaps: true,
  hmrPort: 0,
  cache: false,
  // production: true,
};

const bundler = new Bundler(file, options);
// app.use(express.static(__dirname + '../dist'));
// app.get('*', (req, res) => {
//   res.sendFile(join(__dirname, '../dist/index.html'));
// });

app.use(bundler.middleware());
app.use(mockMiddleware);

// app.use(
//   history({
//     index: join(__dirname, '../dist/index.html'),
//   })
// );

// app.use('/', bundler.middleware());

// app.use(bundler.middleware());

// app.use(express.static(join(__dirname, '../dist')));

// app.use('/dist', express.static(join(__dirname, '../dist')));

getPort({ port: [8081] }).then(port => {
  app.listen(port, () => {
    opn(`http://localhost:${port}/`);
  });
});
