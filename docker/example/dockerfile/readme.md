## 重新生成容器
- `docker run -it -d -p 17174:80 my-docker`

## 向容器传送东西
### dist目录下得所有文件
- `docker cp dist/* id: /usr/share/nginx/html/`

### nginx.conf移动到容器内
- `docker cp nginx.conf id: /etc/nginx/`
