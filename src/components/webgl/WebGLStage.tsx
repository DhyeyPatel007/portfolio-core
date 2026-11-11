"use client";
import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Edges, Float } from "@react-three/drei";
import * as THREE from "three";
import { usePortfolio } from "@/store/store";

/* Custom flat-tone GLSL: stepped cel luminance + 4x4 Bayer dithering.
   No smooth Phong/PBR falloff, no gradients — solid flat fills only. */
const VERT = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vPos;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const FRAG = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uLight;
  varying vec3 vNormal;
  varying vec3 vPos;
  float bayer(vec2 p) {
    int x = int(mod(p.x, 4.0));
    int y = int(mod(p.y, 4.0));
    int idx = y * 4 + x;
    float m[16];
    m[0]=0.0; m[1]=8.0; m[2]=2.0; m[3]=10.0;
    m[4]=12.0; m[5]=4.0; m[6]=14.0; m[7]=6.0;
    m[8]=3.0; m[9]=11.0; m[10]=1.0; m[11]=9.0;
    m[12]=15.0; m[13]=7.0; m[14]=13.0; m[15]=5.0;
    return m[idx] / 16.0;
  }
  void main() {
    float d = max(dot(normalize(vNormal), normalize(uLight)), 0.0);
    float stepped = d > 0.66 ? 1.0 : (d > 0.33 ? 0.72 : 0.45);
    float dither = bayer(gl_FragCoord.xy * 0.5) * 0.08;
    gl_FragColor = vec4(uColor * (stepped + dither - 0.04), 1.0);
  }
`;

function flatMaterial(color: string) {
  return new THREE.ShaderMaterial({
    vertexShader: VERT,
    fragmentShader: FRAG,
    uniforms: {
      uColor: { value: new THREE.Color(color) },
      uLight: { value: new THREE.Vector3(0.6, 0.9, 0.5) },
    },
  });
}

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
      <Edges scale={1.02} threshold={15} color="#0a0a0a" />
    </mesh>
  );
}

/** 8x8x8 instanced voxel lattice for Vajra — verified kernels snap acid,
    slow kernels cull to zero scale. */
function VoxelLattice() {
  const ref = useRef<THREE.InstancedMesh>(null!);
  const count = 512;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const mat = useMemo(() => flatMaterial("#C6F10E"), []);
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

function Assembly() {
  const core = useRef<THREE.Group>(null!);
  const dial = useRef<THREE.Group>(null!);
  const prism = useRef<THREE.Group>(null!);
  const oscillator = useRef<THREE.Group>(null!);
  const triad = useRef<THREE.Group>(null!);
  const cad = useRef<THREE.Group>(null!);
  const fins = useMemo(() => Array.from({ length: 36 }, (_, i) => i), []);
  const finMat = useMemo(() => flatMaterial("#FF3300"), []);
  const crimsonMat = useMemo(() => flatMaterial("#D91E36"), []);
  const emeraldMat = useMemo(() => flatMaterial("#00A86B"), []);
  const cobaltMat = useMemo(() => flatMaterial("#0047FF"), []);
  const inkMat = useMemo(() => flatMaterial("#161616"), []);
  const paperMat = useMemo(() => flatMaterial("#F2EFE9"), []);

  useFrame((state, delta) => {
    const s = usePortfolio.getState();
    const p = s.scrollProgress;
    const v = THREE.MathUtils.clamp(s.scrollVelocity, -1, 1);
    const t = state.clock.getElapsedTime();
    // State bands across the page: hero 0, flagship .18-.45, security .45-.62,
    // compute .62-.78, editorial .78-1. The core always rotates with velocity.
    const band = p < 0.16 ? 0 : p < 0.45 ? 1 : p < 0.62 ? 2 : p < 0.78 ? 3 : 4;
    if (core.current) {
      core.current.rotation.y += delta * (0.25 + Math.abs(v) * 1.4);
      core.current.rotation.x = THREE.MathUtils.lerp(core.current.rotation.x, band === 0 ? 0.35 : 0.9, 0.05);
      core.current.position.y = Math.sin(t * 0.5) * 0.08;
      core.current.visible = band !== 3;
    }
    if (dial.current) {
      dial.current.visible = band === 1;
      dial.current.rotation.z += delta * 0.35;
    }
    if (prism.current) {
      prism.current.visible = band === 2;
      prism.current.rotation.y += delta * 0.5;
      prism.current.rotation.x = 0.4 + Math.sin(t * 0.4) * 0.15;
    }
    if (oscillator.current) {
      oscillator.current.visible = s.activeProjectIndex === 1;
      oscillator.current.children.forEach((c, i) => {
        c.position.y = Math.sin(t * 2.2 + i * 1.7) * 0.35;
      });
    }
    if (triad.current) {
      triad.current.visible = s.activeProjectIndex === 2;
      triad.current.rotation.y += delta * 0.2;
    }
    if (cad.current) {
      cad.current.visible = s.activeProjectIndex === 7;
      cad.current.rotation.y = Math.sin(t * 0.25) * 0.3;
    }
    // Camera: pull back + flatten for the CAD (SpecBalloon) state.
    const cam = state.camera as THREE.PerspectiveCamera;
    const targetZ = s.activeProjectIndex === 7 ? 9.5 : 7.2;
    cam.position.z = THREE.MathUtils.lerp(cam.position.z, targetZ, 0.04);
    cam.position.x = THREE.MathUtils.lerp(cam.position.x, state.pointer.x * 0.45, 0.05);
    cam.position.y = THREE.MathUtils.lerp(cam.position.y, -state.pointer.y * 0.3 + 0.2, 0.05);
    cam.lookAt(0, 0, 0);
  });

  return (
    <>
      {/* STATE 1 — Hero Core Monolith: interlocking rings, axes, data plates */}
      <group ref={core}>
        <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
          <mesh material={inkMat} rotation={[Math.PI / 2.4, 0.3, 0]}>
            <torusGeometry args={[1.55, 0.09, 8, 48]} />
            <Edges scale={1.01} threshold={15} color="#F2EFE9" />
          </mesh>
          <mesh material={paperMat} rotation={[Math.PI / 1.8, 0.9, 0.4]}>
            <torusGeometry args={[1.15, 0.06, 8, 48]} />
            <Edges scale={1.01} threshold={15} color="#0a0a0a" />
          </mesh>
          <Plate position={[0, 0, 0]} size={[1.5, 1.5, 0.22]} color="#FF3300" rotation={[0.2, 0.5, 0]} />
          <Plate position={[-1.9, 0.9, -0.4]} size={[0.7, 0.7, 0.12]} color="#0047FF" rotation={[0.4, 0.2, 0.3]} />
          <Plate position={[1.9, -0.8, -0.3]} size={[0.55, 0.9, 0.12]} color="#C6F10E" rotation={[0.1, -0.4, 0.2]} />
          <Plate position={[0, -1.7, 0.3]} size={[1.1, 0.28, 0.12]} color="#F2EFE9" />
        </Float>
      </group>

      {/* STATE 2a — Auditify: 36-fin radial inspection dial */}
      <group ref={dial} visible={false}>
        {fins.map((i) => {
          const a = (i / 36) * Math.PI * 2;
          return (
            <mesh key={i} material={finMat} position={[Math.cos(a) * 1.5, Math.sin(a) * 1.5, 0]} rotation={[0, 0, a]}>
              <boxGeometry args={[0.42, 0.09, 0.09]} />
            </mesh>
          );
        })}
        <Plate position={[0, 0, 0]} size={[0.9, 0.9, 0.18]} color="#F2EFE9" rotation={[0, 0, Math.PI / 4]} />
      </group>

      {/* STATE 2b — GillNet / DATUM: exploded packet-autopsy prism */}
      <group ref={prism} visible={false}>
        <mesh material={crimsonMat}>
          <octahedronGeometry args={[1.25, 0]} />
          <Edges scale={1.02} threshold={15} color="#F2EFE9" />
        </mesh>
        <mesh material={paperMat} position={[0, 1.9, 0]}>
          <boxGeometry args={[2.2, 0.06, 0.06]} />
        </mesh>
        <mesh material={paperMat} position={[0, -1.9, 0]}>
          <boxGeometry args={[2.2, 0.06, 0.06]} />
        </mesh>
      </group>

      {/* STATE 2c — DopaDiary: 4-axis harmonic clinical oscillator */}
      <group ref={oscillator} visible={false}>
        {[0, 1, 2, 3].map((i) => (
          <mesh key={i} material={emeraldMat} position={[-1.2 + i * 0.8, 0, 0]}>
            <torusGeometry args={[0.28, 0.05, 8, 32]} />
          </mesh>
        ))}
      </group>

      {/* STATE 2d — PHALANX: 3-pillar deterministic triad + gate lock */}
      <group ref={triad} visible={false}>
        {[-0.9, 0, 0.9].map((x, i) => (
          <Plate key={i} position={[x, 0.4, 0]} size={[0.5, 1.7, 0.5]} color="#161616" />
        ))}
        <Plate position={[0, 1.5, 0]} size={[2.6, 0.22, 0.6]} color="#FF3300" />
      </group>

      {/* STATE 2e — SpecBalloon: 3D-to-2D CAD mechanical part */}
      <group ref={cad} visible={false}>
        <mesh material={cobaltMat}>
          <cylinderGeometry args={[0.9, 0.9, 0.35, 24]} />
          <Edges scale={1.02} threshold={15} color="#FFFFFF" />
        </mesh>
        <mesh material={paperMat} position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.35, 0.35, 0.7, 16]} />
        </mesh>
        <Plate position={[1.6, 0, 0]} size={[0.9, 0.14, 0.14]} color="#FF3300" />
      </group>

      {/* STATE 2f — Vajra voxel lattice (visible in the compute band) */}
      <VoxelLattice />
    </>
  );
}

export default function WebGLStage() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[1]">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0.2, 7.2], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => gl.setClearColor("#000000", 0)}
      >
        <Assembly />
      </Canvas>
    </div>
  );
}
