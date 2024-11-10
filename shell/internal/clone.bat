@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul

:read_clipboard
for /f "delims=" %%i in ('powershell -command "Get-Clipboard"') do set repo_url=%%i

:input_url
:: 提示用户输入 Git 仓库地址
if "%repo_url%"=="" (
set /p repo_url="请输入 Git 仓库地址: "
)

:: 去除 repo_url 前后的空格
set "repo_url=!repo_url: =!"

:: 检查输入是否为空
if "%repo_url%"=="" (
    echo "错误: 未输入 Git 仓库地址。"
    goto input_url
)

setlocal enabledelayedexpansion
:: 去除末尾的 / 或 \
if "!repo_url:~-1!"=="/" (
    set "repo_url=!repo_url:~0,-1!"
) else if "!repo_url:~-1!"=="\" (
    set "repo_url=!repo_url:~0,-1!"
)
:: 截取到第一个 https://
for /f "tokens=1 delims=/" %%a in ("!repo_url!") do (
    set "first_part=%%a"
)
if "!first_part!"=="https:" (
    set "repo_url=!first_part!//!repo_url:*https://=!"
)
:: 检查 URL 是否以 .git 结尾，如果没有则添加
if not "!repo_url:~-4!"==".git" (
    set "repo_url=!repo_url!.git"
)
:: 基本的 URL 格式验证

endlocal & set "repo_url=%repo_url%"

:: 从 URL 中提取用户名和仓库名
set username=
set repo_name=
for /f "tokens=2,3 delims=/" %%i in ("%repo_url:~7,-4%") do (
    set username=%%i
    set repo_name=%%j
)

:: 创建两级文件夹
set base_dir=%cd%\%username%
set repo_dir=%base_dir%\%repo_name%

:: 检查目标路径是否有写权限
if not exist "%base_dir%" (
    if not exist "%base_dir%" (
        mkdir "%base_dir%"
        if errorlevel 1 (
            echo Failed to create directory: %base_dir%
            exit /b 1
        )
    )
)

if not exist "%repo_dir%" (
    if not exist "%repo_dir%" (
        mkdir "%repo_dir%"
        if errorlevel 1 (
            echo Failed to create directory: %repo_dir%
            exit /b 1
        )
    )
)

:: 切换到仓库目录
cd /d "%repo_dir%"

:: 初始化 Git 仓库
git init

:: 设置远程仓库地址
git remote add origin %repo_url%

:: 拉取代码
:fetch_retry
git fetch origin
if %errorlevel% neq 0 (
    echo "拉取代码失败，请检查网络连接或仓库地址是否正确。"
    setlocal
    :retry_prompt
    set /p retry="是否重试？(y/n): "
    if /i "!retry!"=="y" (
        goto :fetch_retry
    ) else if /i "!retry!"=="n" (
        echo "操作已取消。"
        exit /b 1
    ) else (
        echo 输入无效，请输入 y 或 n。
        goto :retry_prompt
    )
    endlocal
)

:: 获取默认分支名（假设默认分支是 main 或 master）
for /f "tokens=*" %%a in ('git branch -r') do (
    set branch=%%a
    :: 检查分支是否符合预期格式
    echo !branch! | findstr /R /C:"^origin/[a-zA-Z0-9_-]+$" >nul
    if %errorlevel% equ 0 (
        :: 去掉 "origin/" 前缀
        for /f "tokens=2 delims=/" %%b in ("!branch!") do (
            set default_branch=%%b
            goto :end_loop
        )
    )
)
:end_loop
echo !default_branch!
if not defined default_branch (
    echo No default branch found.
    exit /b 1
)

:: echo Default branch is: %default_branch%

:: 切换到默认分支
git checkout %default_branch%

:: echo 仓库已克隆到 %repo_dir%