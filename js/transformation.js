function Transformation () {
  // Create an identity transformation
  this.fields = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
}

// Multiply matrices, to chain transformations
Transformation.prototype.mult = function (t) {
  var output = new Transformation()
  for (var row = 0; row < 4; ++row) {
    for (var col = 0; col < 4; ++col) {
      var sum = 0
      for (var k = 0; k < 4; ++k) {
        sum += this.fields[k * 4 + row] * t.fields[col * 4 + k]
      }
      output.fields[col * 4 + row] = sum
    }
  }
  return output
}

// Multiply by translation matrix
Transformation.prototype.translate = function (x, y, z) {
  var mat = new Transformation()
  mat.fields[12] = Number(x) || 0
  mat.fields[13] = Number(y) || 0
  mat.fields[14] = Number(z) || 0
  return this.mult(mat)
}

// Multiply by scaling matrix
Transformation.prototype.scale = function (x, y, z) {
  var mat = new Transformation()
  mat.fields[0] = Number(x) || 0
  mat.fields[5] = Number(y) || 0
  mat.fields[10] = Number(z) || 0
  return this.mult(mat)
}

// Multiply by rotation matrix around X axis
Transformation.prototype.rotateX = function (angle) {
  angle = Number(angle) || 0
  var c = Math.cos(angle)
  var s = Math.sin(angle)
  var mat = new Transformation()
  mat.fields[5] = c
  mat.fields[10] = c
  mat.fields[9] = -s
  mat.fields[6] = s
  return this.mult(mat)
}

// Multiply by rotation matrix around Y axis
Transformation.prototype.rotateY = function (angle) {
  angle = Number(angle) || 0
  var c = Math.cos(angle)
  var s = Math.sin(angle)
  var mat = new Transformation()
  mat.fields[0] = c
  mat.fields[10] = c
  mat.fields[2] = -s
  mat.fields[8] = s
  return this.mult(mat)
}

// Multiply by rotation matrix around Z axis
Transformation.prototype.rotateZ = function (angle) {
  angle = Number(angle) || 0
  var c = Math.cos(angle)
  var s = Math.sin(angle)
  var mat = new Transformation()
  mat.fields[0] = c
  mat.fields[5] = c
  mat.fields[4] = -s
  mat.fields[1] = s
  return this.mult(mat)
}

Transformation.prototype.sendToGpu = function (gl, uniform, transpose) {
  gl.uniformMatrix4fv(uniform, transpose || false, new Float32Array(this.fields))
}
