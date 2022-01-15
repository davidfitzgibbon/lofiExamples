import * as THREE from "three";

export default class Thing {
  constructor(sketch, x, y) {
    this.sketch = sketch;
    this.mat = this.sketch.materials.getRandomMaterial();
    this.geometry = this.sketch.geometries.getRandomGeometry();
    this.mesh = new THREE.Mesh(this.geometry, this.mat);
    this.mesh.position.set(x, y, 0);
    this.sketch.scene.add(this.mesh);
    this.rotationSpeed = Math.random() * 0.2 - 0.1;
    this.sketch.animator.add(() => {
      this.mesh.rotation.x += this.rotationSpeed;
      this.mesh.rotation.y += this.rotationSpeed;

      if (this.sketch.animator.frame % 60 == 0) {
        if (Math.random() > 0.7) {
          this.mesh.material = this.sketch.materials.getRandomMaterial();
          this.mesh.geometry = this.sketch.geometries.getRandomGeometry();
        }
      }
    });
  }
}
