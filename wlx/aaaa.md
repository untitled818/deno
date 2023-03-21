用git上传到github（Ssh）
配置ssh:（只有第一次需要
ssh-keygen -t rsa -C "email@qq.com"  然后一直回车
然后根据所给的路径找到.ssh文件夹
然后打开pub文件，复制密钥，打开github,粘贴到new ssh key
检测配置是否成功：ssh -T git @github.com 后输入yes
上传代码：
设置usename和email:git config --global user.name"your name"
                  git config --global user.email"your email"
新建一个文件夹 进入git bash
然后git init初始化该仓库，文件夹下会出现.git
用git add .命令把该目录下所以文件夹添加到仓库
git commit -m " "引号内可以写对该文件的说明
接着与仓库建立连接 打开github复制ssh地址
用git remote add origin 复制的ssh地址
上传：git push -u origin main
(如果报错显示permantly added the巴拉巴拉，就是README文件没拉到本地文件夹里
用git pull --rebase origin main)
(如果需要验证，但是验证失败可以敲git config --global --unset https.proxy重新验证)