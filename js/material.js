function ShaderProgram (gl, vertSrc, fragSrc) {
  var vert = gl.createShader(gl.VERTEX_SHADER)
  gl.shaderSource(vert, vertSrc)
  gl.compileShader(vert)
  if (!gl.getShaderParameter(vert, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(vert))
    throw new Error('Failed to compile shader')
  }

  var frag = gl.createShader(gl.FRAGMENT_SHADER)
  gl.shaderSource(frag, fragSrc)
  gl.compileShader(frag)
  if (!gl.getShaderParameter(frag, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(frag))
    throw new Error('Failed to compile shader')
  }

  var program = gl.createProgram()
  gl.attachShader(program, vert)
  gl.attachShader(program, frag)
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program))
    throw new Error('Failed to link program')
  }

  this.gl = gl
  this.position = gl.getAttribLocation(program, 'position')
  this.normal = gl.getAttribLocation(program, 'normal')
  this.uv = gl.getAttribLocation(program, 'uv')
  this.model = gl.getUniformLocation(program, 'model')
  this.view = gl.getUniformLocation(program, 'view')
  this.projection = gl.getUniformLocation(program, 'projection')
  this.ambientLight = gl.getUniformLocation(program, 'ambientLight')
  this.lightDirection = gl.getUniformLocation(program, 'lightDirection')
  this.diffuse = gl.getUniformLocation(program, 'diffuse')
  this.vert = vert
  this.frag = frag
  this.program = program
}

// Loads shader files from the given URLs, and returns a program as a promise
ShaderProgram.load = function (gl, vertUrl, fragUrl) {
  return Promise.all([loadFile(vertUrl), loadFile(fragUrl)]).then(function (files) {
    return new ShaderProgram(gl, files[0], files[1])
  })

  function loadFile (url) {
    return new Promise(function (resolve) {
      var xhr = new XMLHttpRequest()
      xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
          resolve(xhr.responseText)
        }
      }
      xhr.open('GET', url, true)
      xhr.send(null)
    })
  }
}

ShaderProgram.prototype.use = function () {
  this.gl.useProgram(this.program)
}
