// bgImg is the background image to be modified.
// fgImg is the foreground image.
// fgOpac is the opacity of the foreground image.
// fgPos is the position of the foreground image in pixels. It can be negative and (0,0) means the top-left pixels of the foreground and background are aligned.
function composite( bgImg, fgImg, fgOpac, fgPos )
{
    let c = 0;
    let rowIndex = 0;
    let colIndex = 0;
    for (colIndex = 0; colIndex < bgImg.height; colIndex++) {
        for (rowIndex = 0; rowIndex < bgImg.width; rowIndex++) {
            var startIndex = (colIndex * bgImg.width * 4) + rowIndex * 4;
            var b_rgba = bgImg.data.slice(startIndex, startIndex + 4);
            var f_rgba = fgImg.data.slice(startIndex, startIndex + 4);
            
            // console.log("b-rgba : (" + b_rgba[0] + ", " + b_rgba[1] + ", " + b_rgba[2] + ", " + b_rgba[3] + ")");
            // console.log("f-rgba : (" + f_rgba[0] + ", " + f_rgba[1] + ", " + f_rgba[2] + ", " + f_rgba[3] + ")");
            var baRatio = b_rgba[3]/255;
            var faRatio = f_rgba[3]/255;
            var alpha = f_rgba[3] + (1 - faRatio) * b_rgba[3];
            var taRatio = alpha/255;
            var r = (f_rgba[0] * faRatio) + ((1 - faRatio) * b_rgba[0] * baRatio)/taRatio;
            var g = (f_rgba[1] * faRatio) + ((1 - faRatio) * b_rgba[1] * baRatio)/taRatio;
            var b = (f_rgba[2] * faRatio) + ((1 - faRatio) * b_rgba[2] * baRatio)/taRatio;
            bgImg.data[startIndex] = r;
            bgImg.data[startIndex + 1] = g;
            bgImg.data[startIndex + 2] = b;
            bgImg.data[startIndex + 3] = alpha;
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
//             bgImg.data[bgIndex] = 255;
//             bgImg.data[bgIndex + 1] = 1;
//             bgImg.data[bgIndex + 2] = 1;
//             bgImg.data[bgIndex + 3] = 255;
//         }
//     }
// }