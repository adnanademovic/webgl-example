function Mesh (gl, geometry, texture) {
  var vertexCount = geometry.vertexCount()
  this.positions = new VBO(gl, geometry.positions(), vertexCount)
  this.normals = new VBO(gl, geometry.normals(), vertexCount)
  this.uvs = new VBO(gl, geometry.uvs(), vertexCount)
  this.texture = texture
  this.vertexCount = vertexCount
  this.position = new Transformation()
  this.gl = gl
}

Mesh.prototype.destroy = function () {
  this.positions.destroy()
  this.normals.destroy()
  this.uvs.destroy()
}

Mesh.prototype.draw = function (shaderProgram) {
  this.positions.bindToAttribute(shaderProgram.position)
  this.normals.bindToAttribute(shaderProgram.normal)
  this.uvs.bindToAttribute(shaderProgram.uv)
  this.position.sendToGpu(this.gl, shaderProgram.model)
  this.texture.use(shaderProgram.diffuse, 0)
  this.gl.drawArrays(this.gl.TRIANGLES, 0, this.vertexCount)
}

Mesh.load = function (gl, modelUrl, textureUrl) {
  var geometry = Geometry.loadOBJ(modelUrl)
  var texture = Texture.load(gl, textureUrl)
  return Promise.all([geometry, texture]).then(function (params) {
    return new Mesh(gl, params[0], params[1])
  })
}
