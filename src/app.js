const http = require('http');
const chalk = require('chalk');
const path = require('path');
const conf = require('./config/defaultConfig');
const route = require('./helper/router');

// 创建 server
const server = http.createServer((req, res) => {
  const filePath = path.join(conf.root, req.url);
  route(req, res, filePath, conf);
});

server.listen(conf.port, conf.hostname, () => {
  const addr = `http://${conf.hostname}:${conf.port}`;
  console.info(`Server start at ${chalk.green(addr)}`);
});
