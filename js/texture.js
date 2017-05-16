function Texture (gl, image) {
  var texture = gl.createTexture()
  // Set the newly created texture context as active texture
  gl.bindTexture(gl.TEXTURE_2D, texture)
  // Set texture parameters, and pass the image that the texture is based on
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
  // Set filtering methods
  // Very often shaders will query the texture value between pixels,
  // and this is instructing how that value shall be calculated
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  this.data = texture
  this.gl = gl
}

Texture.prototype.use = function (uniform, binding) {
  binding = Number(binding) || 0
  var gl = this.gl
  // We can bind multiple textures, and here we pick which of the bindings
  // we're setting right now
  gl.activeTexture(gl['TEXTURE' + binding])
  // After picking the binding, we set the texture
  gl.bindTexture(gl.TEXTURE_2D, this.data)
  // Finally, we pass to the uniform the binding ID we've used
  gl.uniform1i(uniform, binding)
  // The previous 3 lines are equivalent to:
  // texture[i] = this.data
  // uniform = i
}

Texture.load = function (gl, url) {
  return new Promise(function (resolve) {
    var image = new Image()
    image.onload = function () {
      resolve(new Texture(gl, image))
    }
    image.src = url
  })
}
