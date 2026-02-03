
$rootPath = "n:\PROGRAMS\GIT and GITHUB\github Desktop\siakhargone\public\siakhargone-content"
$targetPath = Join-Path $rootPath "Album\Photo For Uploads"

Function Get-Slug ($name) {
    # Remove extension for processing
    $baseName = [System.IO.Path]::GetFileNameWithoutExtension($name)
    $ext = [System.IO.Path]::GetExtension($name)
    
    # Lowercase
    $slug = $baseName.ToLower()
    
    # Replace & with nothing or space before hyphens
    $slug = $slug -replace "&", ""
    
    # Replace specific chars with hyphens
    $slug = $slug -replace "[ \(\)]+", "-"
    
    # Remove resulting double hyphens
    $slug = $slug -replace "-+", "-"
    
    # Trim hyphens
    $slug = $slug.Trim("-")
    
    return $slug + $ext.ToLower()
}

# 1. Rename files recursively inside "Photo For Uploads"
Get-ChildItem -Path $targetPath -File -Recurse | ForEach-Object {
    $newName = Get-Slug $_.Name
    if ($_.Name -ne $newName) {
        $newPath = Join-Path $_.Directory.FullName $newName
        Write-Host "Renaming File: $($_.Name) -> $newName"
        Rename-Item -LiteralPath $_.FullName -NewName $newName
    }
}

# 2. Rename directories recursively inside "Photo For Uploads" (Depth first to handle nesting)
# We sort by length descending to rename deepest folders first
Get-ChildItem -Path $targetPath -Directory -Recurse | Sort-Object {$_.FullName.Length} -Descending | ForEach-Object {
    $newName = Get-Slug $_.Name
    if ($_.Name -ne $newName) {
        $newPath = Join-Path $_.Parent.FullName $newName
        Write-Host "Renaming Dir: $($_.Name) -> $newName"
        Rename-Item -LiteralPath $_.FullName -NewName $newName
    }
}

# 3. Rename "Photo For Uploads" -> "photo-for-uploads"
$startDir = Get-Item $targetPath
$newStartDirName = "photo-for-uploads"
if ($startDir.Name -ne $newStartDirName) {
    Write-Host "Renaming Base Dir: $($startDir.Name) -> $newStartDirName"
    Rename-Item -LiteralPath $startDir.FullName -NewName $newStartDirName
}

# 4. Rename "Album" -> "album" (Parent of Photo For Uploads)
$albumPath = "n:\PROGRAMS\GIT and GITHUB\github Desktop\siakhargone\public\siakhargone-content\Album"
if (Test-Path $albumPath) {
    Write-Host "Renaming Album Dir -> album"
    Rename-Item -LiteralPath $albumPath -NewName "album"
}

Write-Host "Renaming Complete."
