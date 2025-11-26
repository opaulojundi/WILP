<?php
$sourceImage = 'IMG-20250908-WA0017.png';
$sizes = [72, 96, 128, 144, 152, 192, 384, 512];

foreach ($sizes as $size) {
    $image = imagecreatefrompng($sourceImage);
    $resized = imagescale($image, $size, $size);
    imagepng($resized, "icon-{$size}x{$size}.png");
    imagedestroy($image);
    imagedestroy($resized);
}
echo "Ícones gerados";
?>
