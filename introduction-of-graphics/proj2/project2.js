// Returns a 3x3 transformation matrix as an array of 9 values in column-major order.
// The transformation first applies scale, then rotation, and finally translation.
// The given rotation value is in degrees.
function GetTransform(positionX, positionY, rotation, scale) {
    // Convert rotation from degrees to radians
    var rad = rotation * Math.PI / 180;
    
    // Compute cosine and sine of the rotation angle
    var cos = Math.cos(rad);
    var sin = Math.sin(rad);
    
    // Define the scale, rotation, and translation matrices in column-major order
    var scaleMatrix = [
        scale, 0, 0,
        0, scale, 0,
        0, 0, 1
    ];
    
    var rotationMatrix = [
        cos, -sin, 0,
        sin, cos, 0,
        0, 0, 1
    ];
    
    var translationMatrix = [
        1, 0, positionX,
        0, 1, positionY,
        0, 0, 1
    ];
    
    // Multiply the matrices: translationMatrix * rotationMatrix * scaleMatrix
    var transformMatrix = multiplyMatrices(scaleMatrix, multiplyMatrices(rotationMatrix, translationMatrix));
    
    return transformMatrix;
}

function multiplyMatrices(a, b) {
    var result = new Array(9);
    
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            result[j + i * 3] = a[i * 3] * b[j] + a[i * 3 + 1] * b[j + 3] + a[i * 3 + 2] * b[j + 6];
        }
    }
    
    return result;
}
// Returns a 3x3 transformation matrix as an array of 9 values in column-major order.
// The arguments are transformation matrices in the same format.
// The returned transformation first applies trans1 and then trans2.
function ApplyTransform(trans1, trans2) {
    var result = new Array(9);
    
    // Perform matrix multiplication
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            result[j * 3 + i] = trans1[i] * trans2[j * 3] + trans1[3 + i] * trans2[j * 3 + 1] + trans1[6 + i] * trans2[j * 3 + 2];
        }
    }
    
    return result;
}
