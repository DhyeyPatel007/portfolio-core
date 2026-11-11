"use client";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Edges } from "@react-three/drei";
import * as THREE from "three";
import { flatMaterial } from "@/shaders/material";
import { usePortfolio } from "@/store/store";

/** Chapter II sculpture: the defense bunker — exploded packet-autopsy
    prism with crimson scan planes + the PHALANX 3-pillar triad and gate. */
export default function DefenseBunkerGrid() {
  const prism = useRef<THREE.Group>(null!);
  const triad = useRef<THREE.Group>(null!);
  const crimsonMat = useMemo(() => flatMaterial("#FF1E42"), []);
  const paperMat = useMemo(() => flatMaterial("#F4F6F9"), []);
  const inkMat = useMemo(() => flatMaterial("#0D1015"), []);
  useFrame((state, delta) => {
    const s = usePortfolio.getState();
    const t = state.clock.getElapsedTime();
    if (prism.current) {
      prism.current.visible = s.activeProjectIndex === 3 || s.activeProjectIndex === 4;
      prism.current.rotation.y += delta * 0.5;
      prism.current.rotation.x = 0.4 + Math.sin(t * 0.4) * 0.15;
    }
    if (triad.current) {
      triad.current.visible = s.activeProjectIndex === 2;
      triad.current.rotation.y += delta * 0.2;
    }
  });
  return (
    <>
      <group ref={prism} visible={false}>
        <mesh material={crimsonMat}>
          <octahedronGeometry args={[1.25, 0]} />
          <Edges scale={1.02} threshold={15} color="#F4F6F9" />
        </mesh>
        <mesh material={paperMat} position={[0, 1.9, 0]}><boxGeometry args={[2.2, 0.06, 0.06]} /></mesh>
        <mesh material={paperMat} position={[0, -1.9, 0]}><boxGeometry args={[2.2, 0.06, 0.06]} /></mesh>
      </group>
      <group ref={triad} visible={false}>
        {[-0.9, 0, 0.9].map((x, i) => (
          <mesh key={i} material={inkMat} position={[x, 0.4, 0]}>
            <boxGeometry args={[0.5, 1.7, 0.5]} />
            <Edges scale={1.02} threshold={15} color="#F4F6F9" />
          </mesh>
        ))}
        <mesh material={crimsonMat} position={[0, 1.5, 0]}>
          <boxGeometry args={[2.6, 0.22, 0.6]} />
        </mesh>
      </group>
    </>
  );
}
