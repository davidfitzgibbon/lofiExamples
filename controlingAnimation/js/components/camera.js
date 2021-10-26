import * as THREE from "three";

class Camera {
  constructor(sketch, settings) {
    this.sketch = sketch;
    this.settings = { ...settings };

    this.camera = new THREE.PerspectiveCamera(
      75,
      this.sketch.sizes.width / this.sketch.sizes.height,
      0.01,
      20
    );
    this.camera.position.x = 0;
    this.camera.position.y = 0.5;
    this.camera.position.z = 1.5;
    this.sketch.scene.add(this.camera);

    return this.camera;
  }
}
export default Camera;
