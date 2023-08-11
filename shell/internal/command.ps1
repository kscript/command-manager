Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing
$path = $PSScriptRoot + '\..\manifest.json'
if (Test-Path $path) {
    $config = Get-Content $path -Encoding UTF8 | ConvertFrom-Json
    $commands = $config.commands
    $width = 280
    $height = 320
    $form = New-Object System.Windows.Forms.Form
    $form.Text = '执行脚本'
    $form.Size = New-Object System.Drawing.Size($width, $height)
    $form.StartPosition = 'CenterScreen'
    $form.FormBorderStyle = 'FixedDialog';

    $okButton = New-Object System.Windows.Forms.Button
    $okButton.Location = New-Object System.Drawing.Point(-75, -120)
    $okButton.Size = New-Object System.Drawing.Size(75,23)
    $okButton.Text = 'OK'
    $okButton.DialogResult = [System.Windows.Forms.DialogResult]::OK
    $form.AcceptButton = $okButton
    $form.Controls.Add($okButton)

    $label = New-Object System.Windows.Forms.Label
    $label.Location = New-Object System.Drawing.Point(10, 15)
    $label.Size = New-Object System.Drawing.Size($($width - 25), 20)
    $label.Text = '选择要执行的脚本'
    $form.Controls.Add($label)

    $listBox = New-Object System.Windows.Forms.ListBox
    $listBox.Location = New-Object System.Drawing.Point(10, 40)
    $listBox.Size = New-Object System.Drawing.Size($($width - 35), $($height - 90))

    for ($i = 0; $i -lt $commands.Count; $i++) {
        $item = $listBox.Items.Add($commands[$i].name);
    }

    $form.Controls.Add($listBox)

    $form.Topmost = $true
    $result = $form.ShowDialog()

    if ($result -eq [System.Windows.Forms.DialogResult]::OK)
    {
        $item = $commands[$listBox.SelectedIndex]
        if ($item.nodeVersion) {
            & nvm use $item.nodeVersion
        }
        if ($item.path) {
            & Set-Location $item.path
        }
        if ($item.commandLines) {
            $commandLines = $item.commandLines
            if ($commandLines.getType().Name -eq 'String') {
                $commandLines = $item.commandLines -split "`n"
            }
            for ($i = 0; $i -lt $commandLines.Count; $i++) {
                if ($item.terminal -eq 'cmd') {
                    & cmd.exe /c $commandLines[$i]
                }
                if ($item.terminal -eq 'git') {
                    & git-bash.exe -c $commandLines[$i]
                }
            }
        }
    }
}
