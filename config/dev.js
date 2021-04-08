const Bundler = require('parcel-bundler');
const mockMiddleware = require('mock').middleware;
const express = require('express');
const parseArgs = require('minimist')(process.argv.slice(2));
const project = parseArgs._[0];
const chalk = require('chalk');
const opn = require('opn');
const getPort = require('get-port');
const app = express();

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
  // publicUrl: `/${project}`,
};

const bundler = new Bundler(file, options);

app.use(bundler.middleware());
app.use(mockMiddleware);

getPort({ port: [8080] }).then(port => {
  app.listen(port, () => {
    bundler.on('buildEnd', () => {
      opn(`http://localhost:${port}/`);
    });
  });
});
