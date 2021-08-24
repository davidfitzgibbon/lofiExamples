import * as THREE from "three";

class Lights {
  constructor(sketch, settings) {
    this.sketch = sketch;
    this.settings = { ...settings };

    this.ambient();
    // this.directional();
  }
  ambient() {
    let ambLight = new THREE.AmbientLight(0xffffff, 1.5, 100);
    this.sketch.scene.add(ambLight);
  }
  directional() {
    let dirLight1 = new THREE.DirectionalLight(0xffffff, 2, 100);
    dirLight1.position.set(-1, 5, 3);
    this.sketch.scene.add(dirLight1);
  }
}
export default Lights;
