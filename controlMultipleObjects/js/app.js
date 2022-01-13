import * as THREE from "three";

import Scene from "./components/scene";
import Renderer from "./components/renderer";
import Camera from "./components/camera";
import Lights from "./components/lights";
import Events from "./components/events";
import Animator from "./components/animator";

class Sketch {
  constructor() {
    this.animator = new Animator(this);
    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    this.scene = new Scene(this);
    this.renderer = new Renderer(this);
    this.camera = new Camera(this);
    this.lights = new Lights(this);
    this.events = new Events(this);
  }
  init() {
    this.addObjects();
    document.body.appendChild(this.renderer.domElement);
    this.animator.animate();
  }
  addObjects() {
    const mat = new THREE.MeshStandardMaterial({
      color: 0xff0000,
    });
    const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
    const mesh = new THREE.Mesh(geometry, mat);
    this.scene.add(mesh);
    this.animator.add(() => {
      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.01;
    });
  }
}

export default Sketch;
