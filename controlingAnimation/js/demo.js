import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import gui from "./components/gui";
import Scene from "./components/scene";
import Renderer from "./components/renderer";
import Controls from "./components/controls";
import Loader from "./components/loader";
import Camera from "./components/camera";
import Lights from "./components/lights";
import Events from "./components/events";
import Animator from "./components/animator";

const tau = Math.PI * 2;
class Sketch {
  constructor() {
    this.gui = gui;
    this.animator = new Animator(this);
    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    this.scene = new Scene(this);
    this.renderer = new Renderer(this);
    this.camera = new Camera(this);
    this.lights = new Lights(this);
    this.controls = new Controls(this);
    this.events = new Events(this);
    this.loader = new Loader(this, {
      load: () => {},
    });
    this.clock = new THREE.Clock();
    this.clock.start();
  }
  init() {
    this.addObjects();
    document.body.appendChild(this.renderer.domElement);
    this.animator.animate();
  }
  addObjects() {
    // a green box
    this.geometry = new THREE.BoxGeometry(1, 1, 1);
    this.material = new THREE.MeshBasicMaterial({ color: 0xe9c46a });
    this.box = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.box);

    // ANIMATE
    this.animator.add(() => {});
  }
}

export default Sketch;
