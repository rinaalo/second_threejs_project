export default /* glsl */`
precision mediump float;
uniform float uTime;
uniform float uRadius;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUV;

void main() {

    vec2 uv = vUV;
    uv -= vec2(0.5);
    uv  *= 2.0;
	// gl_FragColor = vec4( abs(sin(time)), 0.0, 1.0, 1.0 );
    // gl_FragColor = vec4( vPosition, 1.0 );
    // gl_FragColor = vec4( vNormal, 1.0 );
    // gl_FragColor = vec4( vUV, 1.0, 1.0 );
    gl_FragColor = vec4(vec3(step(uRadius, length(uv))), 1);
}
`;