const parseArgs = require('minimist')(process.argv.slice(2));
const project = parseArgs._[0];
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  outDir: `dist/${project}`,
  sourceMaps: !isProduction,
  minify: isProduction,
  publicUrl: `/${project}`,
};
