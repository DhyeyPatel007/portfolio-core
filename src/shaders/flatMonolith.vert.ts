// FlatMonolithShader — vertex stage.
// Subtle simplex-style vertex displacement along face normals on hover
// (uHover 0..1), plus normal/position varyings for the fragment stage.
export const FLAT_MONOLITH_VERT = /* glsl */ `
  uniform float uTime;
  uniform float uHover;
  varying vec3 vNormal;
  varying vec3 vPos;
  float hash(vec3 p) {
    return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453);
  }
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPos = position;
    vec3 displaced = position + normal * (hash(position * 3.0) - 0.5) * 0.06 * uHover
      * (0.5 + 0.5 * sin(uTime * 2.0 + position.y * 4.0));
    gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
  }
`;
