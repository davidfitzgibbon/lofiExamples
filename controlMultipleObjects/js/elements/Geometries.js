import * as THREE from "three";

export default class Geometries {
  constructor() {
    this.geometries = [
      new THREE.BoxBufferGeometry(1, 1, 1),
      new THREE.ConeBufferGeometry(0.7, 1, 32),
      new THREE.CylinderBufferGeometry(0.5, 0.5, 1, 32),
      new THREE.TorusGeometry(0.5, 0.5, 16, 100),
    ];
    return this;
  }
  getRandomGeometry() {
    return this.geometries[Math.floor(Math.random() * this.geometries.length)];
  }
}
