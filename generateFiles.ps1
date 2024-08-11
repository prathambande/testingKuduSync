# Define the base path where the folders will be created
$basePath = "./Files"

# Loop to create 45 folders
for ($i = 1; $i -le 48; $i++) {
    # Define the folder name
    $folderName = "Folder$i"
    # Define the full path to the folder
    $folderPath = Join-Path $basePath $folderName

    # Create the folder
    New-Item -ItemType Directory -Path $folderPath

    # Loop to create 1,000 text files in each folder
    for ($j = 1; $j -le 1000; $j++) {
        # Define the file name
        $fileName = "File$j.txt"
        # Define the full path to the file
        $filePath = Join-Path $folderPath $fileName

        # Create the text file with some content
        "This is the content of file $j in $folderName \n \n Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eleifend, metus at euismod accumsan, lacus dolor lacinia enim, vel malesuada nulla erat sit amet felis. Duis dapibus nulla vitae mi vehicula, ac malesuada neque varius. Ut faucibus tincidunt nisl a suscipit. Maecenas lacus ante, tincidunt nec suscipit sed, pretium sit amet enim. Donec faucibus lorem diam, in mattis libero feugiat non. In tempor magna quis aliquet finibus. Etiam imperdiet libero pulvinar leo ullamcorper condimentum. Sed vestibulum eleifend arcu vitae dictum. Duis eu mattis urna. Maecenas dapibus, lectus nec dignissim vulputate, enim urna ultrices ipsum, nec laoreet velit ligula id nunc. Nunc iaculis posuere sem non vehicula. Integer quam mauris, porttitor ac pellentesque volutpat, ultrices non mauris. Donec condimentum elit non faucibus ornare.

Nam vel tempor lorem. Aenean ut mollis massa, in interdum diam. Donec facilisis massa ut augue facilisis, sed condimentum augue lacinia. Pellentesque varius risus est, at dictum neque pellentesque sed. Cras lacinia mauris ut magna molestie, et vestibulum ante semper. Aliquam nec quam et erat euismod elementum ut consequat tortor. Aliquam dignissim, ligula non sagittis elementum, velit nulla luctus ante, non fermentum ante turpis a odio. Aliquam congue egestas faucibus. Nulla pellentesque commodo mauris. Proin et feugiat nisl. Nam fringilla volutpat nunc sed imperdiet.

Sed tristique tempus libero, a finibus metus. Etiam eget ligula lorem. Aenean sit amet mi vitae ipsum fermentum vestibulum. Phasellus sodales turpis quis mi auctor dignissim. Sed sodales, purus a efficitur ullamcorper, nisi arcu vestibulum justo, et ullamcorper lacus ante  sagittis in augue. Aliquam erat volutpat. Donec eget finibus nunc. Aenean sed consequat est. Aliquam convallis orci ex, eget posuere augue vulputate eu. Integer mattis felis elit, non euismod dui euismod in.

" | Out-File -FilePath $filePath
    }
}

Write-Output "Folders and files created successfully!"
