class Animator {
  constructor(sketch, settings) {
    this.sketch = sketch;
    this.settings = { ...settings };

    this.tasks = [];
  }
  add(fn) {
    this.tasks.push(fn);
  }
  animate() {
    requestAnimationFrame(this.animate.bind(this));

    this.tasks.forEach((task) => task());

    this.sketch.renderer.update();
  }
}
export default Animator;
