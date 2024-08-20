const context = {
  dir: '<你的目录>',
  host: '<你的目标主机或IP地址>',
  time: '<时间>'
}
const commands = [
  {
    name: '定时关闭计算机',
    description: '如果你想列出目录中的文件并保存到文本文件中',
    content: `
    @echo off  
    timeout /t ${context.time}  
    shutdown /s /t 0
    `
  },
  {
    name: '列出目录中的文件',
    description: '如果你想列出目录中的文件并保存到文本文件中',
    content: `
    @echo off  
    set "folder=${context.dir}"  
    set "output=filelist.txt"  
    dir /b "%folder%*" > "%output%"  
    echo File list saved to %output%.  
    pause
    `
  },
  {
    name: '网络ping测试',
    description: '使用ping命令来测试网络连接',
    content: `
    @echo off  
    set "host=${context.host}"  
    ping -n 4 %host% > ping_results.txt  
    echo Ping results saved to ping_results.txt.  
    pause
    `
  }
]

module.exports = commands