class Events {
  constructor(sketch, settings) {
    this.sketch = sketch;
    this.settings = { ...settings };

    this.addEvents();
  }
  addEvents() {
    window.addEventListener("resize", this.onWindowResize.bind(this), false);
  }
  onWindowResize() {
    this.sketch.sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    this.sketch.camera.aspect =
      this.sketch.sizes.width / this.sketch.sizes.height;
    this.sketch.camera.updateProjectionMatrix();
    this.sketch.renderer.setSize(
      this.sketch.sizes.width,
      this.sketch.sizes.height
    );
    this.sketch.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
  }
}
export default Events;
