import { VRButton } from './js/VRButton.js';

const scene = new THREE.Scene();
scene.background = new THREE.CubeTextureLoader()
.setPath('skybox_1/').load([
	'front.png',
	'back.png',
	'top.png',
	'bottom.png',
	'left.png',
	'right.png'
]);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Sphere 1
const geometry = new THREE.SphereGeometry(10, 10, 10);
const material = new THREE.MeshNormalMaterial({
	wireframe: true
});
const sphere = new THREE.Mesh(geometry, material);
// scene.add(sphere);

// Sphere 2
const geometry2 = new THREE.SphereGeometry(10, 10, 10);
const material2 = new THREE.MeshNormalMaterial({
	wireframe: true
});
const sphere2 = new THREE.Mesh(geometry2, material2);
sphere2.position.x = 40
scene.add(sphere2);

// Sphere 3
const geometry3 = new THREE.SphereGeometry(10, 10, 10);
const material3 = new THREE.MeshNormalMaterial({
	wireframe: true
});
const sphere3 = new THREE.Mesh(geometry3, material3);
sphere3.position.x = -40
scene.add(sphere3);

camera.position.z = 70;

const domEvents = new THREEx.DomEvents(camera, renderer.domElement);

domEvents.addEventListener(sphere, 'click', event => {
	material.wireframe = false
})

domEvents.addEventListener(sphere2, 'mouseover',event => {
	sphere2.scale.set(2, 2, 2)
})

domEvents.addEventListener(sphere2, 'mouseout',event => {
	sphere2.scale.set(1, 1, 1)
})

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.minDistance = 1
controls.maxDistance = 1000

const vrbutton = VRButton.createButton(renderer);
document.body.appendChild(vrbutton);

renderer.xr.enabled = true;
document.body.appendChild(VRButton.createButton(renderer));

const animate = () => {

	//Animate Sphere 1
	sphere.rotation.x += 0.02;
	sphere.rotation.y += 0.02;

	//Animate Sphere 2
	sphere2.rotation.x += 0.02;
	sphere2.rotation.y += 0.02;

	//Animate Sphere 3
	sphere3.rotation.x += 0.02;
	sphere3.rotation.y += 0.02;

	controls.update();

	requestAnimationFrame(animate);
	// renderer.setAnimationLoop(function(time) {
	// 	renderer.render(scene, camera);
	// });
	renderer.render(scene, camera);
}
renderer.setAnimationLoop(function() {
	renderer.render(scene, camera);
});

animate();
