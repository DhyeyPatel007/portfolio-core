"use client";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { usePortfolio } from "@/store/store";

/** CatmullRomCurve3 camera path through the 5 chapter zones.
    scrollProgress 0..1 scrubs the camera; lookAt interpolates toward each
    chapter's focal sculpture. Scroll velocity widens FOV 45deg -> 54deg
    and adds rotational torque to the rig. */
const POINTS = [
  new THREE.Vector3(0, 0.2, 7.2),    // Prologue — the monolith
  new THREE.Vector3(-2.2, 0.9, 6.4), // Chapter I — human impact
  new THREE.Vector3(1.8, -1.4, 5.6), // Chapter II — defense bunker, 45° dive
  new THREE.Vector3(0, 0.4, 9.5),    // Chapter III — orthographic CAD pull-back
  new THREE.Vector3(2.4, 1.1, 6.8),  // Chapter IV — editorial atelier
  new THREE.Vector3(0, 0.2, 7.2),    // Chapter V — the forge deck
];
const FOCALS = [
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(-0.6, 0.2, 0),
  new THREE.Vector3(0.4, -0.4, 0),
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(0.6, 0.3, 0),
  new THREE.Vector3(0, 0, 0),
];

export default function CameraSplineRig() {
  const curve = useMemo(() => new THREE.CatmullRomCurve3(POINTS, false, "centripetal"), []);
  const focalCurve = useMemo(() => new THREE.CatmullRomCurve3(FOCALS, false, "centripetal"), []);
  const pos = useRef(new THREE.Vector3());
  const look = useRef(new THREE.Vector3());
  useFrame((state) => {
    const s = usePortfolio.getState();
    const p = THREE.MathUtils.clamp(s.scrollProgress, 0, 1);
    const v = THREE.MathUtils.clamp(Math.abs(s.scrollVelocity), 0, 1);
    curve.getPoint(p, pos.current);
    focalCurve.getPoint(p, look.current);
    const cam = state.camera as THREE.PerspectiveCamera;
    // Pointer parallax + velocity torque on top of the spline position.
    cam.position.lerp(
      new THREE.Vector3(
        pos.current.x + state.pointer.x * 0.45,
        pos.current.y - state.pointer.y * 0.3,
        pos.current.z
      ),
      0.06
    );
    cam.rotation.z = THREE.MathUtils.lerp(cam.rotation.z, v * 0.03 * Math.sign(s.scrollVelocity || 1), 0.05);
    cam.lookAt(look.current);
    const targetFov = 45 + v * 9;
    if (Math.abs(cam.fov - targetFov) > 0.05) {
      cam.fov = THREE.MathUtils.lerp(cam.fov, targetFov, 0.08);
      cam.updateProjectionMatrix();
    }
  });
  return null;
}
