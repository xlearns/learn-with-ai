# 总结

## 搭建 CI/CD

- [参考](https://github.com/LittleSound/nolebase/blob/c49ce61fb690c3d59e5da95a18f75452e3c73af4/%E7%AC%94%E8%AE%B0/%F0%9F%9F%A2%20%E6%8C%81%E7%BB%AD%E9%9B%86%E6%88%90%20%E6%8C%81%E7%BB%AD%E4%BA%A4%E4%BB%98%20CICD/GitLab/%E9%85%8D%E7%BD%AE%20GitLab%20CI%20CD%20%E8%87%AA%E5%8A%A8%E9%83%A8%E7%BD%B2.md)

### gitlab-ce

- 远程服仓库

### gitlab-runner

#### [安装](https://docs.gitlab.com/runner/install/linux-repository.html)

- [参考](https://juejin.cn/post/6844903798796730375)
- [参考](https://github.com/WilburXu/blog/blob/5cf96b6d3b9a52a7c33770234aabec72cb3390d8/other/%E5%9F%BA%E4%BA%8EGitLab%20CI%E6%90%AD%E5%BB%BAGolang%E8%87%AA%E5%8A%A8%E6%9E%84%E5%BB%BA%E7%8E%AF%E5%A2%83.md)

下面是 Debian/Ubuntu/CentOS 的安装方法

```
# For Debian/Ubuntu
$ curl -L https://packages.gitlab.com/install/repositories/runner/gitlab-ci-multi-runner/script.deb.sh | sudo bash
$ sudo apt-get install gitlab-ci-multi-runner

# For CentOS
$ curl -L https://packages.gitlab.com/install/repositories/runner/gitlab-ci-multi-runner/script.rpm.sh | sudo bash
$ sudo yum install gitlab-ci-multi-runner
```

#### 注册 Runner

安装好 GitLab Runner 之后，我们只要启动 Runner 然后和 CI 绑定就可以了

- 启动 runner
  - `gitlab-runner register`
    - 输入 CI URL
    - 输入 Token
    - 输入 Runner 的名字
    - 选择 Runner 的类型，简单起见还是选 Shell 吧
    - 完成
- 获取 gitlab-ci 的 Token:
  - 项目主页 -> Sttings -> CI/CD -> Runners Expand

## 以下是一个最小的.gitlab-ci.yml 文件

- 其中包含了必须的元素：

```yml
stages:
  - build
  - test

job1:
  stage: build
  script:
    - echo "This is job1"

job2:
  stage: test
  script:
    - echo "This is job2"
```

## 自动部署

### 基于 nginx

### 基于 docker
