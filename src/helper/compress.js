const {createGzip,createDeflate} = require('zlib');
module.exports = (rs, req, res) => {
	const acceptEncoding = req.headers['accept-encoding'];
	// 两种情况不支持压缩 1. 浏览器声明不支持任何压缩 2. 拿到的东西服务器不支持
	if (!acceptEncoding || !acceptEncoding.match(/\b(gzip|dafault)\b/)) {
		return rs;
	} else if(acceptEncoding.match(/\bgzip\b/)){
		res.setHeader('Content-Encoding', 'gzip');
		return rs.pipe(createGzip());
	} else if(acceptEncoding.match(/\bdeflate\b/)){
		res.setHeader('Content-Encoding', 'deflate');
		return rs.pipe(createDeflate());
	}
};
