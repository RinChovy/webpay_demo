const parseArgs = require('minimist')(process.argv.slice(2));
const project = parseArgs._[0];
const isProduction = process.env.NODE_ENV === 'production';

/**
 * 针对服务配置构建文件
 * 勿修改
 */

module.exports = {
  outDir: `dist/${project}`,
  sourceMaps: !isProduction,
  minify: isProduction,
  publicUrl: `/${project}`,
};
