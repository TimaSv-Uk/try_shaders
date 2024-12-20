function initWebGL() {
  const canvas = document.getElementById("glCanvas");
  const gl = canvas.getContext("webgl");

  return gl;
}

const gl = initWebGL();

if (gl) {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
}

const vsSource = `
    attribute vec4 aVertexPosition;
    void main(void){
      gl_Position = aVertexPosition;
    }
`;
const fsSource = `
#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;

vec4 red(){
    return vec4(1.0,0.0,0.0,1.0);
}
void main() {
	gl_FragColor = red();
}
`;

function loadShader(gl, type, source) {
    const shader = gl.createShader(type);

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('An error occurred compiling the shaders:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}

const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

function initShaderProgram(gl, vs, fs) {
    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vs);
    gl.attachShader(shaderProgram, fs);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        console.error('Unable to initialize the shader program:', gl.getProgramInfoLog(shaderProgram));
        return null;
    }

    return shaderProgram;
}

const shaderProgram = initShaderProgram(gl, vertexShader, fragmentShader);
function initBuffers(gl) {
    // Fullscreen quad (two triangles forming a rectangle covering the entire screen)
    const vertices = new Float32Array([
        -1.0, -1.0, // Bottom left
         1.0, -1.0, // Bottom right
        -1.0,  1.0, // Top left
         1.0, -1.0, // Bottom right
         1.0,  1.0, // Top right
        -1.0,  1.0, // Top left
    ]);

    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    return vertexBuffer;
}

const vertexBuffer = initBuffers(gl);
function drawScene(gl, shaderProgram, vertexBuffer) {
    gl.clear(gl.COLOR_BUFFER_BIT);

    const vertexPosition = gl.getAttribLocation(shaderProgram, 'aVertexPosition');
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.vertexAttribPointer(vertexPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vertexPosition);

    gl.useProgram(shaderProgram);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
}

drawScene(gl, shaderProgram, vertexBuffer);
