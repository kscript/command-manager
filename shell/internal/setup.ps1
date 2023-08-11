$inputPath = $PSScriptRoot + '\contextmenu.reg'
$outputPath = $PSScriptRoot + '\temp\contextmenu.reg'
$text = $PSScriptRoot -Replace '\\', '\\\\'
New-Item -Path $PSScriptRoot -Name temp -type Directory -Force
(Get-Content $inputPath) -Replace '__dir__', $text | Set-Content $outputPath
& cmd.exe /c start $outputPath