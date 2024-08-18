export default /* glsl*/`
precision mediump float;

attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform float uTime;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUV;

void main() {
    vPosition = position;
    vNormal = normal;
    vUV = uv;

    // modelMatrix -> position, scale, rotation of model
    // viewMatrix -> position, orientation of camera
    // projectionMatrix -> project object onto screen
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;