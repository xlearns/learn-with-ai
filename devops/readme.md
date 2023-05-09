# 总结
## 安装docker
## 安装jenkins

### 修改jenkins端口号
- `vi /etc/sysconfig/jenkins`
  - JENKINS_PORT表示端口
- 如果是用service启动
  - 修改`vi /usr/lib/systemd/system/jenkins.service `
### 启动jenkins
- `service jenkins start`
### 关闭jenkins
- `service jenkins stop`

### 重启jenkins
- `service jenkins reload`