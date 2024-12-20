var canvas = document.querySelector("#glCanvas");
var sandbox = new GlslCanvas(canvas);
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

const vsSource = `
    attribute vec4 aVertexPosition;
    void main(void){
      gl_Position = aVertexPosition;
    }
`;
sandbox.load(fsSource, vsSource);
