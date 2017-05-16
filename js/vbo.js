function VBO (gl, data, count) {
  // Creates buffer object in GPU RAM where we can store anything
  var bufferObject = gl.createBuffer()
  // Tell which buffer object we want to operate on as a VBO
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferObject)
  // Write the data, and set the flag to optimize
  // for rare changes to the data we're writing
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW)
  this.gl = gl
  this.size = data.length / count
  this.count = count
  this.data = bufferObject
}

VBO.prototype.destroy = function () {
  // Free memory that is occupied by our buffer object
  this.gl.deleteBuffer(this.data)
}

VBO.prototype.bindToAttribute = function (attribute) {
  var gl = this.gl
  // Tell which buffer object we want to operate on as a VBO
  gl.bindBuffer(gl.ARRAY_BUFFER, this.data)
  // Enable this attribute in the shader
  gl.enableVertexAttribArray(attribute)
  // Define format of the attribute array. Must match parameters in shader
  gl.vertexAttribPointer(attribute, this.size, gl.FLOAT, false, 0, 0)
}
