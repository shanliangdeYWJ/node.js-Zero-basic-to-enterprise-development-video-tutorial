module.exports = {
  root: process.cwd(), // 用户当前路径
  hostname: '127.0.0.1',
  port: 3000,
  // 根据正则匹配拓展名限制文件压缩类型
	compress: /\.(html|js|css|md)/,
  cache: {
    maxAge: 600,
    expires: true,
    cacheControl: true,
    lastModified: true,
    etag: true
  }
}
