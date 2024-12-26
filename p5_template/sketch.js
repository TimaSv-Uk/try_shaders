let myShader;
function preload() {
  // load each shader file (don't worry, we will come back to these!)
  myShader = loadShader("shader_vert.glsl","shader_frag.glsl");
}
function setup() {
  // the canvas has to be created with WEBGL mode
  createCanvas(windowWidth, windowHeight, WEBGL);
}
function draw() {
  shader(myShader);

  background(155);
  // noStroke();
  
  let mouseXNorm = mouseX / width;
  let mouseYNorm = mouseY / height;
  myShader.setUniform("mouse", [mouseXNorm, mouseYNorm]);
  // Pass the time from p5 to the shader
  myShader.setUniform('time', millis()/1000);
  myShader.setUniform("resolution", [width, height]);

  plane(width, height);

}
