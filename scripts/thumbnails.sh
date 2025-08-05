#!/bin/bash

# Run through directory and create 2 files
# image
# thumbnail
# assumes portrait see how it works with landscape i think there are a few
# images will be named numbered sequentaially

# dirs
# ==================================
# classic
# slim
# thin
# wild

# thumbs
# ==============
# thumbs

# src
# ==================================
# "/Users/me/Documents/ObsidianVault/1 PROJECTS/blanchflowerguitars.com/images/" . dir

# dst
# ===============================================
# "/Users/me/Developer/go-projects/blanchflowerguitars.com/planning-questions/public/img/" . dir

# psuedo code
# ===============================================
# for each in src dirs
#     i = 1
#     for each filename in src dir images
#         magick filename -resize x600 dst/{i}.jpg
#         magick filename -resize x200 dst/thumbs/{i}.jpg
#     end
#     i = 0
# end

# add "sbolt_classic" when we have it !!!
# dirs=("bolt_classic" "bolt_slim" "bolt_thin" "sbolt_thin" "wild")
dirs=("all")
src="/Users/me/Developer/go-projects/planning.site/raw_images/"
dst="/Users/me/Developer/go-projects/planning.site/public/img/"
i=0
tn_size=300
size=800

for dir in "${dirs[@]}"; do

    echo "looking at " . $dir
    for fileName in "$src$dir"/*; do
        i=$((i + 1))
        echo $fileName
        echo $i

        orig_width=$(identify -format "%w" "$fileName")
        orig_height=$(identify -format "%h" "$fileName")

        height=$(($size * orig_height / orig_width))
        tn_height=$(($tn_size * orig_height / orig_width))

        echo $height
        echo $tn_height

        magick "$fileName" -resize ${size}x${height} $dst/$dir/$i.jpg
        magick "$fileName" -resize ${tn_size}x${tn_height} $dst/$dir/thumbs/$i.jpg
    done
    i=0
done
