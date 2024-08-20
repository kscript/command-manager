Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing
if (Test-Path package.json) {
    $config = Get-Content package.json | ConvertFrom-Json
    $scrips = $config.scripts
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

    foreach($property in $scrips.psobject.properties.name)
    {
        $item = $listBox.Items.Add($property);
    }

    $form.Controls.Add($listBox)

    $form.Topmost = $true
    $result = $form.ShowDialog()

    if ($result -eq [System.Windows.Forms.DialogResult]::OK)
    {
        & npm run $listBox.SelectedItem
    }
}