Nodejs 静态资源服务器

- 第一次提交  (参考 https://blog.csdn.net/zhezhebie/article/details/78761417)

	`git init`

	`git add .` 或者 `git add` 文件名

	`git commit -m "这个干了啥。。。"`

	`git remote add origin https://github.com/shanliangdeYWJ/node.js-Zero-basic-to-enterprise-development-video-tutorial.git`  地址是仓库的 HTTPS 地址

	`git push -u origin master`    提交远程仓库
	
		按照本文档新建的项目时，在码云平台仓库上已经存在 readme 文件，故在提交时可能会存在冲突，
		这时您需要选择的是保留线上的文件或者舍弃线上的文件，
		如果您舍弃线上的文件，则在推送时选择强制推送，强制推送需要执行下面的命令：
	
	`git push origin master -f`


- 后面提交
	
	git add . 或者 git add -u .   后者是不加参数默认为将修改操作的文件和未跟踪新添加的文件添加到git系统的暂存区，注意不包括删除
	
	git push -u origin master
	
	
	
- 创建分支（肯定在某个仓库里面新建）
	
	查看现有的分支：  git branch
	
	新建分支： git branch master2

	并且切换到该分支：git checkout master2
	
	新建文件：touch index.html     当然了新建文件夹是：mkdir index

	分支上第一次添加：git add .

	将被跟踪的文件提交到暂存区： git commit -a -m "提交信息"
	
	提交远程分支：git push -u origin 远程分支名字

- 合并分支

# node.js-Zero-basic-to-enterprise-development-video-tutorial
node.js Zero basic to enterprise development video tutorial

## .gitignore

根目录: 匹配模式前面 / 代表项目根目录
目  录: 匹配模式最后加 / 代表是目录
取  反: 匹配模式前加 ! 代表取反(应用于忽略某个文件夹，但是文件夹里面某个文件不忽略)

*代表任意个字符  
?匹配任意一个字符  
**匹配多级目录  
	
	比如 node_modules/**/index.js

## 使用方法 


## 安装模块

### 代码检查 eslint

eslint babel-eslint 要装一起  

(先全局安装，vscode 的 Eslint 插件 根据全局的 `eslint babel-eslint 插件`进行运作 )

	npm install  eslint babel-eslint -g

或是

	npm install eslint babel-eslint -D


### 热更新 supervisor

全局安装

	npm i -g supervisor

	启动 supervisor app.js // app.js 是入口文件
	
### 控制台打印有颜色的信息 chalk

安装在 非开发的依赖中 后期上线也需要

	npm install chalk

### 模板引擎 handlebars

安装在 非开发的依赖中 后期上线也需要

	npm install handlebars

handlebars 表示自己用 this ，不允许你写各种各样的逻辑(逻辑一般在数据端处理)
1. 拿到模板文件
2. handlebars.compile() //编译成 template

### 本地构建 自动化流程 gulp

### range

#### 范围请求，表示客户端发起请求(可以声明请求的范围，比如说是从第多少个字节到第多少个字节，而不是一次性把所有的东西全部拿回来)
#### 服务器得到请求后从拿到对应的文件和字节返回给客户端
##### 三个步骤
##### 1. range: bytes = [start]-[end]\(请求的时候放到 requestHeader 中，可以用逗号分割)(假如请求范围不对，end 超出最大长度，或者说 start 比 end 还要大，服务器就直接返回200，把所有的内容都给了浏览器，或者返回416 表示这个请求是一个错误代码；便捷起见直接返回200，把所有的内容返回客户端)
##### 2. Accept-Ranges: bytes(响应头表示服务器可以处理的格式是字节)
##### 3. Content-Range: bytes start-end/total (responseHeader 中返回这个响应头，表示格式是 bytes)


### 缓存

#### 浏览器发起请求，请求到了服务器，服务器解析出了响应的结果

```flow
<!-- 开始框 -->
st=>start: 用户请求
e=>end: 登录

<!-- 中间流程框 -->
sub=>subroutine: 请求资源
sub1=>subroutine: 读取本
地缓存
sub2=>subroutine: 协商缓存
返回响应
sub3=>subroutine: 304

<!-- 判断框 -->
cond=>condition: 本地缓存
是否存在
cond2=>condition: client
是否失效
cond3=>condition: server 
未改变

st(right)->cond(yes,right)->cond2(yes)
cond(no)->sub->sub2
cond2(no,left)->sub1
cond2(yes)->cond3(no)->sub2
cond3(yes)->sub3->sub1
```
#### 缓存 header
- ##### Expires， Cache-Control
- ##### If-Modified-Since / Last-Modified
- ##### If-None-Match / ETag

## 疑问
### mime模块如何使用(我需要采用统一识别的方式返回文件)
#### 常见mime类型
```js
{
	'hqx':'application/mac-binhex40',
	'cpt':'application/mac-compactpro',
	'csv':['text/x-comma-separated-values', 'text/comma-separated-values',   'application/octet-stream', 'application/vnd.ms-excel', 'application/x-csv', 'text/x-csv', 'text/csv', 'application/csv', 'application/excel', 'application/vnd.msexcel'],
	'bin':'application/macbinary',
	'dms':'application/octet-stream',
	'lha':'application/octet-stream',
	'lzh':'application/octet-stream',
	'exe':['application/octet-stream', 'application/x-msdownload'],
	'class':'application/octet-stream',
	'psd':'application/x-photoshop',
	'so':'application/octet-stream',
	'sea':'application/octet-stream',
	'dll':'application/octet-stream',
	'oda':'application/oda',
	'pdf':['application/pdf', 'application/x-download'],
	'ai':'application/postscript',
	'eps':'application/postscript',
	'ps':'application/postscript',
	'smi':'application/smil',
	'smil':'application/smil',
	'mif':'application/vnd.mif',
	'xls':['application/excel', 'application/vnd.ms-excel', 'application/msexcel'],
	'ppt':['application/powerpoint', 'application/vnd.ms-powerpoint'],
	'wbxml':'application/wbxml',
	'wmlc':'application/wmlc',
	'dcr':'application/x-director',
	'dir':'application/x-director',
	'dxr':'application/x-director',
	'dvi':'application/x-dvi',
	'gtar':'application/x-gtar',
	'gz':'application/x-gzip',
	'php':'application/x-httpd-php',
	'php4':'application/x-httpd-php',
	'php3':'application/x-httpd-php',
	'phtml':'application/x-httpd-php',
	'phps':'application/x-httpd-php-source',
	'js':{
		text:'application/x-javascript',
		icon:'../template/icon/javascript.ico'
	},
	'swf':'application/x-shockwave-flash',
	'sit':'application/x-stuffit',
	'tar':'application/x-tar',
	'tgz':['application/x-tar', 'application/x-gzip-compressed'],
	'xhtml':'application/xhtml+xml',
	'xht':'application/xhtml+xml',
	'zip':['application/x-zip', 'application/zip', 'application/x-zip-compressed'],
	'mid':'audio/midi',
	'midi':'audio/midi',
	'mpga':'audio/mpeg',
	'mp2':'audio/mpeg',
	'mp3':['audio/mpeg', 'audio/mpg', 'audio/mpeg3', 'audio/mp3'],
	'aif':'audio/x-aiff',
	'aiff':'audio/x-aiff',
	'aifc':'audio/x-aiff',
	'ram':'audio/x-pn-realaudio',
	'rm':'audio/x-pn-realaudio',
	'rpm':'audio/x-pn-realaudio-plugin',
	'ra':'audio/x-realaudio',
	'rv':'video/vnd.rn-realvideo',
	'wav':['audio/x-wav', 'audio/wave', 'audio/wav'],
	'bmp':['image/bmp', 'image/x-windows-bmp'],
	'gif':'image/gif',
	'jpeg':['image/jpeg', 'image/pjpeg'],
	'jpg':['image/jpeg', 'image/pjpeg'],
	'jpe':['image/jpeg', 'image/pjpeg'],
	'png':['image/png', 'image/x-png'],
	'tiff':'image/tiff',
	'tif':'image/tiff',
	'css':'text/css',
	'html':'text/html',
	'htm':'text/html',
	'shtml':'text/html',
	'txt':'text/plain',
	'tpl':'text/html',
	'text':'text/plain',
	'log':['text/plain', 'text/x-log'],
	'rtx':'text/richtext',
	'rtf':'text/rtf',
	'xml':'text/xml',
	'xsl':'text/xml',
	'mpeg':'video/mpeg',
	'mpg':'video/mpeg',
	'mpe':'video/mpeg',
	'qt':'video/quicktime',
	'mov':'video/quicktime',
	'avi':'video/x-msvideo',
	'movie':'video/x-sgi-movie',
	'doc':'application/msword',
	'docx':['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/zip'],
	'xlsx':['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/zip'],
	'word':['application/msword', 'application/octet-stream'],
	'xl':'application/excel',
	'eml':'message/rfc822',
	'json':['application/json', 'text/json']
	}
```
### nodemon 如何监视html文件
### vscode modules.export 转化成es6代码报错，估计是 .eslintrc.js 里面没有配置导致的
```json
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "script"
	},
```


# 安装

## 使用方法
```
anydoor # 把当前文件夹作为静态资源服务器根目录

anydoor -p 8080 # 设置端口号为 8080

anydoor -h localhost # 设置 host 为 localhost

anydoor -d /usr # 设置根目录为 /usr
```