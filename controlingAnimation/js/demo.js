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
      load: () => {
        this.addObjects();
      },
    });
    this.clock = new THREE.Clock();
    this.clock.start();

    this.settings = {
      playhead: 0.001,
      spookyDance: false,
    };
    this.gui.add(this.settings, "playhead", 0.001, 1, 0.001);
    this.gui.add(this.settings, "spookyDance");

    this.animating = false;
  }
  init() {
    const gltfLoader = new GLTFLoader(this.loader.manager);
    this.pumpkin = new THREE.Object3D();
    gltfLoader.load("./models/pumpkin.glb", (gltf) => {
      this.pumpkin = gltf.scene.children[0];

      let scale = 0.5;
      this.pumpkin.scale.set(scale, scale, scale);
      this.pumpkin.position.y = 0.1;
      this.pumpkin.castShadow = true;
      this.pumpkin.material.roughness = 1;
    });
    gltfLoader.load("./models/table.glb", (gltf) => {
      this.table = gltf.scene.children[0];
      this.table.receiveShadow = true;
      this.table.castShadow = true;
      this.table.material.roughness = 1;
    });
    document.body.appendChild(this.renderer.domElement);
    this.animator.animate();
  }
  addObjects() {
    this.floorMat = new THREE.MeshStandardMaterial({ color: "#270703" });
    this.floorGeo = new THREE.PlaneGeometry(3, 3);
    this.floor = new THREE.Mesh(this.floorGeo, this.floorMat);
    this.floor.rotation.x = -Math.PI * 0.5;
    this.floor.position.y = -0.5;
    this.floor.receiveShadow = true;

    this.group = new THREE.Group();
    this.group.add(this.floor);
    this.group.add(this.pumpkin);
    this.group.add(this.table);
    this.scene.add(this.group);

    // ANIMATE
    this.animator.add(() => {
      const playhead = this.settings.playhead;
      this.group.rotation.y = tau * playhead;
      if (this.animating) {
        this.group.rotation.y += 0.01;

        this.settings.playhead = (this.group.rotation.y / tau) % 1;
      }
      this.gui.updateDisplay();
    });
  }
}

export default Sketch;
