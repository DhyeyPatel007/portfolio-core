"use client";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { flatMaterial } from "@/shaders/material";
import { usePortfolio } from "@/store/store";

/** Chapter I sculpture: 4-axis harmonic clinical oscillator —
    spiral drawing, voice, tapping, tremor. */
export default function ClinicalOscillator() {
  const group = useRef<THREE.Group>(null!);
  const mat = useMemo(() => flatMaterial("#00D68F"), []);
  useFrame((state) => {
    const s = usePortfolio.getState();
    if (!group.current) return;
    group.current.visible = s.activeProjectIndex === 1;
    const t = state.clock.getElapsedTime();
    group.current.children.forEach((c, i) => {
      c.position.y = Math.sin(t * 2.2 + i * 1.7) * 0.35;
    });
  });
  return (
    <group ref={group} visible={false}>
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} material={mat} position={[-1.2 + i * 0.8, 0, 0]}>
          <torusGeometry args={[0.28, 0.05, 8, 32]} />
        </mesh>
      ))}
    </group>
  );
}
