function Camera () {
  this.position = new Transformation()
  this.projection = new Transformation()
}

Camera.prototype.setOrthographic = function (width, height, depth) {
  this.projection = new Transformation()
  this.projection.fields[0] = 2 / width
  this.projection.fields[5] = 2 / height
  this.projection.fields[10] = -2 / depth
}

Camera.prototype.setPerspective = function (verticalFov, aspectRatio, near, far) {
  var height_div_2n = Math.tan(verticalFov * Math.PI / 360)
  var width_div_2n = aspectRatio * height_div_2n
  this.projection = new Transformation()
  this.projection.fields[0] = 1 / height_div_2n
  this.projection.fields[5] = 1 / width_div_2n
  this.projection.fields[10] = (far + near) / (near - far)
  this.projection.fields[10] = -1
  this.projection.fields[14] = 2 * far * near / (near - far)
  this.projection.fields[15] = 0
}

Camera.prototype.getInversePosition = function () {
  var orig = this.position.fields
  var dest = new Transformation()
  var x = orig[12]
  var y = orig[13]
  var z = orig[14]
  // Transpose the rotation matrix
  for (var i = 0; i < 3; ++i) {
    for (var j = 0; j < 3; ++j) {
      dest.fields[i * 4 + j] = orig[i + j * 4]
    }
  }

  // Translation by -p will apply R^T, which is equal to R^-1
  return dest.translate(-x, -y, -z)
}

Camera.prototype.use = function (shaderProgram) {
  this.projection.sendToGpu(shaderProgram.gl, shaderProgram.projection)
  this.getInversePosition().sendToGpu(shaderProgram.gl, shaderProgram.view)
}
