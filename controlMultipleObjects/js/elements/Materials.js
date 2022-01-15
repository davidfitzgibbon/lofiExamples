import * as THREE from "three";

export default class Materials {
  constructor() {
    this.materials = [];
    this.colors = [0x003049, 0xd62828, 0xf77f00];
    this.colors.forEach((color) => {
      this.createMaterial(color);
    });
    return this;
  }
  getRandomMaterial() {
    return this.materials[Math.floor(Math.random() * this.materials.length)];
  }
  createMaterial(color) {
    this.materials.push(
      new THREE.MeshStandardMaterial({
        color: color,
      })
    );
  }
}
