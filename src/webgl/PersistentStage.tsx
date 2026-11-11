"use client";
import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { flatMaterial } from "@/shaders/material";
import { usePortfolio } from "@/store/store";
import CameraSplineRig from "./CameraSplineRig";
import MonolithCore from "./sculptures/MonolithCore";
import ClinicalOscillator from "./sculptures/ClinicalOscillator";
import DefenseBunkerGrid from "./sculptures/DefenseBunkerGrid";
import VoxelKernelLattice from "./sculptures/VoxelKernelLattice";

/** Raycast reticle: casts a ray from the pointer onto the monolith and
    stores the exact intersected world coordinate for the HUD readout. */
function RaycastReticle({ target }: { target: React.RefObject<THREE.Group | null> }) {
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const last = useRef<[number, number, number] | null>(null);
  useFrame((state) => {
    if (!target.current) return;
    raycaster.setFromCamera(state.pointer, state.camera);
    const hits = raycaster.intersectObjects(target.current.children, true);
    const p = hits.length > 0 ? hits[0].point : null;
    if (p) {
      const pt: [number, number, number] = [p.x, p.y, p.z];
      const l = last.current;
      if (!l || Math.abs(l[0] - pt[0]) + Math.abs(l[1] - pt[1]) + Math.abs(l[2] - pt[2]) > 0.05) {
        last.current = pt;
        usePortfolio.getState().setRaycast(pt);
      }
    } else if (last.current) {
      last.current = null;
      usePortfolio.getState().setRaycast(null);
    }
  });
  return null;
}

/** Auditify 36-fin radial dial + SpecBalloon CAD part (chapter-reactive). */
function DialAndCad() {
  const dial = useRef<THREE.Group>(null!);
  const cad = useRef<THREE.Group>(null!);
  const fins = useMemo(() => Array.from({ length: 36 }, (_, i) => i), []);
  const finMat = useMemo(() => flatMaterial("#FF1E42"), []);
  const cobaltMat = useMemo(() => flatMaterial("#0052FF"), []);
  const paperMat = useMemo(() => flatMaterial("#F4F6F9"), []);
  const crimsonMat = useMemo(() => flatMaterial("#FF1E42"), []);
  useFrame((state, delta) => {
    const s = usePortfolio.getState();
    const t = state.clock.getElapsedTime();
    if (dial.current) {
      dial.current.visible = s.activeProjectIndex === 0;
      dial.current.rotation.z += delta * 0.35;
    }
    if (cad.current) {
      cad.current.visible = s.activeProjectIndex === 7;
      cad.current.rotation.y = Math.sin(t * 0.25) * 0.3;
    }
  });
  return (
    <>
      <group ref={dial} visible={false}>
        {fins.map((i) => {
          const a = (i / 36) * Math.PI * 2;
          return (
            <mesh key={i} material={finMat} position={[Math.cos(a) * 1.5, Math.sin(a) * 1.5, 0]} rotation={[0, 0, a]}>
              <boxGeometry args={[0.42, 0.09, 0.09]} />
            </mesh>
          );
        })}
        <mesh material={paperMat} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.9, 0.9, 0.18]} />
        </mesh>
      </group>
      <group ref={cad} visible={false}>
        <mesh material={cobaltMat}>
          <cylinderGeometry args={[0.9, 0.9, 0.35, 24]} />
        </mesh>
        <mesh material={paperMat} position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.35, 0.35, 0.7, 16]} />
        </mesh>
        <mesh material={crimsonMat} position={[1.6, 0, 0]}>
          <boxGeometry args={[0.9, 0.14, 0.14]} />
        </mesh>
      </group>
    </>
  );
}

/** Single persistent WebGL canvas — mounted once, never destroyed. */
export default function PersistentStage() {
  const rayGroup = useRef<THREE.Group>(null);
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[1]">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0.2, 7.2], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => gl.setClearColor("#000000", 0)}
      >
        <CameraSplineRig />
        <group ref={rayGroup}>
          <MonolithCore />
        </group>
        <RaycastReticle target={rayGroup} />
        <ClinicalOscillator />
        <DefenseBunkerGrid />
        <DialAndCad />
        <VoxelKernelLattice />
      </Canvas>
    </div>
  );
}
