const {
  cache
} = require('../config/defaultConfig');
const chalk = require('chalk');
/**
 * 每次根据配置更改响应
 * @param {*} stats 
 * @param {*} res 
 */

function refreshRes(stats, res) {
  const {
    maxAge,
    expires,
    cacheControl,
    lastModified,
    etag
  } = cache;

  if (expires) {
    // expires 请求就在当前时间上添加一个绝对时间 因为是毫秒所以 乘以1000 最后转化成时间字符串
    res.setHeader('Expires', (new Date(Date.now() + maxAge * 1000)).toUTCString());
  }

  if (cacheControl) {
    res.setHeader('Cache-Control', `public, max-age=${maxAge}`);
  }

  if (lastModified) {
    res.setHeader('Last-Modified', stats.mtime.toUTCString());
  }

  if (etag) {
    res.setHeader('ETag', `${stats.size}-${stats.mtime.toUTCString()}`); // mtime 需要转成字符串，否则在 windows 环境下会报错
  }
}

module.exports = function isFresh(stats, req, res) {
  refreshRes(stats, res);

  const lastModified = req.headers['if-modified-since'];
  const etag = req.headers['if-none-match'];

  // 如果上述两个请求头都没有，可能是第一次请求，就返回false
  if (!lastModified && !etag) {
    console.info(`${chalk.red('!lastModified && !etag return false')}${chalk.yellow(':chalk.js')}`);
    return false;
  }
  // 不存在或者不是最新
  if (lastModified && lastModified !== res.getHeader('Last-Modified')) {
    console.info(`${chalk.red('lastModified && lastModified !== res.getHeader(\'Last-Modified\') return false')}${chalk.yellow(':chalk.js')}`);
    return false;
  }
  // 不存在或者不是最新
  if (etag && etag !== res.getHeader('ETag')) {
    console.info(`${chalk.red('etag && etag !== res.getHeader(\'ETag\') return false')}${chalk.yellow(':chalk.js')}`);
    return false;
  }

  return true;
};
