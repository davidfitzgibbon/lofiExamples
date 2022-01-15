import * as THREE from "three";
class Loader {
  constructor(sketch, settings) {
    this.settings = {
      load: () => {
        console.log("loaded");
      },
      progress: (itemURL, itemsLoaded, itemsTotal) => {
        console.log("%loaded:", itemsLoaded / itemsTotal);
      },
      ...settings,
    };
    this.manager = new THREE.LoadingManager(
      () => this.settings.load(),
      (itemURL, itemsLoaded, itemsTotal) =>
        this.settings.progress(itemURL, itemsLoaded, itemsTotal)
    );
  }
}
export default Loader;
