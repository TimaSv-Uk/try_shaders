attribute vec4 aPosition;

void main() {
  // Pass the position directly to the screen
  gl_Position = vec4(aPosition);
}
