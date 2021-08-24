const fragment = /*glsl*/`
  uniform float amount;
  uniform sampler2D tDiffuse;
  varying vec2 vUv;

  void main() {

    gl_FragColor = vec4( vUv.x,0.,vUv.y, 1);
}
`
export default fragment