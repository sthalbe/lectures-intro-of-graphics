// bgImg is the background image to be modified.
// fgImg is the foreground image.
// fgOpac is the opacity of the foreground image.
// fgPos is the position of the foreground image in pixels. It can be negative and (0,0) means the top-left pixels of the foreground and background are aligned.
function composite( bgImg, fgImg, fgOpac, fgPos )
{
    let fg_rect = {
        x : fgPos.x,
        y : fgPos.y,
        width : fgImg.width,
        height : fgImg.height
    }

    for (let col = 0; col < bgImg.height; col++) {
        for (let row = 0; row < bgImg.width; row++) {

            if(row >= fg_rect.x && row < fg_rect.width + fg_rect.x && col >= fg_rect.y && col < fg_rect.height + fg_rect.y )
            {
                let bg_idx = ((bgImg.width * col) + row) * 4;
                let fg_idx = (fgImg.width * (col - fg_rect.y) + (row - fg_rect.x)) * 4
                let bg_rgba = bgImg.data.slice(bg_idx, bg_idx + 4);
                let fg_rgba = fgImg.data.slice(fg_idx, fg_idx + 4);
                fg_rgba[3] *= fgOpac;
                let alpha = fg_rgba[3] + (1 - fg_rgba[3]/255) * bg_rgba[3];
                let taRatio = alpha / 255;
                let r = (fg_rgba[0] * fg_rgba[3]/255) + ((1 - fg_rgba[3]/255) * bg_rgba[0] * bg_rgba[3]/255) / taRatio;
                let g = (fg_rgba[1] * fg_rgba[3]/255) + ((1 - fg_rgba[3]/255) * bg_rgba[1] * bg_rgba[3]/255) / taRatio;
                let b = (fg_rgba[2] * fg_rgba[3]/255) + ((1 - fg_rgba[3]/255) * bg_rgba[2] * bg_rgba[3]/255) / taRatio;
                bgImg.data[bg_idx] = r;
                bgImg.data[bg_idx + 1] = g;
                bgImg.data[bg_idx + 2] = b;
                bgImg.data[bg_idx + 3] = alpha;
            }
        }
    }
}

// function composite(bgImg, fgImg, fgOpac, fgPos) {
//     // Loop through each pixel of the foreground image
//     for (let i = 0; i < fgImg.data.length; i += 4) {
//         // Extract RGBA values of the foreground pixel
//         let fgAlpha = fgImg.data[i + 3]; // Alpha value (opacity)

//         // Calculate the corresponding pixel position in the background image
//         let bgX = i / 4 % fgImg.width + fgPos.x; // X position in background
//         let bgY = Math.floor(i / 4 / fgImg.width) + fgPos.y; // Y position in background
//         let bgIndex = (bgY * bgImg.width + bgX) * 4; // Index of corresponding pixel in background image data array

//         // Only blend if the foreground pixel is within the bounds of the background image
//         if (bgX >= 0 && bgX < bgImg.width && bgY >= 0 && bgY < bgImg.height) {
//             // Extract RGBA values of the corresponding pixel in the background image
//             let bgRed = bgImg.data[bgIndex]; // Red value
//             let bgGreen = bgImg.data[bgIndex + 1]; // Green value
//             let bgBlue = bgImg.data[bgIndex + 2]; // Blue value
//             let bgAlpha = bgImg.data[bgIndex + 3]; // Alpha value (opacity)

//             // Calculate the blended RGBA values using alpha compositing formula
//             let blendedRed = (fgImg.data[i] * fgAlpha / 255) + (bgRed * (1 - fgAlpha / 255));
//             let blendedGreen = (fgImg.data[i + 1] * fgAlpha / 255) + (bgGreen * (1 - fgAlpha / 255));
//             let blendedBlue = (fgImg.data[i + 2] * fgAlpha / 255) + (bgBlue * (1 - fgAlpha / 255));
//             let blendedAlpha = fgAlpha + (bgAlpha * (1 - fgAlpha / 255));

//             // Update the corresponding pixel in the background image data array with the blended values
//             bgImg.data[bgIndex] = blendedRed;
//             bgImg.data[bgIndex + 1] = blendedGreen;
//             bgImg.data[bgIndex + 2] = blendedBlue;
//             bgImg.data[bgIndex + 3] = blendedAlpha;
//         }
//     }
// }