'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, Html } from '@react-three/drei'
import * as THREE from 'three'
import { PlanetState } from '@/store/orbitalStore'

/**
 * Planet3D - 3D planet component for WebGL orbital system
 * 
 * Features:
 * - Sphere geometry with 32 segments
 * - Standard material with emissive glow
 * - Outer glow sphere (transparent)
 * - Hover and click interactions
 * - HTML label overlay
 */
interface Planet3DProps {
    planet: PlanetState
    isHovered: boolean
    isActive: boolean
    orbitScale: number
    onHover: (id: string | null) => void
    onClick: (id: string) => void
}

export default function Planet3D({
    planet,
    isHovered,
    isActive,
    orbitScale,
    onHover,
    onClick,
}: Planet3DProps) {
    const meshRef = useRef<THREE.Mesh>(null)
    const glowRef = useRef<THREE.Mesh>(null)

    // Planet size
    const baseSize = 0.6
    const size = isHovered ? baseSize * 1.15 : baseSize

    // Calculate 3D position from orbital data
    const positionX = (planet.position.x / 100) * orbitScale
    const positionZ = (planet.position.y / 100) * orbitScale
    const positionY = 0 // Keep on horizontal plane

    // Animate glow pulsing
    useFrame((state) => {
        if (glowRef.current) {
            const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.1 + 1
            glowRef.current.scale.setScalar(isHovered ? pulse * 1.3 : pulse)
        }
    })

    // Parse color
    const color = new THREE.Color(planet.appearance.baseColor)

    return (
        <group position={[positionX, positionY, positionZ]}>
            {/* Outer glow sphere */}
            <Sphere
                ref={glowRef}
                args={[size * 1.5, 16, 16]}
            >
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={isHovered ? 0.3 : 0.15}
                    side={THREE.BackSide}
                />
            </Sphere>

            {/* Main planet sphere */}
            <Sphere
                ref={meshRef}
                args={[size, 32, 32]}
                onPointerEnter={() => onHover(planet.id)}
                onPointerLeave={() => onHover(null)}
                onClick={() => onClick(planet.id)}
            >
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={isHovered ? 0.5 : 0.2}
                    metalness={0.8}
                    roughness={0.2}
                />
            </Sphere>

            {/* Label (HTML overlay) - visible on hover */}
            {isHovered && (
                <Html
                    center
                    position={[0, -size - 0.4, 0]}
                    style={{
                        pointerEvents: 'none',
                        userSelect: 'none',
                    }}
                >
                    <div
                        style={{
                            background: 'rgba(5, 5, 5, 0.95)',
                            border: `1px solid ${planet.appearance.baseColor}`,
                            borderRadius: '16px',
                            padding: '6px 16px',
                            color: planet.appearance.baseColor,
                            fontSize: '12px',
                            fontWeight: 600,
                            letterSpacing: '0.05em',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {planet.name}
                    </div>
                </Html>
            )}
        </group>
    )
}
