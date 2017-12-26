#!/bin/bash

images='blocked0 blocked1 unblocked'
sizes='16 48 128'

for image in $images
do
    for size in $sizes
    do
        rm $image-$size.png
        convert $image.png -resize $sizex$size $image-$size.png
    done
done

