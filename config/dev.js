const Bundler = require('parcel-bundler');
const mockMiddleware = require('mock').middleware;
const app = require('express')();
const parseArgs = require('minimist')(process.argv.slice(2));
const project = parseArgs._[0];
const chalk = require('chalk');
const opn = require('opn');
const getPort = require('get-port');

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
};

const bundler = new Bundler(file, options);

app.use(mockMiddleware);
app.use(bundler.middleware());

getPort({ port: [8080] }).then(port => {
  app.listen(port, () => {
    opn(`http://localhost:${port}/`);
  });
});
