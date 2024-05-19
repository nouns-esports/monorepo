"use client";

import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function SpinningSphere() {
  const linesRef = useRef<any>();

  const geometry = new THREE.SphereGeometry(1.25, 18, 14);
  const material = new THREE.LineBasicMaterial({ color: 0xcccccc });
  const wireframe = new THREE.EdgesGeometry(geometry);
  const lines = new THREE.LineSegments(wireframe, material);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (linesRef.current) {
      linesRef.current.rotation.y = time / 8;
    }
  });

  return (
    <group rotation={[0.15, 0, -0.25]}>
      <group ref={linesRef}>
        <primitive object={lines} />
      </group>
    </group>
  );
}

export default function Globe() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 33 }}
      style={{ height: "100%" }}
    >
      <ambientLight intensity={0.5} />
      <SpinningSphere />
    </Canvas>
  );
}
