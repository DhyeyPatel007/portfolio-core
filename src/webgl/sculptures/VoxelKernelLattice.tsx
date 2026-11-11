"use client";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { flatMaterial } from "@/shaders/material";
import { usePortfolio } from "@/store/store";

/** Chapter III sculpture: 8x8x8 instanced WebGPU compute voxel lattice.
    Fast/verified kernels snap into flat lime; slow kernels cull out. */
export default function VoxelKernelLattice() {
  const ref = useRef<THREE.InstancedMesh>(null!);
  const count = 512;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const mat = useMemo(() => flatMaterial("#B8FF01"), []);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const st = usePortfolio.getState();
    const visible = st.activeProjectIndex === 6 || (st.scrollProgress >= 0.62 && st.scrollProgress < 0.78);
    const t = clock.getElapsedTime();
    let i = 0;
    for (let x = 0; x < 8; x++)
      for (let y = 0; y < 8; y++)
        for (let z = 0; z < 8; z++) {
          const fast = (x * 7 + y * 3 + z * 5) % 4 !== 0;
          const s = !visible ? 0.0001 : fast ? 0.16 : 0.0001;
          dummy.position.set((x - 3.5) * 0.34, (y - 3.5) * 0.34, (z - 3.5) * 0.34);
          dummy.scale.setScalar(s * (1 + 0.08 * Math.sin(t * 2 + x + y)));
          dummy.updateMatrix();
          ref.current.setMatrixAt(i++, dummy.matrix);
        }
    ref.current.instanceMatrix.needsUpdate = true;
  });
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]} material={mat} frustumCulled={false}>
      <boxGeometry args={[1, 1, 1]} />
    </instancedMesh>
  );
}
