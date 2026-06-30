# Git Auto-Sync Daemon
# Runs in a continuous loop to detect any workspace changes, commit them, and push them to GitHub.

$repoDir = "c:\Users\Administrator\Desktop\vibe"
Set-Location -Path $repoDir

Write-Output "Auto-sync active. Monitoring folder: $repoDir"

while ($true) {
    $changes = git status --porcelain
    if ($changes) {
        Write-Output "Changes detected. Syncing to GitHub..."
        git add -A
        git commit -m "Auto-update: Sync modifications"
        git push origin main
        Write-Output "Sync complete."
    }
    Start-Sleep -Seconds 5
}
