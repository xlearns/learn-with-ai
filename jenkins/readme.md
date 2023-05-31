# 总结

## 下载


## 一些插件
- `Blue Ocean` 美化UI
- `Git Parameter`
  -  Git branches、tags 或 revisions 作为启动作业或管道的参数
- `gitlab` 
- `mailer`
  - 邮件
- `Qy Wechat Notification Plugin`
  - 企业微信通知

## 流水线
- 创建gitlab的访问令牌
- 创建流水线项目
- jenkins: 配置gitlab的凭证【第一步的令牌】
- 构建触发器: Build when a change is pushed to GitLab. GitLab webhook URL 【获取url】
- 再gitlab中设置->集成->配置webhook【根据上面获得的url】

