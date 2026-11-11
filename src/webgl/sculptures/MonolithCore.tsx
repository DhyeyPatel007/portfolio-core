"use client";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Edges, Float } from "@react-three/drei";
import * as THREE from "three";
import { flatMaterial } from "@/shaders/material";
import { usePortfolio } from "@/store/store";

function Plate({ position, size, color, rotation }: {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  rotation?: [number, number, number];
}) {
  const mat = useMemo(() => flatMaterial(color), [color]);
  return (
    <mesh position={position} rotation={rotation} material={mat}>
      <boxGeometry args={size} />
      <Edges scale={1.02} threshold={15} color="#060709" />
    </mesh>
  );
}

/** Prologue & System Awakening sculpture: the fractured monolith core —
    interlocking precision rings, coordinate axes, flat data plates.
    Rotates with scroll velocity; the uHover uniform displaces vertices. */
export default function MonolithCore() {
  const group = useRef<THREE.Group>(null!);
  const inkMat = useMemo(() => flatMaterial("#0D1015"), []);
  const paperMat = useMemo(() => flatMaterial("#F4F6F9"), []);
  useFrame((state, delta) => {
    const s = usePortfolio.getState();
    const v = THREE.MathUtils.clamp(s.scrollVelocity, -1, 1);
    if (!group.current) return;
    group.current.rotation.y += delta * (0.25 + Math.abs(v) * 1.4);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, s.scrollProgress < 0.16 ? 0.35 : 0.9, 0.05);
    group.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.08;
    group.current.visible = s.scrollProgress < 0.62 || s.activeProjectIndex === 0;
    const hover = group.current.visible ? 0.35 : 0;
    (inkMat.uniforms.uHover as { value: number }).value = hover;
    (inkMat.uniforms.uTime as { value: number }).value = state.clock.getElapsedTime();
  });
  return (
    <group ref={group}>
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
        <mesh material={inkMat} rotation={[Math.PI / 2.4, 0.3, 0]}>
          <torusGeometry args={[1.55, 0.09, 8, 48]} />
          <Edges scale={1.01} threshold={15} color="#F4F6F9" />
        </mesh>
        <mesh material={paperMat} rotation={[Math.PI / 1.8, 0.9, 0.4]}>
          <torusGeometry args={[1.15, 0.06, 8, 48]} />
          <Edges scale={1.01} threshold={15} color="#060709" />
        </mesh>
        <Plate position={[0, 0, 0]} size={[1.5, 1.5, 0.22]} color="#FF1E42" rotation={[0.2, 0.5, 0]} />
        <Plate position={[-1.9, 0.9, -0.4]} size={[0.7, 0.7, 0.12]} color="#0052FF" rotation={[0.4, 0.2, 0.3]} />
        <Plate position={[1.9, -0.8, -0.3]} size={[0.55, 0.9, 0.12]} color="#B8FF01" rotation={[0.1, -0.4, 0.2]} />
        <Plate position={[0, -1.7, 0.3]} size={[1.1, 0.28, 0.12]} color="#F4F6F9" />
      </Float>
    </group>
  );
}
