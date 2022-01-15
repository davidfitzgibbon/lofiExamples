import * as THREE from "three";

class Camera {
  constructor() {
    console.log("camera");
    // CAMERA
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(75, w / h, 0.01, 20);
    this.camera.position.set(0, 0.7, 1.2);
    this.camera.lookAt(0, 0, 0);

    return this.camera;
  }
}
export default Camera;
