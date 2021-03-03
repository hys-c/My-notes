# git

### 一. 本地操作

#### 1. 提交

	```
	// 创建仓库
	git init 
	// 提交到暂存区
	git add .
	// 提交到本地仓库
	git commit -m 'description'
	
	```

#### 2. 版本查看和回退

   ```
   // 查看提交记录
   git log
   // 查看简洁提交记录
   git log --pretty=oneline
   // 回退到前一个版本，回退后最新的版本就被删除了
   git reset --hard HEAD^（或者版本号的前几位）
   // 记录你的每一次命令，可以找到未来的版本
   git reflog
   ```

#### 3. 工作区和暂存区

   - 工作区

     自己写代码的文件夹即可看做工作区

   - 暂存区

     存在.git文件夹（版本库）中

#### 4. 修改

   ```
   // 查看和工作区和版本库的不同
   git diff HEAD -- readme.md
   // 撤销修改,如果还没放到暂存区，则变为和版本库一样
   git checkout -- readme.md
   // 撤销修改,已经提交到暂存区
   git reset HEAD -- readme.md
   
   ```

   

#### 5. 删除文件

   ```
   // 删除文件，在手动删除后
   git rm 'index.md'
   git commit -m 'delete index.md'
   
   // 撤销删除，在手动删除后
   git checkout -- index.md
   ```
### 二.远程操作

#### 1. 创建远程后将远程和本地关联

   ```
   git branch -M main
   git remote add origin https://github.com/hys-c/1.git // 将本地和远程关联
   git push -u origin main // 推送到远程,并将main分支关联
   ```

#### 2. 从远程克隆到本地

   ```
   git clone https://github.com/hys-c/1.git
   ```

   

### 三.分支管理

#### 1. 创建与合并分支

   ```
   查看分支：git branch
   
   创建分支：git branch <name>
   
   切换分支：git checkout <name>或者git switch <name>
   
   创建+切换分支：git checkout -b <name>或者git switch -c <name>
   
   合并某分支到当前分支：git merge <name>
   
   删除分支：git branch -d <name>
   ```

   

#### 2. 解决冲突

   发生冲突后，比较变更，然后重新`add`,`commit`

#### 3. 分支推送到远程

   ```
   git push origin master// 将本地的master分支推送到远程
   git push origin login // 将本地的login分支推送到远程
   ```

#### 4. 从远程拉取分支

   ```
   // clone默认只能获得master分支,想要获得分支，则需要远程拉去分支
   git checkout -b <name> origin/<name>
   ```

### 四. 远程拉取

#### 1. 拉取

```
// 将远程内容拉取到本地
git fetch origin master 
// 将远程内容合并到本地
git merge origin/master 
// 拉取并合并
git pull <远程主机名> <远程分支名>:<本地分支名>
```

#### 2. 冲突

```
// 如果有push时候有冲突，要先pull下来处理冲突在提交
```




