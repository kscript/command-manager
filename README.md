# command-manager
命令管理器，超轻量级的项目命令管理工具，只需在json文件添加少量配置，即可在 `Windows资源管理器` 任意位置即时运行各种命令，让你的项目开发更有`条理`和`效率`。

## 运行环境
- Windows系统
- PowerShell （必要）
- nodejs（非必要，用到时有nodejs即可，如果切换版本，则需要再另外配置nvm）
- git （非必要，用到时需在环境变量配置好git-bash.exe路径）

## 使用场景
当手上的项目多起来之后，  
还记得你要运行的项目在什么目录吗？  
还记得你是要运行`npm run start`、`npm run dev`或者`npm run serve`吗？  
还记得它们的运行环境是什么样的，node12、node14、node16，git或者其它？  
这么多琐碎的事情, 为什么不`做或者找一个工具来管理它们`呢？  

## 使用方法
1. 在shell目录下，找到 [install.cmd](./shell/install.cmd) 文件，双击运行 (用于注册右键菜单)
2. 在shell目录下，找到 [manifest.json](./shell/manifest.json) 文件, 根据示例配置项, 做相应修改 (如果觉得不直观, 可以在根目录`安装并运行`附带的前端项目)
