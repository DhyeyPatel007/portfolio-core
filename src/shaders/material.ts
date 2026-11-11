import * as THREE from "three";
import { FLAT_MONOLITH_VERT } from "./flatMonolith.vert";
import { FLAT_MONOLITH_FRAG } from "./flatMonolith.frag";

/** Stepped flat-tone material: 2-tone bands + Bayer dither + edge colour.
    No PBR, no smooth falloff. */
export function flatMaterial(color: string, edge = "#F4F6F9") {
  return new THREE.ShaderMaterial({
    vertexShader: FLAT_MONOLITH_VERT,
    fragmentShader: FLAT_MONOLITH_FRAG,
    uniforms: {
      uColor: { value: new THREE.Color(color) },
      uEdge: { value: new THREE.Color(edge) },
      uLight: { value: new THREE.Vector3(0.6, 0.9, 0.5) },
      uTime: { value: 0 },
      uHover: { value: 0 },
    },
  });
}
