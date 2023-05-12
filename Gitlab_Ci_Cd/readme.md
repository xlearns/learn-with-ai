# 总结


## 以下是一个最小的.gitlab-ci.yml文件
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