'use client'

import { useMemo } from 'react'
import { Line } from '@react-three/drei'
import * as THREE from 'three'
import { PlanetState } from '@/store/orbitalStore'

/**
 * OrbitTrails3D - 3D orbit ellipse paths
 * 
 * Uses THREE.EllipseCurve to create smooth orbital paths
 */
interface OrbitTrails3DProps {
    planets: PlanetState[]
    orbitScale: number
    hoveredPlanetId: string | null
}

export default function OrbitTrails3D({ planets, orbitScale, hoveredPlanetId }: OrbitTrails3DProps) {
    // Create ellipse curves for each planet
    const curves = useMemo(() => {
        return planets.map((planet) => {
            const scaledRadius = (planet.orbital.radius / 100) * orbitScale
            const rx = scaledRadius * (1 + planet.orbital.eccentricity * 0.5)
            const ry = scaledRadius * (1 - planet.orbital.eccentricity * 0.3)

            // Create ellipse curve
            const curve = new THREE.EllipseCurve(
                0, 0, // center
                rx, ry, // radii
                0, 2 * Math.PI, // full circle
                false, // clockwise
                0 // rotation
            )

            // Get points as Vector3 array for Line component
            const points2D = curve.getPoints(64)
            const points = points2D.map((p) => new THREE.Vector3(p.x, 0, p.y))

            return {
                id: planet.id,
                points,
                color: planet.appearance.baseColor,
            }
        })
    }, [planets, orbitScale])

    return (
        <group>
            {curves.map((curve) => {
                const isHovered = hoveredPlanetId === curve.id
                return (
                    <Line
                        key={curve.id}
                        points={curve.points}
                        color={isHovered ? curve.color : '#333333'}
                        lineWidth={isHovered ? 2 : 1}
                        transparent
                        opacity={isHovered ? 0.8 : 0.3}
                    />
                )
            })}
        </group>
    )
}
