import * as THREE from "three";

class MoverBox {
  constructor(sketch) {
    this.sketch = sketch;

    // MESH
    const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const material = new THREE.MeshBasicMaterial({ color: this.sketch.color });
    this.mesh = new THREE.Mesh(geometry, material);
    this.sketch.scene.add(this.mesh);

    this.sketch.animationFunctions.push(this.animation.bind(this));

    return this.mesh;
  }
  animation() {
    this.mesh.position.x = Math.sin(Date.now() * 0.001) * 0.5;
  }
}
export default MoverBox;
