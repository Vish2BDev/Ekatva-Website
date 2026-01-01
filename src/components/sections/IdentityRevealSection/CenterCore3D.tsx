'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, Text } from '@react-three/drei'
import * as THREE from 'three'

/**
 * CenterCore3D - 3D EKATVA center core
 * 
 * Features:
 * - Pulsing glow sphere
 * - Core sphere with teal color
 * - "एकत्व" text using @react-three/drei Text
 */
export default function CenterCore3D() {
    const glowRef = useRef<THREE.Mesh>(null)
    const pulseRef = useRef<THREE.Mesh>(null)

    const coreColor = new THREE.Color('#5CE6C9')
    const coreSize = 0.8

    // Animate pulsing glow
    useFrame((state) => {
        if (glowRef.current) {
            const pulse = Math.sin(state.clock.elapsedTime * 1.5) * 0.15 + 1
            glowRef.current.scale.setScalar(pulse)
            const material = glowRef.current.material as THREE.MeshBasicMaterial
            material.opacity = 0.2 + Math.sin(state.clock.elapsedTime * 1.5) * 0.1
        }
        if (pulseRef.current) {
            const pulse = Math.sin(state.clock.elapsedTime * 0.8) * 0.1 + 1
            pulseRef.current.scale.setScalar(pulse * 1.3)
        }
    })

    return (
        <group position={[0, 0, 0]}>
            {/* Outer pulse ring */}
            <Sphere
                ref={pulseRef}
                args={[coreSize * 1.8, 16, 16]}
            >
                <meshBasicMaterial
                    color={coreColor}
                    transparent
                    opacity={0.1}
                    side={THREE.BackSide}
                />
            </Sphere>

            {/* Inner glow */}
            <Sphere
                ref={glowRef}
                args={[coreSize * 1.3, 24, 24]}
            >
                <meshBasicMaterial
                    color={coreColor}
                    transparent
                    opacity={0.2}
                    side={THREE.BackSide}
                />
            </Sphere>

            {/* Core sphere */}
            <Sphere args={[coreSize, 32, 32]}>
                <meshStandardMaterial
                    color="#050505"
                    emissive={coreColor}
                    emissiveIntensity={0.3}
                    metalness={0.6}
                    roughness={0.4}
                />
            </Sphere>

            {/* Devanagari text - एकत्व */}
            <Text
                position={[0, 0.1, coreSize + 0.01]}
                fontSize={0.35}
                color="#5CE6C9"
                anchorX="center"
                anchorY="middle"
            >
                एकत्व
            </Text>

            {/* English text */}
            <Text
                position={[0, -0.2, coreSize + 0.01]}
                fontSize={0.12}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
                letterSpacing={0.15}
            >
                EKATVA
            </Text>
        </group>
    )
}
