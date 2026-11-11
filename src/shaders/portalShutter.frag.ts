// PortalWipeShader — full-screen geometric shutter pass.
// A stepped diagonal shutter (hard bands, no soft falloff) wipes between
// dark #060709 and stark alabaster #F4F6F9. uProgress 0..1 drives the wipe;
// uDirection flips it for enter vs leave.
export const PORTAL_SHUTTER_FRAG = /* glsl */ `
  uniform float uProgress;
  uniform float uDirection;
  uniform vec3 uDark;
  uniform vec3 uLight;
  varying vec2 vUv;
  void main() {
    float band = floor((vUv.x + vUv.y * 0.5 + uProgress * 1.6) * 5.0);
    float on = step(0.5, fract(band * 0.5 + uDirection));
    vec3 col = mix(uDark, uLight, on);
    gl_FragColor = vec4(col, 1.0);
  }
`;
export const PORTAL_SHUTTER_VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
