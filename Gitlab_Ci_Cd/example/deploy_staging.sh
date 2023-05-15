# ci/deploy_staging.sh
# 测试网的部署脚本

# 遇到错误时退出，更加可读的版本是：set -o errexit
set -e

echo "============================"
echo "=== Start deploy staging ==="
echo "============================"
# 访问脚本所在的的项目文件
BASEDIR=$(dirname "$0")
cd $BASEDIR
cd ..

echo "==== Copy product files ===="
# 拷贝文件到部署文件夹

# 开启 地址通配符功能
shopt -s extglob
# 删除部署文件夹中之前留下的文件，只保留 dist（构建产物） 和 node_modules （依赖）文件夹
sudo rm -rf /usr/share/frontend/!(dist|node_modules)
# 删除 . 开头的隐藏文件，它们是漏网之鱼
sudo rm -rf /usr/share/frontend/{.[!.],..?}*
echo "Remaining files："
ls -la /usr/share/frontend/

# 为了防止因为没有权限复制而出错，预先设置署文件夹的权限组为 gitlab-runner
sudo chown -R gitlab-runner:gitlab-runner /usr/share/frontend
# 拷贝至部署文件夹
cp -r . /usr/share/frontend/
# 设置一次部署文件夹内新放进去文件的权限，允许读写和执行
sudo chmod -R 775 /usr/share/frontend

# 进入部署文件夹
cd /usr/share/frontend/

echo "==== Start pnpm install ===="
# 安装依赖
pnpm install

echo "===== Start build test ====="
# 编译项目
pnpm test

echo "============================="
echo "== Finished deploy staging =="
echo "============================="