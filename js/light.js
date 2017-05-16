function Light () {
  this.lightDirection = new Vector3(-1, -1, -1)
  this.ambientLight = 0.3
}

Light.prototype.use = function (shaderProgram) {
  var dir = this.lightDirection
  var gl = shaderProgram.gl
  gl.uniform3f(shaderProgram.lightDirection, dir.x, dir.y, dir.z)
  gl.uniform1f(shaderProgram.ambientLight, this.ambientLight)
}
