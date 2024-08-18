import * as THREE from 'three';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
import fragmentGlsl from './shaders/fragment.glsl';
import vertexGlsl from './shaders/vertex.glsl';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

const gui = new GUI();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 2.5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

renderer.setClearColor(0x101114);

// const geometry = new THREE.PlaneGeometry(2, 2, 10, 10);
const geometry = new THREE.SphereGeometry( 1, 32, 16 ); 
// const material = new THREE.MeshLambertMaterial({
//     color: 0xff8fa9,
//     emissive: 0x0000ff,
//     emissiveIntensity: 0.2
// });
const material = new THREE.RawShaderMaterial(
    {
        vertexShader: vertexGlsl, fragmentShader: fragmentGlsl, uniforms: {
            uTime: { value: 0.0 }, 
            uRadius: { value: 0.3 }, 
        },
        side: THREE.DoubleSide,
        wireframe: false
    }
);
console.log(material);
const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );

// const geometry2 = new THREE.SphereGeometry( 15, 32, 16 ); 
// const material2 = new THREE.MeshLambertMaterial({
//     color: 0x999999,
// });
// const sphere2 = new THREE.Mesh( geometry2, material2 ); 
// sphere2.position.x += 30;
// scene.add( sphere2 );

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(0, 10, 10);
scene.add(dirLight);
const ambLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambLight);

const controls = createControls( camera );


function createControls( camera: THREE.PerspectiveCamera ) {

    const controls = new TrackballControls( camera, renderer.domElement );

    controls.rotateSpeed = 2.5;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;

    return controls;
}
gui.addFolder('Radius').add(material.uniforms.uRadius, 'value');


const clock = new THREE.Clock();
function animate() {
    material.uniforms['uTime'].value = clock.getElapsedTime();
    controls.update();
	renderer.render( scene, camera );
}
clock.start();
renderer.setAnimationLoop( animate );
