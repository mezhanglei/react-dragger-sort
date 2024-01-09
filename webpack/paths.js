const path = require("path");
const fs = require('fs');
// 返回运行当前脚本的工作目录的路径。
const appRoot = fs.realpathSync(process.cwd());
// 加载根目录下面的其他目录
const resolveApp = relativePath => path.resolve(appRoot, relativePath);
// 打包入口
const srcPath = resolveApp('src');
// 开发环境入口
const examplePath = resolveApp('example');
// 打包输出目录
const outputPath = resolveApp('lib');
// 开发环境下的输出目录
const devOutputPath = resolveApp('dist');
// node_modules的目录
const nodeModulesPath = resolveApp('node_modules');
// 页面模板
const appHtml = path.join(appRoot, 'public/index.html');
// 引入配置
const configs = require('./configs.js');
const isDev = configs.isDev;
// 合并为一个对象输出
module.exports = {
  appRoot,
  srcPath,
  examplePath,
  outputPath,
  devOutputPath,
  nodeModulesPath,
  appHtml,
  // 访问静态资源的路径：当为'./'路径时则相对于index.html，/开头时则相对于服务器根路径, 完整域名时则是以域名为前缀访问
  publicPath: isDev ? '/' : './',
  babelrcPath: path.join(appRoot, './.babelrc'),
  mockPath: path.join(srcPath, 'mock')
};
