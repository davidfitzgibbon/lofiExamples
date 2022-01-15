import * as THREE from "three";

let camera, scene, renderer;

init();
animate();

function init() {
  // CANVAS
  const canvas = document.getElementById("redbox");

  // SCENE
  scene = new THREE.Scene();

  // RENDERER
  renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(600, 300);

  // CAMERA
  const w = window.innerWidth;
  const h = window.innerHeight;
  camera = new THREE.PerspectiveCamera(75, w / h, 0.01, 20);
  camera.position.set(0, 0.7, 1.2);
  camera.lookAt(0, 0, 0);

  // MESH
  const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  const material = new THREE.MeshBasicMaterial({ color: "red" });
  window.mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
}

function animate() {
  requestAnimationFrame(animate);

  mesh.position.x = Math.sin(Date.now() * 0.001) * 0.5;

  renderer.render(scene, camera);
}
