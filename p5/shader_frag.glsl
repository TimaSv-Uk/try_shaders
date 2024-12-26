precision mediump float;

uniform float time;
uniform vec2 resolution;
uniform vec2 mouse;

void main() {
    // Normalize the fragment coordinates to the range [0, 1]
    //(gl_FragCoord.xy / resolution):  pixel_coordinate_from_zero_to_one
    vec2 uv = gl_FragCoord.xy / resolution;

    // Adjust coordinates to the range [-0.5, 0.5]
    //- vec2(1.0, 1.0): needed to move (0,0) coord to center but now range of coords from (-0.5,-0.5) to  (0.5,0.5)
    uv = uv - vec2(1., 1.);

    // Scale to the range [0, 1]
    //*2.0: to fix range of coords from (-0.5,-0.5) to  (0.5,0.5) and get from (0,0) to  (1,1)
    uv = uv * 2.0;

    // to prevent streching on screen change
    //  used in shaders to correct the aspect ratio of the coordinates and prevent distortion (stretching or squishing) when rendering on screens with non-square dimensions (i.e., the width and height are not equal).
    uv.x *= resolution.x / resolution.y;

    // center = [0,0]
    float distance_from_coord_to_center = length(uv);
    // distance_from_coord_to_center -= 0.5;

    // to get repiting rings
    // This scales the distance. By multiplying it by 10.0, the value grows faster, effectively increasing the frequency of the sine wave. This results in more rings in the pattern.
    // /10 to smoothe lines to gradirent isted of clean ring
    //  time to make it move 
    distance_from_coord_to_center = sin(distance_from_coord_to_center * 1000. * time)/10.;
    // getting positive velues from each pixel witch makes a reing
    distance_from_coord_to_center = abs(distance_from_coord_to_center);
    // all values that less then 0.1 will be assign 0(black) else 1(white)
    // distance_from_coord_to_center = step(0.1, distance_from_coord_to_center);

    // all values that more then 0.1 will be assign 1(white), less then 0.0 will be assign 0(black), vals beetwin gradient;
    distance_from_coord_to_center = smoothstep(0.0, 0.1, distance_from_coord_to_center);

    gl_FragColor = vec4(distance_from_coord_to_center, distance_from_coord_to_center, distance_from_coord_to_center, 1.0);
}
