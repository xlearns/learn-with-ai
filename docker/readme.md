# 总结


## 镜像

## 容器

### 新建容器
- `docker run`
  - 1.检查本地是否存在指定的镜像，不存在就从 registry 下载
  - 2.利用镜像创建并启动一个容器
  - 3.分配一个文件系统，并在只读的镜像层外面挂载一层可读写层
  - 4.从宿主主机配置的网桥接口中桥接一个虚拟接口到容器中去
  - 5.从地址池配置一个 ip 地址给容器
  - 6.执行用户指定的应用程序
  - 7.执行完毕后容器被终止

### 查看终止的容器
- `docker container ls -a`

### 终止容器
- 1.`docker container stop`
- 2.用户通过 exit 命令或 Ctrl+d 来退出终端时，所创建的容器立刻终止。
  - 如果是docker exec启动的容器，输入exit则不会终止容器只是退出容器终端

### 启动已终止容器
- `docker container start `

### 重新与容器进行交互
- `docker exec -it <container_name_or_id> bash`

### 查看容器输出的结果
- `docker container logs [container ID or NAMES]`

### 移动系统文件到容器中
- `docker cp [file_path] [container_id]:[destination_path]`

#### 移动dist目下得文件到48容器内得usr/share/nginx/html/目录下
- docker cp dist/.   48:usr/share/nginx/html/

### 选项
- `-t`
  - 让Docker分配一个伪终端（pseudo-tty）并绑定到容器的标准输入上
- `-i`
  - 让容器的标准输入保持打开【交互式模式】
- `-d`
  - 用于指定容器以'分离模式'（detached mode）运行。这意味着容器将在后台运行，并且不会阻止当前终端的使用
  - 也就是说加一个-d就可以解决run启动的镜像，因为exit退出而导致关闭
    - `docker run -it -d 镜像名称 bash`
      - `-it`表示交互模式
      - `-d` 表示分离模式
### 导出容器
- `docker export [container ID] > ubuntu.tar`

### 导入容器
- 1.`docker import /path/to/snapshot.tar new-image-namer`
- 2.`docker load -i /path/to/snapshot.tar`

### docker load 与 docker import的区别
- 用户既可以使用 docker load 来导入镜像存储文件到本地镜像库，也可以使用 docker import 来导入一个容器快照到本地镜像库。这两者的区别在于容器快照文件将丢弃所有的历史记录和元数据信息（即仅保存容器当时的快照状态），而镜像存储文件将保存完整记录，体积也要大。此外，从容器快照文件导入时可以重新指定标签等元数据信息。


### Dockerfile
#### 最小nginx部署配置
```
FROM nginx:1.23.1
COPY ./dist  /usr/share/nginx/html/
COPY ./nginx.conf /etc/nginx/nginx.conf
```
#### 目录结构
├── Dockerfile
├── nginx.conf
├── dist
│   ├── index.html
│   └── src
│       ├── index.js
│       └── style.css

#### 基于dockerfile构建镜像
- `docker build -t myDocker .`

#### 根据镜像生成容器
- `docker run -p 80:80 myDocker`


## 思考
### DevOps 中为什么要引入 Docker？
- 任何一种技术的引入或者流程的改进都是需要成本的，如果引入新技术的成本远大于目前的可接受范围，那么这个技术是否依然值得引入？
假如只是为了单纯使用的新技术，那么新技术引入带来的副作用是否能承受，有没有预备方案进行兜底，这都是需要去考虑的。
- 市面上不少前端发布都是将项目代码在 Docker 进行构建，再在 Docker 里面启动一个 Nginx 服务，提供静态资源访问，这样确实没问题，但是如果仅仅是静态资源的话，这种操作是有点过于沉重的。构建完成直接将静态资源上传到文件服务器例如 COS 或者 OSS 中，显然是更为方便省事。