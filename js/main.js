// WebGL Example
// Copyright (C) 2017  Adnan Ademovic
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

var renderer = new Renderer(document.getElementById('webgl-canvas'))
renderer.setClearColor(100, 149, 237)
var gl = renderer.getContext()

var objects = []

Mesh.load(gl, '/assets/sphere.obj', '/assets/diffuse.png')
    .then(function (mesh) {
      objects.push(mesh)
    })

ShaderProgram.load(gl, '/shaders/basic.vert', '/shaders/basic.frag')
             .then(function (shader) {
               renderer.setShader(shader)
             })

var camera = new Camera()
camera.setOrthographic(16, 10, 10)
var light = new Light()

loop()

function loop () {
  renderer.render(camera, light, objects)
  camera.position = camera.position.rotateY(Math.PI / 120)
  requestAnimationFrame(loop)
}
