function Renderer (canvas) {
  var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
  gl.enable(gl.DEPTH_TEST)
  this.gl = gl
  this.shader = null
}

Renderer.prototype.setClearColor = function (red, green, blue) {
  this.gl.clearColor(red / 255, green / 255, blue / 255, 1)
}

Renderer.prototype.getContext = function () {
  return this.gl
}

Renderer.prototype.setShader = function (shader) {
  this.shader = shader
}

Renderer.prototype.render = function (camera, light, objects) {
  this.gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
  var shader = this.shader
  if (!shader) {
    return
  }
  shader.use()
  light.use(shader)
  camera.use(shader)
  objects.forEach(function (mesh) {
    mesh.draw(shader)
  })
}
