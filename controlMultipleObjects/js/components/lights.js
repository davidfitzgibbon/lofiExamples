import * as THREE from "three";

class Lights {
  constructor(sketch, settings) {
    this.sketch = sketch;
    this.settings = { ...settings };

    this.ambient();
    this.directional(3);
    this.directional(-3);
  }
  ambient() {
    let ambLight = new THREE.AmbientLight(0xffffff, 1, 100);
    this.sketch.scene.add(ambLight);
  }
  directional(x) {
    let dirLight = new THREE.DirectionalLight(0xffffff, 1, 100);
    dirLight.position.set(x, 5, 3);
    this.sketch.scene.add(dirLight);
  }
}
export default Lights;
