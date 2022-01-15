import * as THREE from "three";

import Scene from "./components/scene";
import Renderer from "./components/renderer";
import Camera from "./components/camera";
import Lights from "./components/lights";
import Events from "./components/events";
import Animator from "./components/animator";

import Thing from "./elements/Thing.js";
import Materials from "./elements/Materials.js";
import Geometries from "./elements/Geometries.js";

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
    this.materials = new Materials(this);
    this.geometries = new Geometries(this);

    this.things = [];
    this.num = 3;
    this.width = 6;
    for (let x = 0; x <= this.num; x++) {
      for (let y = 0; y <= this.num; y++) {
        const posX = (x / this.num) * this.width - this.width / 2;
        const posY = (y / this.num) * this.width - this.width / 2;
        this.things.push(new Thing(this, posX, posY));
      }
    }
  }
}

export default Sketch;
