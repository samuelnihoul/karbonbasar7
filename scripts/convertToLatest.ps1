# Load the JSON file into a variable
$jsonContent = Get-Content .\package.json | ConvertFrom-Json

# Replace all versions with "latest"
$jsonContent.dependencies | ForEach-Object { $_.Value = "latest" }
$jsonContent.devDependencies | ForEach-Object { $_.Value = "latest" }

# Convert the updated JSON object back to a string and save it to a file
$updatedJson = ConvertTo-Json $jsonContent -Depth 10
Set-Content .\package.json $updatedJson