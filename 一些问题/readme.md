
## react或者vue如果路由采用history模式，用live-server or nginx如果不做任何设置访问打包后得文件刷新页面为什么会404
- 当使用 React 或 Vue 路由时，如果采用的是 HTML5 history 模式，也可能会出现刷新页面 404 的问题。这是因为在 history 模式下，浏览器的 URL 地址并不是一个真实存在的文件路径，而是由前端路由控制的虚拟地址。
在使用 live-server 来访问打包后的文件时，它默认会在本地启动一个 Web 服务器，并根据请求的 URL 地址返回相应的文件。但是由于虚拟地址并不存在于服务器上，所以 live-server 会返回一个 404 错误。
同理在nginx或者serve中都会存在这个问题
要解决这个问题，可以修改重定向配置 ，让它将所有的请求都指向 index.html 文件。具体方法是，在命令行中输入以下命令：
### live-server
```
live-server --entry-file=index.html
```

### serve
```
serve -s 
```
### nginx
```
server {
    # port
    listen       80;
    server_name  localhost;
    error_page  405     =200 $uri;
    location / {
      root   /dist;
      try_files  $uri $uri/ @router;
    }
    location @router{
          rewrite ^.*$ /index.html last;
    }
  }
```
## 直接打开网址和刷新有什么区别，可以用过js来进行判断吗