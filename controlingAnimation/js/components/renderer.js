import * as THREE from "three";

class Renderer {
  constructor(sketch, settings) {
    this.sketch = sketch;
    this.settings = { ...settings };
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.sketch.sizes.width, this.sketch.sizes.height);
    this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));

    this.renderer.update = this.update.bind(this.sketch);

    return this.renderer;
  }
  update() {
    this.renderer.render(this.scene, this.camera);
  }
}
export default Renderer;
