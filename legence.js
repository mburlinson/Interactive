import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const views = [
	{ position: { x: 0, y: 0, z: 3 } },
	{ position: { x: 3, y: 0, z: 0 } },
	{ position: { x: 0, y: 3, z: 0 } },
	{ position: { x: 0, y: -3, z: 0 } },
	{ position: { x: -3, y: 0, z: 0 } },
	{ position: { x: 0, y: 0, z: -3 } },
	{ position: { x: 5, y: 5, z: 5 } },
	{ position: { x: -5, y: -5, z: -5 } }
];

let currentView = 0;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const loader = new GLTFLoader();
loader.load('https://uploads-ssl.webflow.com/63ee670910ab9c7c67e99754/63efcaa3fb59af833118b430_legence-building.glb.txt', function (gltf) {
	const model = gltf.scene;
	scene.add(model);
});

function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}

function changeView(viewIndex) {
	currentView = viewIndex;
	camera.position.set(views[currentView].position.x, views[currentView].position.y, views[currentView].position.z);
	camera.lookAt(scene.position);
}

function scrollHandler(e) {
	if (e.deltaY > 0) {
		currentView = (currentView + 1) % views.length;
	} else {
		currentView = (currentView + views.length - 1) % views.length;
	}

	changeView(currentView);
}

window.addEventListener('wheel', scrollHandler);

document.getElementById('view1').addEventListener('click', function() {
	changeView(0);
});

document.getElementById('view2').addEventListener('click', function() {
	changeView(1);
});

document.getElementById('view3').addEventListener('click', function() {
	changeView(2);
});

document.getElementById('view4').addEventListener('click', function() {
	changeView(3);
});

document.getElementById('view5').addEventListener('click', function() {
	changeView(4);
});

document.getElementById('view6').addEventListener('click', function() {
	changeView(5);
});

document.getElementById('view7').addEventListener('click', function() {
	changeView(6);
});

document.getElementById('view8').addEventListener('click', function() {
	changeView(7);
});

animate();