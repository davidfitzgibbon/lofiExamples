import Scene from "./components/scene";
import Renderer from "./components/renderer";
import Camera from "./components/camera";
import MoverBox from "./components/MoverBox";

class Sketch {
  constructor(color) {
    this.animationFunctions = [];
    this.color = color;
    this.canvas = document.getElementById(`${this.color}box`);
    this.scene = new Scene();
    this.renderer = new Renderer(this.canvas);
    this.camera = new Camera();

    this.mesh = new MoverBox(this);

    this.animate();
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.animationFunctions.forEach((func) => func());
    this.renderer.render(this.scene, this.camera);
  }
}
export default Sketch;
