import * as THREE from "three";

class Lights {
  constructor(sketch, settings) {
    this.sketch = sketch;
    this.settings = { ...settings };

    this.ambient();
  }
  ambient() {
    let ambLight = new THREE.AmbientLight(0xffffff, 1, 100);
    this.sketch.scene.add(ambLight);
  }
}
export default Lights;
