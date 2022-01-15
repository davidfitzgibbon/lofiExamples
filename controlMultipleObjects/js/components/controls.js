import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

class Controls {
  constructor(sketch, settings) {
    this.sketch = sketch;
    this.settings = { ...settings };

    this.controls = new OrbitControls(
      this.sketch.camera,
      this.sketch.renderer.domElement
    );

    return this.controls;
  }
}
export default Controls;
