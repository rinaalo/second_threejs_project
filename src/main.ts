import * as THREE from 'three';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 30;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.SphereGeometry( 15, 32, 16 ); 
const material = new THREE.MeshToonMaterial({
    color: 0xff8fa9
});
const sphere = new THREE.Mesh( geometry, material ); 
scene.add( sphere );

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 10, 10);
scene.add(light);

const controls = createControls( camera );


function createControls( camera: THREE.PerspectiveCamera ) {

    const controls = new TrackballControls( camera, renderer.domElement );

    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;

    return controls;
}

function animate() {
    controls.update();
	renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );
