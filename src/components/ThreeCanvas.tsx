import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { SceneTheme } from '../types';

interface ThreeCanvasProps {
  theme: SceneTheme;
  interactiveMode?: boolean;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ theme, interactiveMode = true }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const shockwaveRef = useRef(0);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // SCENE, CAMERA, RENDERER
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.025);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // COLOR THEMES
    const getThemeColors = (t: SceneTheme) => {
      switch (t) {
        case 'nebula':
          return { primary: 0xa855f7, secondary: 0xec4899, particle: 0xc084fc, light: 0x9333ea };
        case 'matrix':
          return { primary: 0x10b981, secondary: 0x06b6d4, particle: 0x34d399, light: 0x059669 };
        case 'sunset':
          return { primary: 0xf59e0b, secondary: 0xf43f5e, particle: 0xfbbf24, light: 0xd97706 };
        case 'cyber':
        default:
          return { primary: 0x06b6d4, secondary: 0x3b82f6, particle: 0x38bdf8, light: 0x0ea5e9 };
      }
    };

    const colors = getThemeColors(theme);

    // LIGHTS
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const mainLight = new THREE.PointLight(colors.primary, 4, 100);
    mainLight.position.set(10, 15, 15);
    scene.add(mainLight);

    const secondaryLight = new THREE.PointLight(colors.secondary, 3, 100);
    secondaryLight.position.set(-15, -10, 10);
    scene.add(secondaryLight);

    // 3D GEOMETRIES ROOT GROUP
    const sceneGroup = new THREE.Group();
    scene.add(sceneGroup);

    // 1. Central Hero Icosahedron (wireframe + core)
    const icoGeo = new THREE.IcosahedronGeometry(4, 1);
    const icoMat = new THREE.MeshStandardMaterial({
      color: colors.primary,
      wireframe: true,
      roughness: 0.2,
      metalness: 0.8,
      emissive: colors.primary,
      emissiveIntensity: 0.25,
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    sceneGroup.add(icoMesh);

    // Solid inner core
    const coreGeo = new THREE.IcosahedronGeometry(2.4, 2);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x0f172a,
      roughness: 0.1,
      metalness: 0.9,
      reflectivity: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    sceneGroup.add(coreMesh);

    // 2. Torus Knot Outer Orbit
    const knotGeo = new THREE.TorusKnotGeometry(6.5, 0.35, 128, 16, 2, 3);
    const knotMat = new THREE.MeshStandardMaterial({
      color: colors.secondary,
      roughness: 0.3,
      metalness: 0.7,
      wireframe: true,
      opacity: 0.75,
      transparent: true,
    });
    const knotMesh = new THREE.Mesh(knotGeo, knotMat);
    knotMesh.position.set(0, 0, -2);
    sceneGroup.add(knotMesh);

    // 3. Cyber Ring
    const ringGeo = new THREE.RingGeometry(8, 8.2, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: colors.primary,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2.3;
    sceneGroup.add(ringMesh);

    // 4. Floating Satellites (Octahedrons)
    const satellites: THREE.Mesh[] = [];
    const satGeo = new THREE.OctahedronGeometry(0.8);
    for (let i = 0; i < 6; i++) {
      const satMat = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? colors.primary : colors.secondary,
        roughness: 0.2,
        metalness: 0.8,
      });
      const satMesh = new THREE.Mesh(satGeo, satMat);
      const angle = (i / 6) * Math.PI * 2;
      const radius = 9 + (i % 2) * 2;
      satMesh.position.set(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 5,
        Math.sin(angle) * radius
      );
      satellites.push(satMesh);
      sceneGroup.add(satMesh);
    }

    // 5. Dynamic Cosmic Particle Cloud
    const particleCount = 1800;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const basePositions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const x = (Math.random() - 0.5) * 80;
      const y = (Math.random() - 0.5) * 80;
      const z = (Math.random() - 0.5) * 60;

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      basePositions[i3] = x;
      basePositions[i3 + 1] = y;
      basePositions[i3 + 2] = z;

      scales[i] = Math.random() * 2 + 0.5;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

    // Particle Material
    const particleMat = new THREE.PointsMaterial({
      color: colors.particle,
      size: 0.16,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // MOUSE INTERACTION
    const handleMouseMove = (e: MouseEvent) => {
      if (!interactiveMode) return;
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.targetX = nx * 1.5;
      mouseRef.current.targetY = ny * 1.5;
    };

    const handleClick = () => {
      // Trigger shockwave burst
      shockwaveRef.current = 1.0;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    window.addEventListener('resize', handleResize);

    // ANIMATION LOOP
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Group rotation with mouse bias
      sceneGroup.rotation.y = elapsedTime * 0.15 + mouseRef.current.x * 0.35;
      sceneGroup.rotation.x = Math.sin(elapsedTime * 0.1) * 0.15 + mouseRef.current.y * 0.25;

      // Rotate individual geometries
      icoMesh.rotation.x += 0.008;
      icoMesh.rotation.y += 0.012;
      coreMesh.rotation.y -= 0.01;

      knotMesh.rotation.x = elapsedTime * 0.2;
      knotMesh.rotation.z = elapsedTime * 0.15;

      ringMesh.rotation.z += 0.005;

      // Orbit satellites
      satellites.forEach((sat, i) => {
        const offset = (i / 6) * Math.PI * 2;
        const radius = 9 + (i % 2) * 2;
        sat.position.x = Math.cos(elapsedTime * 0.4 + offset) * radius;
        sat.position.z = Math.sin(elapsedTime * 0.4 + offset) * radius;
        sat.position.y = Math.sin(elapsedTime * 0.8 + offset) * 2;
        sat.rotation.x += 0.02;
        sat.rotation.y += 0.03;
      });

      // Particle physics & pulse
      const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
      const currentPos = posAttr.array as Float32Array;

      // Decay shockwave
      if (shockwaveRef.current > 0.01) {
        shockwaveRef.current *= 0.94;
      } else {
        shockwaveRef.current = 0;
      }

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        // Natural gentle drift
        currentPos[i3 + 1] = basePositions[i3 + 1] + Math.sin(elapsedTime + basePositions[i3]) * 0.4;
        
        // Shockwave expansion if clicked
        if (shockwaveRef.current > 0.01) {
          const factor = 1 + shockwaveRef.current * 0.25;
          currentPos[i3] = basePositions[i3] * factor;
          currentPos[i3 + 2] = basePositions[i3 + 2] * factor;
        } else {
          currentPos[i3] = basePositions[i3];
          currentPos[i3 + 2] = basePositions[i3 + 2];
        }
      }
      posAttr.needsUpdate = true;

      particles.rotation.y = elapsedTime * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    // CLEANUP
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      icoGeo.dispose();
      icoMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      knotGeo.dispose();
      knotMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      satGeo.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, [theme, interactiveMode]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity: 0.9 }}
      aria-hidden="true"
    />
  );
};
