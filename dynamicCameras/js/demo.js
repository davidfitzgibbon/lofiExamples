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

    // SET UP DEFAULT CAMERA
    this.activeCamera = this.defaultCamera;
    // SET UP FPS CAMERA
    this.fpsCamera = new THREE.PerspectiveCamera(
      75,
      this.sizes.width / this.sizes.height,
      0.001,
      20
    );

    let cameraViews = ["third-person", "first-person"];
    this.settings = {
      playhead: 0.001,
      camera: cameraViews[0],
      showTarget: true,
    };
    this.gui.add(this.settings, "playhead", 0.001, 1, 0.001);
    this.gui.add(this.settings, "camera", cameraViews);
    this.gui.add(this.settings, "showTarget");
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
      this.cameraModel = gltf.scene.children[1];
      scale = 0.0005;
      this.cameraModel.scale.set(scale, scale, scale);

      this.addObjects();
    });
    document.body.appendChild(this.renderer.domElement);
    this.animator.animate();
  }
  addObjects() {
    this.scene.add(this.stage);
    this.scene.add(this.cameraModel);

    // SET UP TARGET
    const targetGeo = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    const targetMat = new THREE.MeshBasicMaterial({ color: "dodgerblue" });
    const target = new THREE.Mesh(targetGeo, targetMat);
    target.position.y = 0.1;
    this.scene.add(target);

    // SET UP CURVE FOR CAMERA TO FOLLOW
    const curve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(-0.5, 0.55, 0),
      new THREE.Vector3(-0.5, 0.1, 0),
      new THREE.Vector3(-0.45, 0.1, 0),
      new THREE.Vector3(0, 0.1, 0)
    );
    // show the curve
    const points = curve.getPoints(50);
    const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
    const lineMat = new THREE.LineBasicMaterial({ color: 0x00ffff });
    this.line = new THREE.Line(lineGeo, lineMat);
    this.scene.add(this.line);

    // ANIMATE
    this.animator.add(() => {
      const playhead = this.settings.playhead;

      // UPDATE TARGET
      target.visible = this.settings.showTarget;
      target.position.x = playhead - 0.5;

      // UPDATE CAMERA
      const pos = curve.getPoint(playhead);
      this.cameraModel.position.set(pos.x, pos.y, pos.z);
      this.cameraModel.lookAt(target.position);
      this.fpsCamera.position.copy(this.cameraModel.position);
      this.fpsCamera.lookAt(target.position);

      // HIDE AND SHOW THINGS
      if (this.settings.camera == "third-person") {
        this.activeCamera = this.defaultCamera;

        this.cameraModel.visible = true;
        this.line.visible = true;
      }

      if (this.settings.camera == "first-person") {
        this.activeCamera = this.fpsCamera;

        this.cameraModel.visible = false;
        this.line.visible = false;
      }
    });
  }
}

export default Sketch;
