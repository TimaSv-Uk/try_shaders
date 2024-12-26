precision mediump float;

uniform float time;
uniform vec2 resolution;
uniform vec2 mouse;

void main() {

 vec2 st = gl_FragCoord.xz/resolution;

 gl_FragColor = vec4(abs(st.x-sin(time)),abs(st.y-sin(time)),1.0,1.0 );
}
