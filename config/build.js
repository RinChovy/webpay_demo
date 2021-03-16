const Bundler = require('parcel-bundler');
const parseArgs = require('minimist')(process.argv.slice(2));
const project = parseArgs._[0];
const chalk = require('chalk');

if (!project) {
  console.log(chalk.red('缺少项目名称!'));
  return false;
}

const file = `src/${project}/index.html`;
const options = {
  outDir: `dist/${project}`,
  publicUrl: `/${project}`,
  minify: true,
  logLevel: 3,
  sourceMaps: false,
  watch: false,
  cache: false,
};

const bundler = new Bundler(file, options);
bundler.bundle();
