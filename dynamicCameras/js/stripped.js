import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import gui from "./components/gui";
import Scene from "./components/scene";
import Renderer from "./components/renderer";
import Controls from "./components/controls";
import Camera from "./components/camera";
import Lights from "./components/lights";
import Events from "./components/events";
import Animator from "./components/animator";
import { Object3D } from "three";

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
    this.defaultCamera = new Camera(this);
    this.lights = new Lights(this);
    this.controls = new Controls(this);
    this.events = new Events(this);
    this.clock = new THREE.Clock();
    this.clock.start();
    this.activeCamera = this.defaultCamera;

    this.settings = {
      playhead: 0.001,
    };
    this.gui.add(this.settings, "playhead", 0.001, 1, 0.001);
  }
  init() {
    const gltfLoader = new GLTFLoader();
    gltfLoader.load("./models/stage.glb", (gltf) => {
      let scale;

      // STAGE
      this.stage = gltf.scene.children[0];
      scale = 0.005;
      this.stage.scale.x = scale;
      this.stage.scale.y = scale;
      this.stage.scale.z = scale;
      // CAM
      this.cam = gltf.scene.children[1];
      scale = 0.0005;
      this.cam.scale.set(scale, scale, scale);

      this.addObjects();
    });
    document.body.appendChild(this.renderer.domElement);
    this.animator.animate();
  }
  addObjects() {
    this.scene.add(this.stage);

    // SET UP CURVE FOR CAMERA TO FOLLOW
    const bezier = new THREE.CubicBezierCurve3(
      new THREE.Vector3(-0.5, 0.55, 0),
      new THREE.Vector3(-0.5, 0.1, 0),
      new THREE.Vector3(-0.45, 0.1, 0),
      new THREE.Vector3(0, 0.1, 0)
    );
    
    // SET UP TARGET
    const target = new Object3D();
    target.position.y = .1;
    this.scene.add(target);

    this.animator.add(() => {
      const playhead = this.settings.playhead;
      
      // UPDATE TARGET
      target.position.x = Math.sqrt(playhead) - .5;

      // UPDATE CAMERA
      this.defaultCamera.lookAt(target.position);
      const pos = bezier.getPoint(playhead);
      this.defaultCamera.position.set(pos.x,pos.y,pos.z)
    });
  }
}

export default Sketch;
